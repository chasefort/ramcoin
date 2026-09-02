import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const mime = { ".css": "text/css", ".html": "text/html; charset=utf-8", ".jpeg": "image/jpeg", ".js": "text/javascript; charset=utf-8" };

createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const file = resolve(root, `.${pathname === "/" ? "/index.html" : pathname}`);
  if (!file.startsWith(root)) return response.writeHead(403).end("Forbidden");
  try {
    if (!(await stat(file)).isFile()) throw new Error();
    response.setHeader("Content-Type", mime[extname(file)] ?? "application/octet-stream");
    createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(4173, "127.0.0.1", () => console.log("RAM is running at http://127.0.0.1:4173"));
