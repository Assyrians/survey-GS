var GeneralReport = require('./generalReportModel.js');

module.exports ={
	getOne : function (req ,res) {
		GeneralReport.findOne({_id : req.params.id}).exec(function (err , generalReport) {
			if(err)
				res.status(500).send(err);
			else
				res.status(200).send(generalReport);
		})
	},
	addOne : function (req , res) {
		var questions = req.body.questions;
		var avgMark = req.body.avgMark;
		var bestMark = req.body.bestMark;
		var worstMark = req.body.worstMark;
		var monthlyVisits = req.body.monthlyVisits;
		var branchName = req.body.branchName;
		var startDate = req.body.startDate;
		var endDate = req.body.endDate;

		var generalReport = new GeneralReport({
			questions :questions ,
			avgMark : avgMark ,
			worstMark : worstMark,
			bestMark : bestMark ,
			branchName : branchName,
			monthlyVisits : monthlyVisits,
			startDate : startDate,
			endDate : endDate
		})
		console.log(generalReport);
		generalReport.save(function (err , generalReport) {
			if(err)
				res.status(500).send(err)
			else
				res.status(201).send(generalReport);
		})
	}
}