var helpers = require('./helpers.js');
var userController = require('../users/userController.js');
var branchController = require('../branches/branchController.js');
var questionController = require('../questions/questionController.js');
var formController = require('../forms/formController.js');
var reportController = require('../reports/reportController.js');
var sendEmail = require('../emailSender/emailSender.js')
var generalReportController = require('../generalReport/generalReportController.js');

// exporting DB controller's functions
module.exports = function(app, express){
	
	app.post('/api/email', sendEmail)
	// routes for the user controller
	app.post('/api/users/signin', userController.signin);
	app.get('/api/users/signedin', userController.checkAuth);
	app.get('/api/users/user/:id', userController.getOne);
	app.post('/api/users', userController.addOne);
	app.put('/api/users', userController.deleteOne);

	// routes for the branch controller
	app.get('/api/branches' ,branchController.getAllBranches ) ;
	app.get('/api/branches/branch/:id' , branchController.getOneBranch ) ;

	// routes for the question controller
	app.get('/api/questions' , questionController.getAllQuestion);
	app.get('/api/questions/question/:id' , questionController.getOneQuestion);
	app.post('/api/questions' , questionController.getSetOfQuestion);

	// routes for the form controller
	app.get('/api/forms' , formController.getAllForms);
	app.get('/api/forms/form/:id' , formController.getOneForm);
	app.post('/api/forms' , formController.getSetOfForm);

	// routes for the report controller
	app.get('/api/reports' , reportController.getAllReports);
	app.get('/api/reports/report/:id' , reportController.getOneReport);
	app.post('/api/reports' , reportController.getSetOfReport);
	app.post('/api/reports/create' , reportController.newReport);
	app.get('/api/reports/branch/:id' , reportController.getAllReportsByBranchId);

	// routes for the general report controller 
	app.get('/api/general/:id' , generalReportController.getOne);
	app.post('/api/general' , generalReportController.addOne);

	// If a request is sent somewhere other than the routes above,
	// send it through custom error handler
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
