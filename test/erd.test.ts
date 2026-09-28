import { describe, it, expect } from "vitest";
import mongoose from "mongoose";
import { getAllModelDefinitions, buildErd, buildMinimalErd } from "../src";

const makeModels = () => {
  const conn = new mongoose.Mongoose();

  const User = conn.model(
    "User",
    new conn.Schema({
      email: { type: String, required: true, unique: true },
      name: { type: String },
      tags: [String],
      address: { city: String, zip: String },
    })
  );

  const Post = conn.model(
    "Post",
    new conn.Schema({
      title: { type: String, required: true },
      author: { type: conn.Schema.Types.ObjectId, ref: "User" },
    })
  );

  return { conn, User, Post };
};

describe("getAllModelDefinitions", () => {
  it("extracts a named entry per model", () => {
    const { conn } = makeModels();
    const defs = getAllModelDefinitions(["User", "Post"], conn.model.bind(conn));
    expect(defs.map((d) => d.name)).toEqual(["User", "Post"]);
  });

  it("records scalar fields with their mongoose instance type", () => {
    const { conn } = makeModels();
    const [user] = getAllModelDefinitions(["User"], conn.model.bind(conn));
    const email = user.structure.find((s) => s.name === "email");
    expect(email?.type).toBe("String");
  });

  it("carries the required and unique options through", () => {
    const { conn } = makeModels();
    const [user] = getAllModelDefinitions(["User"], conn.model.bind(conn));
    const email = user.structure.find((s) => s.name === "email");
    expect(email?.options.required).toBe(true);
    expect(email?.options.unique).toBe(true);
  });

  it("captures a ref as a relation target", () => {
    const { conn } = makeModels();
    const [post] = getAllModelDefinitions(["Post"], conn.model.bind(conn));
    const author = post.structure.find((s) => s.name === "author");
    expect(author?.options.ref).toBe("User");
  });

  it("nests embedded documents as children", () => {
    const { conn } = makeModels();
    const [user] = getAllModelDefinitions(["User"], conn.model.bind(conn));
    const address = user.structure.find((s) => s.name === "address");
    expect(address?.children?.map((c) => c.name).sort()).toEqual(["city", "zip"]);
  });

  it("represents arrays as Array nodes", () => {
    const { conn } = makeModels();
    const [user] = getAllModelDefinitions(["User"], conn.model.bind(conn));
    expect(user.structure.find((s) => s.name === "tags")?.type).toBe("Array");
  });
});

describe("buildErd", () => {
  it("emits a d2 sql_table per model", () => {
    const { conn } = makeModels();
    const erd = buildErd(getAllModelDefinitions(["User", "Post"], conn.model.bind(conn)));
    expect(erd).toContain("User: {");
    expect(erd).toContain("shape: sql_table");
  });

  it("marks _id as the primary key", () => {
    const { conn } = makeModels();
    const erd = buildErd(getAllModelDefinitions(["User"], conn.model.bind(conn)));
    expect(erd).toContain("constraint: primary_key");
  });

  it("marks a ref field as a foreign key and draws the edge", () => {
    const { conn } = makeModels();
    const erd = buildErd(getAllModelDefinitions(["Post"], conn.model.bind(conn)));
    expect(erd).toContain("constraint: foreign_key");
    expect(erd).toContain("Post.author -> User");
  });

  // Regression: refList used to live at module scope, so a second call
  // re-emitted every edge from the first one.
  it("does not leak relations between successive calls", () => {
    const { conn } = makeModels();
    const defs = getAllModelDefinitions(["Post"], conn.model.bind(conn));
    const first = buildErd(defs);
    const second = buildErd(defs);
    const count = (s: string) => s.split("Post.author -> User").length - 1;
    expect(count(second)).toBe(count(first));
  });
});

describe("buildMinimalErd", () => {
  it("emits one table per model", () => {
    const { conn } = makeModels();
    const erd = buildMinimalErd(getAllModelDefinitions(["User", "Post"], conn.model.bind(conn)));
    expect(erd).toContain("User: {");
    expect(erd).toContain("Post: {");
  });

  it("draws only relationship edges, not columns", () => {
    const { conn } = makeModels();
    const erd = buildMinimalErd(getAllModelDefinitions(["Post"], conn.model.bind(conn)));
    expect(erd).toContain("Post -> User");
    expect(erd).not.toContain("constraint:");
  });
});

describe("reserved keyword escaping", () => {
  const withLabels = () => {
    const conn = new mongoose.Mongoose();
    conn.model(
      "Tag",
      new conn.Schema({
        label: { type: String },
        labelled: { type: Boolean },
        sublabel: { type: String },
      })
    );
    return conn;
  };

  it("escapes a field literally named `label`", () => {
    const conn = withLabels();
    const erd = buildErd(getAllModelDefinitions(["Tag"], conn.model.bind(conn)));
    expect(erd).toContain("_label:");
  });

  // Regression: this used to be a blunt replaceAll("label", "_label"), which
  // also mangled any identifier merely containing the word.
  it("leaves fields that merely contain `label` alone", () => {
    const conn = withLabels();
    const erd = buildErd(getAllModelDefinitions(["Tag"], conn.model.bind(conn)));
    expect(erd).toContain("labelled:");
    expect(erd).toContain("sublabel:");
    expect(erd).not.toContain("_labelled");
    expect(erd).not.toContain("sub_label");
  });
});
