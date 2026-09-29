export function Hero() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <header className="hero">
      <img src={`${base}/banner.svg`} alt="mongoose-to-erd" />
      <h1>mongoose-to-erd</h1>
      <p>
        Turn your Mongoose schemas into entity-relationship diagrams,
        automatically.
      </p>
      <nav className="links">
        <a href="https://www.npmjs.com/package/mongoose-to-erd">npm</a>
        <a href="https://github.com/faraasat/mongoose-to-erd">GitHub</a>
        <a href="https://github.com/faraasat/mongoose-to-erd#readme">Docs</a>
      </nav>
    </header>
  );
}
