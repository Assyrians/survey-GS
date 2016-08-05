var mongoose = require('mongoose');

var schema =mongoose.Schema;

var formSchema = new schema({
	type : String,
	questions : [{ type: schema.Types.ObjectId , ref : 'Question'}]
});

var Form = mongoose.model('Form' , formSchema);

module.exports = Form;

// Form test
// var newForm = new Form({
// 	type : "Day",
// 	questions : ['57a3d0b31e9bc0b8134b0215','57a3d0514fd172741bc19b68']
// })

// newForm.save(function (err , form) {
// 	console.log(form);
// })