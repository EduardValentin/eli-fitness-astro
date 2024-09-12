module.exports = {
    multipass: true,
    js2svg: {
        pretty: true,
    },
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    removeViewBox: false,
                    cleanupIds: false,
                },
            },
        },
        {
            name: 'removeAttrs',
            params: {
                attrs: '(fill|stroke|fill-opacity)',
            },
        },
        {
            name: 'removeUnknownsAndDefaults',
            params: {
                keepDataAttrs: false,
            },
        },
    ],
}
