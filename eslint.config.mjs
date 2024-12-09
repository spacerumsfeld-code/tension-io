import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {
    ignores: ["**/sst-env.d.ts", "**/api.client.ts", "**/async.ts", "**/auth.ts", "**/stripe.ts", "**/_internals"],
  },
  { rules: { "@typescript-eslint/no-duplicate-enum-values": "off" } },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]; 