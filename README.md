# 🧩 mongoose-to-erd

**Generate Entity-Relationship Diagrams (ERDs) from your Mongoose models, instantly.**

Supports full schema traversal, embedded documents, arrays, and model relationships — exported beautifully as SVG using [@terrastruct/d2](https://github.com/terrastruct/d2).

---

## 📦 Installation

```bash
npm install mongoose-to-erd --save-dev
# or
yarn add mongoose-to-erd -D
# or
pnpm install mongoose-to-erd --save-dev
# or
bun add --development mongoose-to-erd
```

---

## 🧠 Features

- ✅ Extracts and visualizes all paths and nested schemas in your Mongoose models
- 🔄 Resolves references (`ref`) into foreign key relationships
- 🧱 Distinguishes between primitives, arrays, and embedded schemas
- 🔍 Adds instance/static methods to ERD as metadata
- 🧾 Generates two diagram types:

  - **Minimal ERD** – only model names and references
  - **Full ERD** – includes schema fields, types, constraints, and methods

- 📄 Outputs clean `.svg` files compatible with browsers and documentation tools

---

## 📂 Output

Two `.svg` diagrams are generated in the project root:

```txt
full-erd-<timestamp>.svg
minimal-erd-<timestamp>.svg
```

---

## 🛠️ Usage

### 1. Setup your models

Make sure your Mongoose models are registered:

```ts
import mongoose from "mongoose";
import "./models/User";
import "./models/Post";
import "./models/Comment";
```

### 2. Call the generator

```ts
import { mongooseToErdMain } from "mongoose-to-erd";

mongoose.connect("<your-mongodb-url>").then(async () => {
  await mongooseToErdMain(
    mongoose.modelNames(),
    mongoose.model.bind(mongoose),
    false
  );
  mongoose.disconnect();
});
```

This will generate two ERD diagrams in SVG format, reflecting your full schema and its minimal structure.

---

## 📘 Example

Given the following Mongoose schema:

```ts
const CommentSchema = new Schema({
  content: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const PostSchema = new Schema({
  title: String,
  body: String,
  comments: [CommentSchema],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});
```

The tool generates:

✅ A full ERD with:

- All field names and types
- Embedded `Comment` schemas inside `Post`
- `createdBy` and `author` as foreign keys to `User`
- Metadata like method names

✅ A minimal ERD with:

- Boxes for `User`, `Post`, and `Comment`
- Arrows from `Post` → `User`, `Comment` → `User`

## 📌 Requirements

- Node.js 18+
- Mongoose v6+
- [@terrastruct/d2](https://www.npmjs.com/package/@terrastruct/d2)

---

## 🧠 How It Works

1. Parses your registered Mongoose models
2. Recursively walks through all paths including sub-schemas
3. Maps schema types into a structured object tree
4. Converts this structure into D2 markup
5. Renders diagrams using the D2 engine

---

## 💡 Tips

- Ensure all models are registered via `mongoose.model(...)` before calling `mongooseToErdMain`.
- Use `.bind(mongoose)` when passing the model getter for type safety.
- Open SVGs in your browser, Figma, or VS Code for preview.

---

## 🧑‍🎓 Credits

Developed with ❤️ by **[Farasat Ali](https://github.com/faraasat)**
Feedback and contributions welcome!
