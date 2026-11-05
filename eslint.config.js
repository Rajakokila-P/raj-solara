// Recommended correctness rules for browser modules and Node tooling.
import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/**', '_site/**'] },
  js.configs.recommended,
  { files: ['dist/js/**/*.js'], languageOptions: { globals: globals.browser } },
  { files: ['scripts/**/*.cjs', 'tests/**/*.cjs'], languageOptions: { sourceType: 'commonjs', globals: globals.node } },
  // Playwright evaluate callbacks execute in the browser, not Node.
  { files: ['tests/browser-check.cjs'], languageOptions: { globals: { document: 'readonly', innerWidth: 'readonly' } } },
  { files: ['tests/**/*.test.js'], languageOptions: { globals: globals.node } }
];
