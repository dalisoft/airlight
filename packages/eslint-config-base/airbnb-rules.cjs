// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable max-lines */
// @ts-check

// @ts-expect-error Cannot find namespace 'SharedConfig'
/** @type {Partial<Record<string, SharedConfig.RuleEntry>>} */
module.exports = {
  // Replace Airbnb 'brace-style' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
  'brace-style': 'off',
  '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],

  camelcase: 'off',

  // Replace Airbnb 'comma-dangle' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-dangle.md
  // The TypeScript version also adds 3 new options, all of which should be set to the same value as the base config
  'comma-dangle': 'off',
  '@stylistic/comma-dangle': [
    'error',
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
      enums: 'always-multiline',
      generics: 'always-multiline',
      tuples: 'always-multiline'
    }
  ],

  // Replace Airbnb 'comma-spacing' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
  'comma-spacing': 'off',
  '@stylistic/comma-spacing': ['error', { before: false, after: true }],

  // Replace Airbnb 'default-param-last' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/default-param-last.md
  'default-param-last': 'off',
  '@typescript-eslint/default-param-last': 'error',

  // Replace Airbnb 'func-call-spacing' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
  'func-call-spacing': 'off',
  '@stylistic/function-call-spacing': ['error', 'never'],

  // Replace Airbnb 'indent' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
  indent: 'off',
  '@typescript-eslint/indent': [
    'error',
    2,
    {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      // MemberExpression: null,
      FunctionDeclaration: {
        parameters: 1,
        body: 1
      },
      FunctionExpression: {
        parameters: 1,
        body: 1
      },
      CallExpression: {
        arguments: 1
      },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
      ignoredNodes: [
        'JSXElement',
        'JSXElement > *',
        'JSXAttribute',
        'JSXIdentifier',
        // biome-ignore lint/nursery/noSecrets: It's no secret
        'JSXNamespacedName',
        // biome-ignore lint/nursery/noSecrets: It's no secret
        'JSXMemberExpression',
        // biome-ignore lint/nursery/noSecrets: It's no secret
        'JSXSpreadAttribute',
        // biome-ignore lint/nursery/noSecrets: It's no secret
        'JSXExpressionContainer',
        // biome-ignore lint/nursery/noSecrets: It's no secret
        'JSXOpeningElement',
        // biome-ignore lint/nursery/noSecrets: It's no secret
        'JSXClosingElement',
        'JSXFragment',
        // biome-ignore lint/nursery/noSecrets: It's no secret
        'JSXOpeningFragment',
        // biome-ignore lint/nursery/noSecrets: It's no secret
        'JSXClosingFragment',
        'JSXText',
        // biome-ignore lint/nursery/noSecrets: It's no secret
        'JSXEmptyExpression',
        'JSXSpreadChild'
      ],
      ignoreComments: false
    }
  ],

  // Replace Airbnb 'keyword-spacing' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
  'keyword-spacing': 'off',
  '@stylistic/keyword-spacing': [
    'error',
    {
      before: true,
      after: true,
      overrides: {
        return: { after: true },
        throw: { after: true },
        case: { after: true }
      }
    }
  ],

  // Replace Airbnb 'lines-between-class-members' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
  'lines-between-class-members': 'off',
  '@stylistic/lines-between-class-members': [
    'error',
    'always',
    { exceptAfterSingleLine: false }
  ],

  // Replace Airbnb 'no-array-constructor' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
  'no-array-constructor': 'off',
  '@typescript-eslint/no-array-constructor': 'error',

  // Replace Airbnb 'no-dupe-class-members' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
  'no-dupe-class-members': 'off',
  '@typescript-eslint/no-dupe-class-members': 'error',

  // Replace Airbnb 'no-empty-function' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
  'no-empty-function': 'off',
  '@typescript-eslint/no-empty-function': [
    'error',
    {
      allow: ['arrowFunctions', 'functions', 'methods']
    }
  ],

  // Replace Airbnb 'no-extra-parens' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
  'no-extra-parens': 'off',
  '@typescript-eslint/no-extra-parens': [
    'off',
    'all',
    {
      conditionalAssign: true,
      nestedBinaryExpressions: false,
      returnAssign: false,
      ignoreJSX: 'all', // delegate to eslint-plugin-react
      enforceForArrowConditionals: false
    }
  ],

  // Replace Airbnb 'no-extra-semi' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
  'no-extra-semi': 'off',
  '@stylistic/no-extra-semi': 'error',

  // Replace Airbnb 'no-loss-of-precision' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loss-of-precision.md
  'no-loss-of-precision': 'off',
  '@typescript-eslint/no-loss-of-precision': 'error',

  // Replace Airbnb 'no-loop-func' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loop-func.md
  'no-loop-func': 'off',
  '@typescript-eslint/no-loop-func': 'error',

  // Replace Airbnb 'no-magic-numbers' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
  'no-magic-numbers': 'off',
  '@typescript-eslint/no-magic-numbers': [
    'off',
    {
      ignore: [],
      ignoreArrayIndexes: true,
      enforceConst: true,
      detectObjects: false
    }
  ],

  // Replace Airbnb 'no-redeclare' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-redeclare.md
  'no-redeclare': 'off',
  '@typescript-eslint/no-redeclare': 'error',

  // Replace Airbnb 'no-shadow' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': 'error',

  // Replace Airbnb 'space-before-blocks' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-blocks.md
  'space-before-blocks': 'off',
  '@stylistic/space-before-blocks': 'error',

  // Replace Airbnb 'no-unused-expressions' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
  'no-unused-expressions': 'off',
  '@typescript-eslint/no-unused-expressions': [
    'error',
    {
      allowShortCircuit: false,
      allowTernary: false,
      allowTaggedTemplates: false
    }
  ],

  // Replace Airbnb 'no-unused-vars' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.mdx
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      vars: 'all',
      args: 'all',
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: false
    }
  ],

  // Replace Airbnb 'no-use-before-define' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
  'no-use-before-define': 'off',
  '@typescript-eslint/no-use-before-define': [
    'error',
    { functions: true, classes: true, variables: true }
  ],

  // Replace Airbnb 'no-useless-constructor' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
  'no-useless-constructor': 'off',
  '@typescript-eslint/no-useless-constructor': 'error',

  // Replace Airbnb 'quotes' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
  quotes: 'off',
  '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],

  // Replace Airbnb 'semi' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
  semi: 'off',
  '@stylistic/semi': ['error', 'always'],

  // Replace Airbnb 'space-before-function-paren' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
  'space-before-function-paren': 'off',
  '@stylistic/space-before-function-paren': [
    'error',
    {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }
  ],

  // Replace Airbnb 'require-await' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
  'require-await': 'off',
  '@typescript-eslint/require-await': 'off',

  // Replace Airbnb 'space-infix-ops' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-infix-ops.md
  'space-infix-ops': 'off',
  '@stylistic/space-infix-ops': 'error',

  // Replace Airbnb 'object-curly-spacing' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/object-curly-spacing.md
  'object-curly-spacing': 'off',
  '@stylistic/object-curly-spacing': ['error', 'always'],

  '@typescript-eslint/ban-ts-comment': 'error',

  // Append 'ts' and 'tsx' to Airbnb 'import-x/extensions' rule
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
  'import-x/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'always',
      cjs: 'never',
      mjs: 'always',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
      json: 'always',
      node: 'always',
      wasm: 'always'
    }
  ],

  // Append 'ts' and 'tsx' extensions to Airbnb 'import-x/no-extraneous-dependencies' rule
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
  'import-x/no-extraneous-dependencies': [
    'error',
    {
      optionalDependencies: false,
      devDependencies: [
        'test/**', // tape, common npm pattern
        'tests/**', // also common npm pattern
        'spec/**', // mocha, rspec-like pattern
        '**/__tests__/**', // jest pattern
        '**/__mocks__/**', // jest pattern
        'test.{js,jsx}', // repos with a single test file
        'test-*.{js,jsx}', // repos with multiple top-level test files
        '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
        '**/jest.config.js', // jest config
        '**/jest.setup.js', // jest setup
        '**/vue.config.js', // vue-cli config
        '**/webpack.config.js', // webpack config
        '**/webpack.config.*.js', // webpack config
        '**/rollup.config.js', // rollup config
        '**/rollup.config.*.js', // rollup config
        '**/gulpfile.js', // gulp config
        '**/gulpfile.*.js', // gulp config
        '**/Gruntfile{,.js}', // grunt config
        '**/protractor.conf.js', // protractor config
        '**/protractor.conf.*.js', // protractor config
        '**/karma.conf.js', // karma config
        '**/.eslintrc.js', // eslint config
        '**/eslint.config.js', // eslint flat config
        '**/eslint.config.cjs', // eslint flat config
        '**/eslint.config.mjs' // eslint flat config
      ].reduce(
        /** @param {string[]} result
         *  @param {string} devDep
         * @returns {string[]}
         */
        (result, devDep) => {
          const toAppend = [devDep];
          const devDepWithTs = devDep.replace(/\bjs(x?)\b/g, 'ts$1');
          if (devDepWithTs !== devDep) {
            toAppend.push(devDepWithTs);
          }
          return result.concat(toAppend);
        },
        []
      )
    }
  ]
};
