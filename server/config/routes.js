var helpers = require('./helpers.js');

// exporting DB controller's functions
module.exports = function(app, express){

	// If a request is sent somewhere other than the routes above,
	// send it through custom error handler
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};