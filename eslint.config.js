import { Linter } from 'eslint';

const config = {
    extends: ['next/core-web-vitals', 'next'],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    rules: {
        'react/no-unescaped-entities': 'off',
        '@next/next/no-page-custom-font': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
    },
    ignores: ['node_modules/', 'dist/', 'build/'], // Add your ignore patterns here
};

export default config;