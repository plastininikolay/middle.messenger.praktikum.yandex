import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{files: ["**/*.{js,mjs,cjs,ts}"]},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{languageOptions: {globals: globals.browser}},
	{rules: {
		"@typescript-eslint/no-explicit-any": ["warn"]
	}},
	{ignores: ["dist/*", "node_modules/*"]}
];
