module.exports = {
    env: {
        browser: false,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'standard-with-typescript'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        indent: ['error', 4],
        semi: [2, 'always'],
        'space-before-function-paren': ['error', 'never'],
        quotes: [
            'error',
            'single',
            { allowTemplateLiterals: true, avoidEscape: true }
        ]
    }
};
