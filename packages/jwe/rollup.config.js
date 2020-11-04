export default {
  input: './src/jwe.js',
  output: [
    {
      format: 'cjs',
      file: 'jwe.cjs',
      esModule: false,
      exports: 'named'
    }
  ],
  external: ['node-webtokens', 'crypto']
};
