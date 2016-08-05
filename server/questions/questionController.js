var Question = require('../questions/questionModel.js');

module.exports = {

	getAllQuestion : function ( req , res) {
		Question.find().exec(function (err , questions) {
			if(err)
				res.status(500).send(err);
			else
				res.status(200).send(questions);
		})
	},

	getOneQuestion : function (req , res) {
		Question.findOne({_id : req.params.id}).exec(function (err , question) {
			if(err)
				res.status(500).send(err);
			else
				res.status(200).send(question);
		})
	},

	getSetOfQuestion : function (req , res) {
		var arrayOfObjectIds=req.body.arrayOfObjectIds;
		var arrayOfQuestionObject=[];
		for (var i = 0; i < arrayOfObjectIds.length; i++) {
			Question.findOne({_id:arrayOfObjectIds[i]}).exec(function (err , Question) {
				arrayOfQuestionObject.push(Question);
				if(arrayOfQuestionObject.length===arrayOfObjectIds.length){
					res.status(200).send(arrayOfQuestionObject);
				}
			})
		}
	}

};