#!/usr/bin/env node
import mongoose from "mongoose";

import { SchemaStructure, ModelInfo, Relations } from "./types";

const primitive = ["String", "Boolean", "Date", "ObjectID", "Number"];
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

const getAllModelDefinitions = (
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

const refList: Array<Relations> = [];

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
  allErds: Array<string>
) => {
  if (!structure || structure?.length == 0) return;

  let erd = "";
  erd += `${name}: {\nshape: sql_table\n`;

  structure.forEach((s) => {
    if (primitive.includes(s.type)) {
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
      erdStructure(new_name, s?.children, allErds);
    }
  });

  erd += "}\n";

  allErds.push(erd);

  return allErds;
};

const buildErd = (models: ModelInfo[]) => {
  let finalErd = "";

  models.forEach(({ name, structure, methods }) => {
    const allErds: Array<string> = [];
    erdStructure(name, structure, allErds);

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

  finalErd = finalErd.replaceAll("label", "_label");

  return finalErd;
};

const renderErd = async (erd: string, saveName: string) => {
  const { D2 } = await import("@terrastruct/d2");
  const fs = await import("node:fs");

  const d2 = new D2();

  const result = await d2.compile(erd, {
    options: {
      layout: "elk",
      sketch: false,
      forceAppendix: true,
      scale: 1,
      center: true,
      pad: 20,
    },
    inputPath: "",
  });

  const svg = await d2.render(result.diagram, {
    ...result.renderOptions,
  });

  fs.writeFileSync(saveName, svg);
};

const renderFullErd = async (models: ModelInfo[], isoDate: string) => {
  const erd = buildErd(models);
  await renderErd(erd, `full-erd-${isoDate}.svg`);
};

const renderMinimalErd = async (models: ModelInfo[], isoDate: string) => {
  let erd = "";

  for (const m of models) {
    erd += `\n\n${m.name}: {
      shape: sql_table
    }\n\n`;

    for (const s of m.structure) {
      if (s.options?.ref) {
        erd += `${m.name} -> ${s.options.ref}\n`;
      }
    }
  }

  await renderErd(erd, `minimal-erd-${isoDate}.svg`);
};

export const mongooseToErdMain = async (
  modelNames: Array<string>,
  mongooseModel: typeof mongoose.model
) => {
  try {
    console.log(`Generating Schema...`);
    const data = getAllModelDefinitions(modelNames, mongooseModel);
    const isoDate = new Date().toISOString();
    await Promise.all([
      renderMinimalErd(data, isoDate),
      renderFullErd(data, isoDate),
    ]);
  } catch (err) {
    console.log(err);
  }
};
