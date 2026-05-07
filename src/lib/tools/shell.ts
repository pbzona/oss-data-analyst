import { createBashTool } from "bash-tool";
import type { Sandbox } from "@vercel/sandbox";
import { constants } from "node:fs";
import { access } from "node:fs/promises";
import { join } from "node:path";

const semanticSourcePath = join(process.cwd(), "src", "semantic");

/**
 * Creates bash tools bound to a specific sandbox instance using bash-tool package.
 * Uploads semantic layer YAML files to the sandbox at ./semantic/
 *
 * Usage:
 * ```ts
 * const sandbox = await Sandbox.create();
 * const { tools } = await createSemanticBashTools(sandbox);
 * // use tools.bash in agent tools...
 * ```
 */
export async function createSemanticBashTools(sandbox: Sandbox) {
  try {
    await access(semanticSourcePath, constants.R_OK);
  } catch {
    throw new Error(
      `Semantic files not found at ${semanticSourcePath}. cwd=${process.cwd()}. Ensure src/semantic/**/*.yml is included in the server trace for this route.`
    );
  }

  const { tools } = await createBashTool({
    sandbox,
    destination: "./semantic",
    uploadDirectory: {
      source: semanticSourcePath,
      include: "**/*.yml",
    },
  });

  return { tools };
}
