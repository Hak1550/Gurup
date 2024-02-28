const path = require('path');

const extraNodeModules = {};

module.exports = {
    watchFolders:[
        path.resolve(__dirname, '../requester'),
        path.resolve(__dirname, "../store"),
        path.resolve(__dirname, "../reducers"),
        path.resolve(__dirname, "../actions"),
        path.resolve(__dirname, "../hocs"),
        path.resolve(__dirname, "../middlewares"),
        path.resolve(__dirname, "../utils")
    ],
    resolver: {
        extraNodeModules: new Proxy(extraNodeModules, {
            //redirects dependencies referenced from common/ to local node_modules
            get: (target, name) => name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`)
        }),
    },
    transformer: {
        /* transformer options */
        assetPlugins: ['expo-asset/tools/hashAssetFiles']
    },
    serializer: {
        /* serializer options */
    },
    server: {
        /* server options */
    }

    /* general options */
};
