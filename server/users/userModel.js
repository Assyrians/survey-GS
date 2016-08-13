var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var Schema = mongoose.Schema ;

// This is the User Table .
var userSchema = new Schema({
	username : { type : String, required: true , unique: true},
	password : {type : String, required: true },
	email  : {type:  String }
});

// Setting up the user Model . 
var User = mongoose.model('User' , userSchema);

module.exports = User;