var mongoose = require('mongoose');

var schema = mongoose.Schema;

var questionSchema = new schema({
	text : String 
});

var Question =mongoose.model('Question', questionSchema);

module.exports = Question;