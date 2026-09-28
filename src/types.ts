export interface SchemaStructure {
  name: string;
  type: string;
  options: { required: boolean; ref?: string; unique?: boolean };
  children?: null | Array<SchemaStructure>;
}

export interface ModelInfo {
  name: string;
  structure: Array<SchemaStructure>;
  methods: Record<string, string[]>;
}

export interface Relations {
  to: string;
  from: string;
  relation: "one-to-one" | "one-to-many";
}

export interface MOptions {
  // ── Rendering ───────────────────────────────────────────────────────────
  /** Hand-drawn rendering style. */
  sketch?: boolean;
  forceAppendix?: boolean;
  /** Output scale factor. */
  scale?: number;
  /** Centre the diagram in the viewport. */
  center?: boolean;
  /** Padding around the diagram, in pixels. Default `20`. */
  pad?: number;
  /** D2 layout engine. Default `"elk"`. */
  layout?: "elk" | "dagre";
  /** D2 theme id. */
  themeId?: number;

  // ── Output (mongooseToErdMain only) ─────────────────────────────────────
  /** Directory to write into. Default `process.cwd()`. */
  outDir?: string;
  /** Base name for the full diagram. Default `full-erd-<timestamp>`. */
  fullFileName?: string;
  /** Base name for the minimal diagram. Default `minimal-erd-<timestamp>`. */
  minimalFileName?: string;
  /** Append a timestamp to default file names. Default `true`. */
  timestamp?: boolean;
}

/** One rendered diagram. */
export interface ErdDiagram {
  /** The generated D2 source. */
  d2: string;
  /** The rendered SVG. */
  svg: string;
}

/** What the generators return. */
export interface ErdOutput {
  /** The extracted model definitions. */
  models: ModelInfo[];
  /** Every field, constraint and method. */
  full: ErdDiagram;
  /** Entities and their relationships only. */
  minimal: ErdDiagram;
}
