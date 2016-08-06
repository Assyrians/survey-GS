var mongoose = require('mongoose');

var schema =mongoose.Schema;

var formSchema = new schema({
	type : String,
	questions : [{ type: schema.Types.ObjectId , ref : 'Question'}]
});

var Form = mongoose.model('Form' , formSchema);

module.exports = Form;