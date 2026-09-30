"use client";

import { useState } from "react";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Code } from "@/components/code";
import { track } from "@/components/analytics";
import {
  source,
  fullD2,
  minimalD2,
  fullSvg,
  minimalSvg,
  models,
} from "@/generated/diagrams";

type View = "full" | "minimal";

export default function Home() {
  const [view, setView] = useState<View>("full");
  const [showD2, setShowD2] = useState(false);

  const svg = view === "full" ? fullSvg : minimalSvg;
  const d2 = view === "full" ? fullD2 : minimalD2;

  const choose = (v: View) => {
    setView(v);
    track("diagram_view_changed", { view: v });
  };

  return (
    <main className="wrap">
      <Hero />

      <section className="card">
        <h2>Generated from a real schema</h2>
        <p className="sub">
          Everything below is produced at build time by the actual package —
          the same <code>generateErd()</code> call you would make yourself,
          rendered through D2. Nothing here is a mock-up.
        </p>

        <div className="row">
          <button
            className={`demo${view === "full" ? " primary" : ""}`}
            onClick={() => choose("full")}
          >
            Full ERD
          </button>
          <button
            className={`demo${view === "minimal" ? " primary" : ""}`}
            onClick={() => choose("minimal")}
          >
            Minimal ERD
          </button>
          <button className="demo" onClick={() => setShowD2((d) => !d)}>
            {showD2 ? "Show diagram" : "Show D2 source"}
          </button>
        </div>

        <p className="sub" style={{ marginTop: 14 }}>
          {view === "full"
            ? "Every field, constraint and method."
            : "Entities and their relationships only."}
        </p>

        {showD2 ? (
          <Code language="tsx">{d2}</Code>
        ) : (
          <div
            className="erd"
            /* Build-time output from our own generator, not user input. */
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </section>

      <section className="card">
        <h2>The schema behind it</h2>
        <p className="sub">
          Four models with unique constraints, references, arrays of
          subdocuments, embedded objects, and instance/static methods.
        </p>
        <Code language="tsx">{source}</Code>
      </section>

      <section className="card">
        <h2>What was extracted</h2>
        <p className="sub">
          <code>getAllModelDefinitions()</code> returns this typed description,
          which you can post-process before rendering.
        </p>
        <dl className="state">
          {models.map((m) => (
            <div key={m.name} style={{ display: "contents" }}>
              <dt>{m.name}</dt>
              <dd>
                {m.structure.length} fields
                {m.methods.instanceMethods.length > 0 &&
                  `, ${m.methods.instanceMethods.length} instance method(s)`}
                {m.methods.staticMethods.length > 0 &&
                  `, ${m.methods.staticMethods.length} static method(s)`}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="card">
        <h2>Usage</h2>
        <Code language="tsx">{`import mongoose from "mongoose";
import { mongooseToErdMain } from "mongoose-to-erd";

import "./models/user";
import "./models/post";

const { files } = await mongooseToErdMain(
  ["User", "Post"],
  mongoose.model,
  { outDir: "docs/diagrams", timestamp: false }
);`}</Code>
      </section>

      <section className="card">
        <h2>Without touching the filesystem</h2>
        <p className="sub">
          <code>generateErd()</code> hands back the SVG and D2 source so you can
          embed, diff or serve them — which is exactly how this page is built.
        </p>
        <Code language="tsx">{`const erd = await generateErd(names, mongoose.model);

erd.full.svg;     // rendered SVG string
erd.full.d2;      // the generated D2 source
erd.models;       // the extracted schema definitions`}</Code>
      </section>

      <section className="card">
        <h2>Catching schema drift in CI</h2>
        <p className="sub">
          The D2 output is deterministic, so a committed diagram can be checked
          for drift on every build.
        </p>
        <Code language="tsx">{`const { full } = await generateErd(names, mongoose.model);

if (full.d2 !== readFileSync("docs/schema.d2", "utf8")) {
  throw new Error("Schema changed — regenerate docs/schema.d2");
}`}</Code>
      </section>

      <Footer />
    </main>
  );
}
