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
  <a href="https://www.npmjs.com/package/mongoose-to-erd">npm</a> ·
  <a href="https://github.com/faraasat/mongoose-to-erd/blob/main/CHANGELOG.md">Changelog</a> ·
  <a href="https://github.com/faraasat/mongoose-to-erd/issues">Issues</a>
</p>

---

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

await mongooseToErdMain(["User", "Post"], mongoose.model);
```

This writes two SVGs to the working directory:

| File | Contents |
| --- | --- |
| `full-erd-<iso-date>.svg` | Every field, constraint and method |
| `minimal-erd-<iso-date>.svg` | Entities and their relationships only |

## Options

```ts
await mongooseToErdMain(["User", "Post"], mongoose.model, {
  sketch: true,
  scale: 1.5,
  pad: 50,
  center: true,
});
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `sketch` | `boolean` | `false` | Hand-drawn rendering style. |
| `scale` | `number` | — | Output scale factor. |
| `pad` | `number` | — | Padding around the diagram, in pixels. |
| `center` | `boolean` | — | Centre the diagram in the viewport. |
| `forceAppendix` | `boolean` | — | Force D2 to render an appendix. |

## Building the diagram yourself

The extraction and D2-generation steps are exported separately, so you can
render, post-process or diff the output instead of writing files:

```ts
import { getAllModelDefinitions, buildErd } from "mongoose-to-erd";

const models = getAllModelDefinitions(["User", "Post"], mongoose.model);
const d2Source = buildErd(models);

console.log(d2Source); // valid D2, ready for the d2 CLI or @terrastruct/d2
```

`getAllModelDefinitions` returns a typed description of each model:

```ts
interface ModelInfo {
  name: string;
  structure: SchemaStructure[];  // fields, nested children, options
  methods: Record<string, string[]>;
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

Releases are manual — nothing publishes on a push to `main`. Maintainers run
the **Release** workflow from the Actions tab.

## Privacy

The published package contains **no telemetry**.

## License

[MIT](./LICENSE) © [Farasat Ali](https://github.com/faraasat)
