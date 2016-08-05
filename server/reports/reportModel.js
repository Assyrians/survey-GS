var mongoose = require('mongoose');

var schema = mongoose.Schema;

var reportSchema = new schema({
	date : Date,
	type: String,
	branchManagerName : String,
	branchControllerName : String,
	branch : {type: schema.Types.ObjectId, ref : 'Branch'},
	form : {type :schema.Types.ObjectId, ref : 'Form'},
	answer : [{ question : {type : schema.Types.ObjectId, ref : 'Question'} ,answer : String , details : String}]
});

var Report = mongoose.model('Report' , reportSchema);

module.exports = Report;

// Test Report

// var newReport = new Report({
// 	date : new Date(),
// 	branchManagerName : "test branchManagerName",
// 	branchControllerName : "test branchControllerName",
// 	branch : '57a3b694f6cafc7c180ee8f8',
// 	form : '57a3d8c3d7e5f948092f570f',
// 	answer : [
// 		{question : '57a3d0514fd172741bc19b68' , answer : true , details : "test details 1"},
// 		{question : '57a3d0b31e9bc0b8134b0215' , answer : false , details : "test details 2"}
// 	]
// });

// newReport.save(function (err , newReport) {
// 	console.log(newReport);
// })


