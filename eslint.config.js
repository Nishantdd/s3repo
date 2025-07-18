const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = [
    ...compat.extends(
        'eslint:recommended',
        'next',
        'next/core-web-vitals',
        'next/typescript',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ),
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: require('@typescript-eslint/parser'),
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
                project: './tsconfig.json'
            }
        },
        plugins: {
            react: require('eslint-plugin-react'),
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
        },
        rules: {
            'react/react-in-jsx-scope': 'off'
        }
    }
];
