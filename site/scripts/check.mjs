import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const required = ["index.html", "styles.css", "script.js", "assets/ram-running.jpg", "assets/fonts/alfa-slab-one.ttf", "assets/fonts/OFL-Alfa-Slab-One.txt", "assets/favicon.svg", "vercel.json"];
await Promise.all(required.map((file) => access(resolve(root, file))));
const html = await readFile(resolve(root, "index.html"), "utf8");
for (const marker of ['<h1 id="title"><span>ABSOLUTE</span><span>UNIT</span></h1>', "HOW MUCH <b>$RAM</b>", 'id="x-link"', 'id="ca-button"', "https://x.com/elonmusk/status/1118600979329339393", "https://knowyourmeme.com/memes/absolute-unit", "assets/ram-running.jpg", "SK hynix", "RAM HOLDERS", "ticker__group"]) {
  if (!html.includes(marker)) throw new Error(`Missing required marker: ${marker}`);
}
const script = await readFile(resolve(root, "script.js"), "utf8");
if (!script.includes('xUrl: ""') || !script.includes('contractAddress: ""')) throw new Error("RAM link configuration is missing");
console.log("Source check passed");
