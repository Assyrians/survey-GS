var helpers = require('./helpers.js');
var userController = require('../users/userController.js');
var branchController = require('../branches/branchController.js');
var questionController = require('../questions/questionController.js');
var formController = require('../forms/formController.js');
var reportController = require('../reports/reportController.js');

// exporting DB controller's functions
module.exports = function(app, express){
	
	app.post('/api/users/signin', userController.signin);
	app.get('/api/users/signedin', userController.checkAuth);
	app.get('/api/users/user/:id', userController.getOne);


	app.get('/api/branches' ,branchController.getAllBranches ) ;
	app.get('/api/branches/branch/:id' , branchController.getOneBranch ) ;


	app.get('/api/questions' , questionController.getAllQuestion);
	app.get('/api/questions/question/:id' , questionController.getOneQuestion);
	app.post('/api/questions' , questionController.getSetOfQuestion);


	app.get('/api/forms' , formController.getAllForms);
	app.get('/api/forms/form/:id' , formController.getOneForm);
	app.post('/api/forms' , formController.getSetOfForm);


	app.get('/api/reports' , reportController.getAllReports);
	app.get('/api/reports/report/:id' , reportController.getOneReport);
	app.post('/api/reports' , reportController.getSetOfReport);
	app.post('/api/reports/create' , reportController.newReport);
	app.get('/api/reports/branch/:id' , reportController.getAllReportsByBranchId);





	// If a request is sent somewhere other than the routes above,
	// send it through custom error handler
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
