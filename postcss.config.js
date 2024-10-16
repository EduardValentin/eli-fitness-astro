import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import tailwind from 'tailwindcss';

import tailwindConfig from './tailwind.config.cjs';

export default {
    plugins: [postcssImport, tailwind(tailwindConfig), autoprefixer],
};
