import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['**/node_modules/', '.dist/'],
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly',
      },
    },

    rules: {
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: 'err|error|password|__v', // Only warn for unused err/error variables
          argsIgnorePattern: '^_', // (Optional) ignore args starting with _
        },
      ],
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
