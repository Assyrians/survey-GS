var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var Schema = mongoose.Schema ;

// This is the User Table .
var userSchema = new Schema({
	username : { type : String, required: true },
	password : {type : String, required: true },
	email  : {type:  String }
});

// Setting up the user Model . 
var User = mongoose.model('User' , userSchema);

module.exports = User;

// test user
// var newUser=new User({
// 	username : "admin",
// 	password : "admin",
// 	email : "admin@gmail.com"
// });

// newUser.save(function (err,newUser) {
// 	console.log(newUser);
// })
