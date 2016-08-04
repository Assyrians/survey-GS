var helpers = require('./helpers.js');
var userController = require('../users/userController.js');

// exporting DB controller's functions
module.exports = function(app, express){
	
	app.post('/api/users/signin', userController.signin);
	app.get('/api/users/signedin', userController.checkAuth);
	app.get('/api/users/user/:id', userController.getOne);

	// If a request is sent somewhere other than the routes above,
	// send it through custom error handler
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
