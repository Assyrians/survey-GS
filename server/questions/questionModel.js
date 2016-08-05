var mongoose = require('mongoose');

var schema = mongoose.Schema;

var questionSchema = new schema({
	text : String 
});

var Question =mongoose.model('Question', questionSchema);

module.exports = Question;

// Test Question
// var testQuestion =new Question({
// 	text : "it test Question number 2"
// });

// testQuestion.save(function (err , newQuestion) {
// 	console.log(newQuestion);
// })

