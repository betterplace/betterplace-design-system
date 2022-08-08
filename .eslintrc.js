module.exports = {
  globals: {},
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.base.json', './tsconfig.tsnode.json'],
    files: ['src/**/*', 'config/**/*'],
    extraFileExtensions: ['.md', '.mdx'],
  },
  root: true,
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['src/**/*.mdx', 'src/**/*.md'],
      extends: ['eslint:recommended', 'plugin:mdx/recommended', 'plugin:prettier/recommended'],
      parser: 'eslint-mdx',
    },
    { files: ['figma/**/*', 'generator/**/*'], parserOptions: { project: './tsconfig.tsnode.json' } },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/no-unassigned-import': 0,
    'import/no-named-as-default-member': 0,
    'import/order': 0,
    'react/prop-types': 0,
    'no-empty': ['error', { allowEmptyCatch: true }],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^[_A-Z]',
        argsIgnorePattern: '^_*',
        caughtErrors: 'none',
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
}
