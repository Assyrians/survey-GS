var mongoose = require('mongoose');

var Schema = mongoose.Schema ;

// This is the Branch Table .
var branchSchema = new Schema({
	branchName : { type : String , required: true }
});

// Setting up the Branch Model . 
var Branch = mongoose.model('Branch' , branchSchema);

module.exports = Branch;