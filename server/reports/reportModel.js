var mongoose = require('mongoose');

var schema = mongoose.Schema;

var reportSchema = new schema({
	date : Date,
	branchManagerName : String,
	branchControllerName : String,
	branch : {type: schema.Types.ObjectId, ref : 'Branch'},
	form : {type :schema.Types.ObjectId, ref : 'Form'},
	answer : [{ question : {type : schema.Types.ObjectId, ref : 'Question'} ,answer : String , details : String}]
});

var Report = mongoose.model('Report' , reportSchema);

module.exports = Report;