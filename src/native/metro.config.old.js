// console.log("metro config")
// module.exports = {
//     resolver: {
//       /* resolver options */
//     },
//     transformer: {
//       /* transformer options */
//     },
//     serializer: {
//       /* serializer options */
//     },
//     server: {
//       /* server options */
//     }
//
//     /* general options */
//   };

const path = require('path');
const installedDependencies = require("./package.json").dependencies;

const extraNodeModules = {};
const extraModulesArray = [];
Object.keys(installedDependencies).forEach(dep => {
    extraNodeModules[dep] = path.resolve(__dirname, "node_modules", dep);
    extraModulesArray.push(path.resolve(__dirname, "node_modules", dep))
});

const blacklist = require('metro-config/src/defaults/blacklist');
// const blacklist = require('metro').createBlacklist;

/*
module.exports = {
	getProjectRoots() {
		console.log("get project roots");
		return[
			path.resolve(__dirname),
			path.resolve(__dirname, '../requester'),
			path.resolve(__dirname, "../store"),
			path.resolve(__dirname, "../reducers"),
			path.resolve(__dirname, "../actions"),
			path.resolve(__dirname, "../hocs"),
            path.resolve(__dirname, "../middlewares"),
            path.resolve(__dirname, "../utils"),
        ]
	},
	extraNodeModules: extraNodeModules
};
*/



console.log("extraNodeModules ",extraModulesArray)
module.exports = {
    watchFolders:[
        ...extraModulesArray,
        path.resolve(__dirname),
        path.resolve(__dirname, '../requester'),
        path.resolve(__dirname, "../store"),
        path.resolve(__dirname, "../reducers"),
        path.resolve(__dirname, "../actions"),
        path.resolve(__dirname, "../hocs"),
        path.resolve(__dirname, "../middlewares"),
        path.resolve(__dirname, "../utils")
    ],
    resolver: {
        /* resolver options */
        blacklistRE: blacklist([
            /node_modules\/.*\/node_modules\/react-native\/.*/,
        ]),
        extraNodeModules:extraNodeModules,
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
