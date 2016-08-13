var mongoose = require('mongoose');

var schema = mongoose.Schema;

var generalReportSchema = new schema ({
	questions : [{_id : String , text : String , numOfYes : Number , numOfNo : Number, questionNum : Number}],
	avgMark : Number,
	bestMark : Number,
	worstMark : Number,
	monthlyVisits : Number,
	branchName : String,
	startDate : Date,
	endDate : Date
});

var GeneralReport = mongoose.model('GeneralReport', generalReportSchema);

module.exports = GeneralReport;


