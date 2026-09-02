import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const required = ["index.html", "styles.css", "script.js", "assets/ram.jpeg", "assets/favicon.svg", "vercel.json"];
await Promise.all(required.map((file) => access(resolve(root, file))));

const html = await readFile(resolve(root, "index.html"), "utf8");
for (const marker of ['<h1 id="title">RAM</h1>', 'id="x-link"', 'id="ca-button"', 'assets/ram.jpeg', 'SK hynix', 'RAM holders paid']) {
  if (!html.includes(marker)) throw new Error(`Missing required marker: ${marker}`);
}

const script = await readFile(resolve(root, "script.js"), "utf8");
if (!script.includes('xUrl: ""') || !script.includes('contractAddress: ""')) {
  throw new Error("RAM link configuration is missing");
}
console.log("Source check passed");
