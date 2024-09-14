import { readFileSync } from 'fs';

const fileRegex = /\.(pdf)$/;

export default function myPlugin() {
    return {
        name: 'transform-file',

        transform(src: string, id: string) {
            if (fileRegex.test(id)) {
                return {
                    code: toBase64Pdf(id, src),
                    map: null, // provide source map if available
                };
            }
        },
    };
}

function toBase64Pdf(id: string, src: string) {
    const [path, query] = id.split('?');
    if (!path) {
        return;
    }
    if (query != 'base64') return null;

    const data = readFileSync(path);
    const base64 = data.toString('base64');

    return `export default '${base64}';`;
}
