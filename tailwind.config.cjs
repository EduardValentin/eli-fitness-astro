/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            screens: {
                'full-hd': '1920px',
                '2k': '2560px',
                'landscape-mobile': {
                    raw: '(orientation: landscape) and (max-width: 639px)',
                },
            },
            textShadow: {
                sm: '0 1px 2px var(--tw-shadow-color)',
                DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                lg: '0 8px 16px var(--tw-shadow-color)',
                none: 'none',
            },
            colors: {
                primary: '#000000',
                secondary: '#ffffff',
                accent: '#ff0000',
            },
            fontFamily: {
                raleway: ['Raleway', 'sans-serif'],
            },
            inset: {
                left: '181px 0px 900px 202px #000000a6',
            },
            boxShadow: {
                inner: '181px 0px 900px 202px #000000a6',
            },
        },
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    'text-shadow': (value) => ({
                        textShadow: value,
                    }),
                },
                { values: theme('textShadow') }
            );
        }),
    ],
};
