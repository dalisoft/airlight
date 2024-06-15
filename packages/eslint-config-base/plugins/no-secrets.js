// @ts-check
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import noSecrets from 'eslint-plugin-no-secrets';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  name: 'eslint-plugin-no-secrets',
  files: ['*.cjs', '*.js', '*.mjs', '*.ts', '*.jsx', '*.tsx'],
  plugins: {
    'no-secrets': noSecrets
  },
  rules: {
    'no-secrets/no-secrets': 'error'
  }
});
