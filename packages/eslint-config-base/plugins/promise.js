// @ts-check
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat();

export default tseslint.config(
  ...fixupConfigRules(
    compat.config({
      extends: ['plugin:promise/recommended'],
      ignorePatterns: ['tests/e2e']
    })
  )
);
