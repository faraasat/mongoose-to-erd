import mongoose from "mongoose";

import {
  SchemaStructure,
  ModelInfo,
  Relations,
  MOptions,
  ErdOutput,
} from "./types";

const primitive = [
  "String",
  "Boolean",
  "Date",
  "ObjectId",
  "Number",
  "Decimal128",
  "BigInt",
  "UUID",
  "Buffer",
  "Map",
];

/**
 * Mongoose has spelled the ObjectId instance differently across majors
 * ("ObjectID" before v6, "ObjectId" from v6 on), so match case-insensitively
 * rather than against one exact spelling.
 */
const isPrimitive = (type: string) =>
  primitive.some((p) => p.toLowerCase() === type.toLowerCase());
const nonPrimitive = {
  Array: "Array",
  Embedded: "Embedded",
  Mixed: "Mixed",
};

const insertIntoStructure = (
  structure: SchemaStructure[],
  pathParts: string[],
  schemaType: mongoose.SchemaType
) => {
  const [head, ...rest] = pathParts;

  let node = structure.find((x) => x.name === head);
  if (!node) {
    node = {
      name: head,
      type: "Embedded",
      options: { required: false },
      children: [],
    };
    structure.push(node);
  }

  if (rest.length === 0) {
    const options: SchemaStructure["options"] = {
      required: schemaType.options?.required || false,
      unique: schemaType.options?.unique || false,
    };

    if (schemaType.options?.ref) {
      options["ref"] = schemaType.options.ref;
    }

    node.type = schemaType.instance;
    node.options = options;

    if (schemaType.instance === "Array") {
      const caster = (schemaType as any).caster;

      if (caster?.schema) {
        const embeddedSchema = caster.schema as mongoose.Schema;

        const tempStructure: SchemaStructure[] = [];
        for (const [k, st] of Object.entries(embeddedSchema.paths)) {
          const parts = k.split(".");
          insertIntoStructure(tempStructure, parts, st as mongoose.SchemaType);
        }
        node.children = tempStructure;
      } else if (caster) {
        const child: SchemaStructure = {
          name: "item",
          type: caster.instance || "Unknown",
          options: {
            required: caster.options?.required || false,
            unique: caster.options?.unique || false,
          },
        };
        if (caster.options?.ref) {
          child.options.ref = caster.options.ref;
        }
        node.children = [child];
      }
    }

    if ((schemaType as any).schema) {
      const embeddedSchema = (schemaType as any).schema as mongoose.Schema;

      const tempStructure: SchemaStructure[] = [];
      for (const [k, st] of Object.entries(embeddedSchema.paths)) {
        const parts = k.split(".");
        insertIntoStructure(tempStructure, parts, st as mongoose.SchemaType);
      }
      node.children = tempStructure;
    }
  } else {
    if (!node.children) node.children = [];
    insertIntoStructure(node.children, rest, schemaType);
  }
};

const buildStructure = (
  path: string,
  schemaType: mongoose.SchemaType | null | undefined
): SchemaStructure | undefined => {
  if (!schemaType) return;

  const options: SchemaStructure["options"] = {
    required: schemaType.options?.required || false,
    unique: schemaType.options?.unique || false,
  };

  if (schemaType.options?.ref) {
    options["ref"] = schemaType.options.ref;
  }

  const structure: SchemaStructure = {
    name: path,
    type: schemaType.instance,
    options,
  };

  if (schemaType.instance === "Array" && (schemaType as any).caster?.schema) {
    structure.children = Object.entries((schemaType as any).caster.schema.paths)
      .map(([p, st]) => buildStructure(p, st as mongoose.SchemaType))
      .filter(Boolean) as SchemaStructure[];
  } else if ((schemaType as any).schema) {
    structure.children = Object.entries((schemaType as any).schema.paths)
      .map(([p, st]) => buildStructure(p, st as mongoose.SchemaType))
      .filter(Boolean) as SchemaStructure[];
  }

  return structure;
};

export const getAllModelDefinitions = (
  modelNames: Array<string>,
  mongooseModel: typeof mongoose.model
): ModelInfo[] => {
  const result: ModelInfo[] = [];

  for (const modelName of modelNames) {
    const model = mongooseModel(modelName);
    const schema = model.schema;

    const structure: SchemaStructure[] = [];

    for (const [path, schemaType] of Object.entries(schema.paths)) {
      const pathParts = path.split(".");
      insertIntoStructure(
        structure,
        pathParts,
        schemaType as mongoose.SchemaType
      );
    }

    const methods: Record<string, string[]> = {
      instanceMethods: Object.keys(schema.methods),
      staticMethods: Object.keys(schema.statics),
    };

    result.push({
      name: modelName,
      structure,
      methods,
    });
  }

  return result;
};

const addRelations = (refs: Array<Relations>) => {
  let rel = "";

  refs.forEach(({ to, from, relation: _relation }) => {
    rel += `${from} -> ${to}\n`;
  });

  return rel;
};

const erdStructure = (
  name: string,
  structure: Array<SchemaStructure> | undefined | null,
  allErds: Array<string>,
  refList: Array<Relations>
) => {
  if (!structure || structure?.length == 0) return;

  let erd = "";
  erd += `${name}: {\nshape: sql_table\n`;

  // Reserve this table's slot up front. Recursive calls below append their own
  // tables, so without the reservation the parent would end up after them.
  const selfIndex = allErds.length;
  allErds.push("");

  structure.forEach((s) => {
    if (isPrimitive(s.type)) {
      erd += `${s.name}: ${s.type}`;
      if (s.options.unique) {
        erd += ` {constraint: unique}`;
      } else if (s.options.ref) {
        erd += ` {constraint: foreign_key}`;
        refList.push({
          from: `${name}.${s.name}`,
          to: s.options.ref!,
          relation: "one-to-one",
        });
      } else if (s.name == "_id") {
        erd += ` {constraint: primary_key}`;
      }
      erd += `\n`;
    } else {
      const id = Math.random()
        .toString(36)
        .substring(2, 6 + 2);
      const new_name = `${s.name}_${id}`;
      erd += `${s.name}: ${s.type}`;
      refList.push({
        from: `${name}.${s.name}`,
        to: new_name,
        relation:
          s.type == nonPrimitive.Embedded ? "one-to-one" : "one-to-many",
      });
      erdStructure(new_name, s?.children, allErds, refList);
    }
  });

  erd += "}\n";

  allErds[selfIndex] = erd;

  return allErds;
};

export const buildErd = (models: ModelInfo[]) => {
  let finalErd = "";

  // Scoped per call. When this lived at module scope the second diagram of a
  // run inherited the first one's edges, and every subsequent call to
  // mongooseToErdMain accumulated them further.
  const refList: Array<Relations> = [];

  models.forEach(({ name, structure, methods }) => {
    const allErds: Array<string> = [];
    erdStructure(name, structure, allErds, refList);

    allErds[0] = allErds[0].substring(0, allErds[0].lastIndexOf("}\n"));

    methods.instanceMethods.forEach((mim) => {
      allErds[0] += `${mim}(): instanceMethod\n`;
    });
    methods.staticMethods.forEach((msm) => {
      allErds[0] += `${msm}(): staticMethod\n`;
    });
    allErds[0] += `}\n`;

    finalErd += allErds.join("\n\n");
  });

  finalErd += addRelations(refList);

  // `label` is a reserved D2 keyword: a field called `label` would set the
  // table's label instead of declaring a column. Escape it — but only where
  // it is actually used as a key.
  //
  // This used to be a blunt `replaceAll("label", "_label")`, which also
  // mangled `labelled`, `sublabel`, and any model named `Label`.
  finalErd = finalErd.replace(/^(\s*)label(\s*:)/gm, "$1_label$2");

  return finalErd;
};

/** Compiles D2 source to an SVG string. */
const renderErd = async (erd: string, options?: MOptions): Promise<string> => {
  const { D2 } = await import("@terrastruct/d2");

  const d2 = new D2();

  const result = await d2.compile(erd, {
    options: {
      layout: options?.layout ?? "elk",
      sketch: options?.sketch,
      forceAppendix: options?.forceAppendix,
      scale: options?.scale,
      center: options?.center,
      pad: options?.pad ?? 20,
      themeID: options?.themeId,
    },
    inputPath: "",
  });

  return d2.render(result.diagram, { ...result.renderOptions });
};

/** Builds the minimal (entities + relationships only) D2 source. */
export const buildMinimalErd = (models: ModelInfo[]): string => {
  let erd = "";

  for (const m of models) {
    erd += `\n\n${m.name}: {\n  shape: sql_table\n}\n\n`;

    for (const s of m.structure) {
      if (s.options?.ref) {
        erd += `${m.name} -> ${s.options.ref}\n`;
      }
    }
  }

  return erd;
};

/**
 * Builds both diagrams and returns their D2 source and rendered SVG.
 *
 * Nothing is written to disk — use this when you want to post-process, diff,
 * embed or serve the output yourself.
 */
export const generateErd = async (
  modelNames: Array<string>,
  mongooseModel: typeof mongoose.model,
  options?: MOptions
): Promise<ErdOutput> => {
  const models = getAllModelDefinitions(modelNames, mongooseModel);

  const fullSource = buildErd(models);
  const minimalSource = buildMinimalErd(models);

  const [full, minimal] = await Promise.all([
    renderErd(fullSource, options),
    renderErd(minimalSource, options),
  ]);

  return {
    models,
    full: { d2: fullSource, svg: full },
    minimal: { d2: minimalSource, svg: minimal },
  };
};

/**
 * Builds both diagrams and writes them to disk.
 *
 * Returns the same payload as {@link generateErd}, plus the paths written.
 */
export const mongooseToErdMain = async (
  modelNames: Array<string>,
  mongooseModel: typeof mongoose.model,
  options?: MOptions
): Promise<ErdOutput & { files: { full: string; minimal: string } }> => {
  const { writeFile, mkdir } = await import("node:fs/promises");
  const path = await import("node:path");

  const outDir = options?.outDir ?? process.cwd();
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const suffix = options?.timestamp === false ? "" : `-${stamp}`;

  const output = await generateErd(modelNames, mongooseModel, options);

  await mkdir(outDir, { recursive: true });

  const files = {
    full: path.join(outDir, `${options?.fullFileName ?? `full-erd${suffix}`}.svg`),
    minimal: path.join(
      outDir,
      `${options?.minimalFileName ?? `minimal-erd${suffix}`}.svg`
    ),
  };

  await Promise.all([
    writeFile(files.full, output.full.svg, "utf8"),
    writeFile(files.minimal, output.minimal.svg, "utf8"),
  ]);

  return { ...output, files };
};

export type {
  SchemaStructure,
  ModelInfo,
  Relations,
  MOptions,
  ErdOutput,
  ErdDiagram,
} from "./types";
