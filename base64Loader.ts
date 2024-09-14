import fs from 'fs';
import type { Plugin } from 'vite';

export const base64 = async (): Promise<Plugin> => {
    return {
        name: 'vite-plugin-base64',
        enforce: 'pre' as const,
        load: async (id: string) => {
            const [path, query] = id.split('?');

            if (query != 'base64' || !path) return null;

            const data = fs.readFileSync(path);
            const base64 = data.toString('base64');

            return `export default '${base64}';`;
        },
    };
};

export default base64;
