import { createBashTool } from "bash-tool";
import type { Sandbox } from "@vercel/sandbox";
import { findSemanticSourcePath } from "@/lib/runtime-paths";

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
  const semanticSourcePath = findSemanticSourcePath();

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
