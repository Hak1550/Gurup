if (process.env.PLATFORM_ENV === 'web') {
	if (process.env.NODE_ENV === 'production') {
		module.exports = require('./configureStoreWeb.prod.js')
	} else {
		module.exports = require('./configureStoreWeb.dev.js');
	}
} else {
	module.exports = require('./configureStoreNative.js');
}
