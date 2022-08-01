import path from "node:path";
import fs from "node:fs";
export function readFile(project_relative_file_path: string) {
  const filePath = path.resolve(project_relative_file_path);
  return fs.readFileSync(filePath);
}
