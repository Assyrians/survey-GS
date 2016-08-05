var Report = require ('./reportModel.js')

module.exports = {
	getAllReports : function (req , res) {
		Report.find().exec(function (err , reports) {
			if(err)
				res.status(500).send(err);
			else
				res.status(200).send(reports);
		})
	} ,

	getOneReport : function (req ,res) {
		Report.findOne({_id : req.params.id}).exec(function (err , report) {
			if(err)
				res.status(500).send(err);
			else
				res.status(200).send(report);
		})
	} ,


	getSetOfReport : function (req , res) {
		var arrayOfObjectIds=req.body.arrayOfObjectIds;
		var arrayOfReportObject=[];
		for (var i = 0; i < arrayOfObjectIds.length; i++) {
			Report.findOne({_id:arrayOfObjectIds[i]}).exec(function (err , Report) {
				arrayOfReportObject.push(Report);
				if(arrayOfReportObject.length===arrayOfObjectIds.length){
					res.status(200).send(arrayOfReportObject);
				}
			})
		}
	} , 




	/* example of req.body for newReport function
		{ 
		  "date": "Fri Aug 05 2016 03:44:14 GMT+0300 (Jordan Daylight Time)",
		  "branchManagerName": "test branchManagerName",
		  "branchControllerName": "test branchControllerName",
		  "branch": "57a3b694f6cafc7c180ee8f8",
		  "form": "57a3d8c3d7e5f948092f570f",
		  "answer":
		   [ { "question": "57a3d0514fd172741bc19b68",
		       "answer": "true",
		       "details": "test details 1",
		       "_id": "57a3e15ed064edec0d8ef047" },
		     { "question": "57a3d0b31e9bc0b8134b0215",
		       "answer": "false",
		       "details": "test details 2",
		       "_id": "57a3e15ed064edec0d8ef046" 
		         
		     } 
		    ] 
		} 
	*/


	newReport : function (req , res) {
		var date = req.body.date;
		var branchManagerName = req.body.branchManagerName;
		var branchControllerName = req.body.branchControllerName;
		var branch = req.body.branch;
		var form = req.body.form;
		var answer = req.body.answer;

		var report = new Report({
			date :date ,
			branchManagerName : branchManagerName ,
			branchControllerName : branchControllerName,
			branch : branch ,
			form : form ,
			answer : answer
		})
		console.log(report);
		report.save(function (err , report) {
			if(err)
				res.status(500).send(err)
			else
				res.status(201).send(report);
		})
	},


	getAllReportsByBranchId :function (req , res) {
		Report.find({branch : req.params.id}).exec(function (err , reports) {
			if(err)
				res.status(500).send(err);
			else
				res.status(200).send(reports);
		})
	}

}