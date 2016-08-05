var Form = require('./formModel.js');

module.exports = {
	getAllForms : function (req , res ) {
		Form.find().exec(function (err , forms) {
			if(err)
				res.status(500).send(err);
			else
				res.status(200).send(forms);
		})
	},

	getOneForm : function (req , res) {
		Form.findOne({_id : req.params.id}).exec(function (err , form) {
			if(err)
				res.status(500).send(err);
			else
				res.status(200).send(form);
		})
	},

	getSetOfForm : function (req , res) {
		var arrayOfObjectIds=req.body.arrayOfObjectIds;
		var arrayOfFormObject=[];
		for (var i = 0; i < arrayOfObjectIds.length; i++) {
			Form.findOne({_id:arrayOfObjectIds[i]}).exec(function (err , Form) {
				arrayOfFormObject.push(Form);
				if(arrayOfFormObject.length===arrayOfObjectIds.length){
					res.status(200).send(arrayOfFormObject);
				}
			})
		}
	}
}