export const CLAUDE_MODELS = [
  {
    name: "Claude Opus 4.7",
    value: "anthropic/claude-opus-4-7",
  },
  {
    name: "Claude Sonnet 4.6",
    value: "anthropic/claude-sonnet-4-6",
  },
  {
    name: "Claude Haiku 4.5",
    value: "anthropic/claude-haiku-4-5",
  },
] as const;

export const DEFAULT_MODEL = CLAUDE_MODELS[0].value;
