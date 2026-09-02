import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(siteRoot, "dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of ["index.html", "styles.css", "script.js", "assets"]) {
  await cp(resolve(siteRoot, file), resolve(output, file), { recursive: true });
}
console.log(`Built ${output}`);
