/**
 * Generates the demo's diagrams at build time, using the real package.
 *
 * mongoose-to-erd is a Node library: it reads Mongoose's model registry and
 * renders through D2. Rather than fake that in the browser, the demo runs the
 * actual generator here and ships the resulting SVG and D2 source as static
 * assets — so what you see on the page is genuine output, not a mock-up.
 *
 * The result is committed rather than regenerated on every build. D2 renders
 * through WebAssembly, which is slow enough on CI runners to stall the job,
 * and the generator's output is deterministic, so a committed file is stable.
 * Run `npm run generate` to refresh it after changing the schema below.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import mongoose from "mongoose";
import { getAllModelDefinitions, buildErd, buildMinimalErd } from "mongoose-to-erd";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "src", "generated");

/** A small but realistic blog schema, exercising most of what the mapper handles. */
const buildBlogModels = () => {
  const conn = new mongoose.Mongoose();

  conn.model(
    "User",
    new conn.Schema({
      email: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      roles: [String],
      profile: {
        bio: String,
        avatarUrl: String,
      },
    }).method("displayName", function () {}).static("findByEmail", function () {})
  );

  conn.model(
    "Post",
    new conn.Schema({
      title: { type: String, required: true },
      slug: { type: String, required: true, unique: true },
      body: String,
      published: { type: Boolean, required: true },
      author: { type: conn.Schema.Types.ObjectId, ref: "User", required: true },
      tags: [{ type: conn.Schema.Types.ObjectId, ref: "Tag" }],
      revisions: [
        new conn.Schema({
          editedAt: Date,
          editedBy: { type: conn.Schema.Types.ObjectId, ref: "User" },
        }),
      ],
    })
  );

  conn.model(
    "Tag",
    new conn.Schema({
      label: { type: String, required: true, unique: true },
      colour: String,
    })
  );

  conn.model(
    "Comment",
    new conn.Schema({
      post: { type: conn.Schema.Types.ObjectId, ref: "Post", required: true },
      author: { type: conn.Schema.Types.ObjectId, ref: "User", required: true },
      body: { type: String, required: true },
      createdAt: Date,
    })
  );

  return { conn, names: ["User", "Post", "Tag", "Comment"] };
};

const SOURCE = `import mongoose from "mongoose";

const User = mongoose.model("User", new mongoose.Schema({
  email:   { type: String, required: true, unique: true },
  name:    { type: String, required: true },
  roles:   [String],
  profile: { bio: String, avatarUrl: String },
}));

const Post = mongoose.model("Post", new mongoose.Schema({
  title:     { type: String, required: true },
  slug:      { type: String, required: true, unique: true },
  published: { type: Boolean, required: true },
  author:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tags:      [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
}));

// …plus Tag and Comment

await mongooseToErdMain(["User", "Post", "Tag", "Comment"], mongoose.model);`;

async function main() {
  const { conn, names } = buildBlogModels();
  const model = conn.model.bind(conn);

  const models = getAllModelDefinitions(names, model);
  const fullD2 = buildErd(models);
  const minimalD2 = buildMinimalErd(models);

  // Render through the same path the package uses, so the SVG on the page is
  // exactly what a consumer would get.
  const { generateErd } = await import("mongoose-to-erd");
  const rendered = await generateErd(names, model, { pad: 30 });

  await mkdir(outDir, { recursive: true });
  await writeFile(
    join(outDir, "diagrams.ts"),
    `// GENERATED at build time by scripts/generate-diagrams.ts — do not edit.
/* eslint-disable */
export const source = ${JSON.stringify(SOURCE)};
export const fullD2 = ${JSON.stringify(fullD2)};
export const minimalD2 = ${JSON.stringify(minimalD2)};
export const fullSvg = ${JSON.stringify(rendered.full.svg)};
export const minimalSvg = ${JSON.stringify(rendered.minimal.svg)};
export const models = ${JSON.stringify(models, null, 2)} as const;
`,
    "utf8"
  );

  console.log(
    `generated ${models.length} models — full ${Math.round(rendered.full.svg.length / 1024)}kB, minimal ${Math.round(rendered.minimal.svg.length / 1024)}kB`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
