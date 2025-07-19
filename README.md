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

```ts
import { mongooseToErdMain } from "mongoose-to-erd";

// all options are optional
const options = {
  sketch: true,
  forceAppendix: false,
  scale: 0.5,
  center: true,
  pad: 100,
};

mongoose.connect("<your-mongodb-url>").then(async () => {
  await mongooseToErdMain(
    mongoose.modelNames(),
    mongoose.model.bind(mongoose),
    options // this is optional
  );
  mongoose.disconnect();
});
```

This will generate two ERD diagrams in SVG format, reflecting your full schema and its minimal structure.

---

## 🧠 How It Works

1. Parses your registered Mongoose models
2. Recursively walks through all paths including sub-schemas
3. Maps schema types into a structured object tree
4. Converts this structure into D2 markup
5. Renders diagrams using the D2 engine

---

## 🧑‍🎓 Credits

Developed with ❤️ by **[Farasat Ali](https://github.com/faraasat)**
Feedback and contributions welcome!
