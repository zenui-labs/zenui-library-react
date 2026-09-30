module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.snippet-check', '.eslintrc.cjs', 'tailwind.config.js', 'postcss.config.js'],
    // The source is TypeScript; this parser also reads plain JavaScript.
    parser: '@typescript-eslint/parser',
    parserOptions: {ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: {jsx: true}},
    settings: {react: {version: 'detect'}},
    plugins: ['react-refresh', 'unused-imports', '@typescript-eslint'],
    rules: {
        // TypeScript checks these itself (types and undefined names), so the JavaScript versions only add noise.
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'react/prop-types': 'off',
        // Apostrophes and quotes in JSX text render correctly; escaping them as &apos; would make the
        // copyable example code harder to read.
        'react/no-unescaped-entities': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
    },
    overrides: [
        {
            // Catalog thumbnails are exported as a map keyed by page slug; editing one just reloads the page.
            files: ['src/Shared/Catalog/art/**'],
            rules: {'react-refresh/only-export-components': 'off'},
        },
        {
            // Node scripts
            files: ['scripts/**/*.mjs', 'vite.config.ts'],
            env: {node: true, browser: false},
        },
    ],
}
