import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { globSync } from "glob";

const cwd = process.cwd();

export function findSemanticSourcePath() {
  const directPath = join(cwd, "src", "semantic");

  if (existsSync(join(directPath, "catalog.yml"))) {
    return directPath;
  }

  const [catalogPath] = globSync("**/src/semantic/catalog.yml", {
    cwd,
    absolute: true,
    nodir: true,
  });

  if (catalogPath) {
    return dirname(catalogPath);
  }

  throw new Error(
    `Semantic files not found from cwd=${cwd}. Tried ${directPath} and recursive lookup for src/semantic/catalog.yml.`
  );
}

export function findDatabasePath() {
  const directPath = join(cwd, "data", "oss-data-analyst.db");

  if (existsSync(directPath)) {
    return directPath;
  }

  const [databasePath] = globSync("**/data/oss-data-analyst.db", {
    cwd,
    absolute: true,
    nodir: true,
  });

  if (databasePath) {
    return databasePath;
  }

  throw new Error(
    `SQLite database not found from cwd=${cwd}. Tried ${directPath} and recursive lookup for data/oss-data-analyst.db.`
  );
}
