<p align="center">
  <img src="https://raw.githubusercontent.com/faraasat/mongoose-to-erd/main/.github/assets/banner.svg" alt="mongoose-to-erd" width="100%" />
</p>

<p align="center">
  Turn your Mongoose schemas into entity-relationship diagrams, automatically.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/mongoose-to-erd"><img alt="npm version" src="https://img.shields.io/npm/v/mongoose-to-erd?color=cb3837&label=npm&logo=npm"></a>
  <a href="https://www.npmjs.com/package/mongoose-to-erd"><img alt="downloads" src="https://img.shields.io/npm/dm/mongoose-to-erd?color=cb3837&label=downloads"></a>
  <a href="https://bundlephobia.com/package/mongoose-to-erd"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/mongoose-to-erd?label=minzipped"></a>
  <a href="https://github.com/faraasat/mongoose-to-erd/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/faraasat/mongoose-to-erd/actions/workflows/ci.yml/badge.svg"></a>
  <img alt="types" src="https://img.shields.io/badge/types-included-3178c6?logo=typescript&logoColor=white">
  <a href="https://github.com/faraasat/mongoose-to-erd/blob/main/LICENSE"><img alt="license" src="https://img.shields.io/npm/l/mongoose-to-erd?color=blue"></a>
</p>

<p align="center">
  <a href="https://faraasat.github.io/mongoose-to-erd/"><b>Live demo</b></a> ·
  <a href="https://www.npmjs.com/package/mongoose-to-erd">npm</a> ·
  <a href="https://github.com/faraasat/mongoose-to-erd/blob/main/CHANGELOG.md">Changelog</a> ·
  <a href="https://github.com/faraasat/mongoose-to-erd/issues">Issues</a>
</p>

---

## Upgrading from 1.x

`2.0.0` adds a filesystem-free API and output control, and fixes the schema
mapping. `mongooseToErdMain(names, mongoose.model, options)` keeps its
signature, but three things differ.

| Change | Impact | What to do |
| --- | --- | --- |
| **Failures now reject** | 1.x caught everything and logged it, so a failed run looked identical to a successful one | Wrap in `try/catch` if you were relying on it never throwing |
| **Timestamps use `-` instead of `:`** | Output is `full-erd-2026-09-29T10-15-00-000Z.svg`; colons are not valid in Windows filenames | Use `timestamp: false` with `fullFileName` for stable, committable names |
| **The diagram itself changed** | `_id` and `ref` fields are now recognised, so primary keys, foreign keys and relationship edges appear where they previously did not | Regenerate; the new output is correct |

That last one was a genuine bug: the type check looked for `"ObjectID"` while
Mongoose reports `"ObjectId"`, so on any modern Mongoose **every** `_id` and
every `ref` was misclassified.

Two further output fixes: `Array` and `Embedded` fields were emitted without a
trailing newline (running into the next field), and nested tables were named
with `Math.random()` — so regenerating the same schema produced different D2
every time. Output is now deterministic and can be committed and diffed.

### New, optional

```ts
const erd = await generateErd(names, mongoose.model);
erd.full.svg;   // nothing written to disk
erd.full.d2;
```

## Why

Your schema *is* your data model, but it lives across a dozen files. This reads
your registered Mongoose models and renders them as SVG entity-relationship
diagrams via [D2](https://d2lang.com) — including primary keys, foreign keys,
unique constraints, embedded documents, arrays, and instance/static methods.

## Installation

```bash
npm install mongoose-to-erd
```

<details>
<summary>yarn / pnpm / bun</summary>

```bash
yarn add mongoose-to-erd
pnpm add mongoose-to-erd
bun add mongoose-to-erd
```
</details>

**Peer dependency:** `mongoose >= 5.2.9`. Requires Node 18+.

## Quick start

Register your models first, then hand their names to the generator:

```ts
import mongoose from "mongoose";
import { mongooseToErdMain } from "mongoose-to-erd";

import "./models/user";
import "./models/post";

const { files } = await mongooseToErdMain(["User", "Post"], mongoose.model);
console.log(files); // { full: "…/full-erd-….svg", minimal: "…/minimal-erd-….svg" }
```

This writes two SVGs:

| File | Contents |
| --- | --- |
| `full-erd-<timestamp>.svg` | Every field, constraint and method |
| `minimal-erd-<timestamp>.svg` | Entities and their relationships only |

No database connection is needed — the schemas are read straight from
Mongoose's registry.

## Without touching the filesystem

`generateErd` returns the D2 source and rendered SVG so you can post-process,
diff, embed or serve them yourself:

```ts
import { generateErd } from "mongoose-to-erd";

const erd = await generateErd(["User", "Post"], mongoose.model);

erd.full.svg;      // rendered SVG string
erd.full.d2;       // the generated D2 source
erd.minimal.svg;
erd.models;        // the extracted schema definitions
```

Handy for committing a diagram in CI and failing when it drifts:

```ts
const { full } = await generateErd(modelNames, mongoose.model);
if (full.d2 !== readFileSync("docs/schema.d2", "utf8")) {
  throw new Error("Schema changed — regenerate docs/schema.d2");
}
```

## Building the pieces yourself

```ts
import { getAllModelDefinitions, buildErd, buildMinimalErd } from "mongoose-to-erd";

const models = getAllModelDefinitions(["User", "Post"], mongoose.model);
const d2Source = buildErd(models);        // full
const overview = buildMinimalErd(models); // entities + edges only
```

`getAllModelDefinitions` returns a typed description of each model:

```ts
interface ModelInfo {
  name: string;
  structure: SchemaStructure[];  // fields, nested children, options
  methods: Record<string, string[]>;
}
```

## Options

### Rendering

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `layout` | `"elk" \| "dagre"` | `"elk"` | D2 layout engine. |
| `sketch` | `boolean` | `false` | Hand-drawn rendering style. |
| `themeId` | `number` | — | D2 theme id. |
| `scale` | `number` | — | Output scale factor. |
| `pad` | `number` | `20` | Padding around the diagram, in px. |
| `center` | `boolean` | — | Centre the diagram in the viewport. |
| `forceAppendix` | `boolean` | — | Force D2 to render an appendix. |

### Output

Only used by `mongooseToErdMain`.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `outDir` | `string` | `process.cwd()` | Directory to write into. Created if missing. |
| `fullFileName` | `string` | `full-erd-<timestamp>` | Base name (no extension). |
| `minimalFileName` | `string` | `minimal-erd-<timestamp>` | Base name (no extension). |
| `timestamp` | `boolean` | `true` | Append a timestamp to the default names. |

```ts
await mongooseToErdMain(["User", "Post"], mongoose.model, {
  outDir: "docs/diagrams",
  timestamp: false,   // stable names, so the files can be committed
  sketch: true,
  pad: 50,
});
```

## Errors

`mongooseToErdMain` **rejects** on failure rather than swallowing the error.
Earlier versions caught everything and logged it, so a failed run looked
identical to a successful one:

```ts
try {
  await mongooseToErdMain(names, mongoose.model);
} catch (err) {
  process.exitCode = 1;
}
```

## What gets mapped

| Mongoose | Diagram |
| --- | --- |
| `_id` | Primary key constraint |
| `{ type: ObjectId, ref: "Other" }` | Foreign key constraint + relationship edge |
| `{ unique: true }` | Unique constraint |
| Embedded object | Nested table, one-to-one edge |
| Array of subdocuments | Nested table, one-to-many edge |
| `schema.methods` | `name(): instanceMethod` |
| `schema.statics` | `name(): staticMethod` |

## Notes

- Models must be **registered** with Mongoose before you call this; the
  generator resolves them by name through the `mongoose.model` function you
  pass in. No database connection is needed.
- Diagrams are rendered by `@terrastruct/d2`, which is bundled as a dependency.

## Contributing

Issues and pull requests are welcome.

```bash
git clone https://github.com/faraasat/mongoose-to-erd.git
cd mongoose-to-erd
npm install
npm test          # vitest
npm run typecheck # tsc --noEmit
npm run build     # tsup
```

To run the demo site against your local build:

```bash
npm run example:dev
```

The demo generates its diagrams at build time by calling this package for
real, so what the page shows is genuine output rather than a mock-up.

Releases are manual — nothing publishes on a push to `main`. Maintainers run
the **Release** workflow from the Actions tab.

## Privacy

The published package contains **no telemetry**. The demo site at
[faraasat.github.io/mongoose-to-erd](https://faraasat.github.io/mongoose-to-erd/)
uses Google Analytics and Aptabase; the library itself never phones home.

## License

[MIT](./LICENSE) © [Farasat Ali](https://github.com/faraasat)
