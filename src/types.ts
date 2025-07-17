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
