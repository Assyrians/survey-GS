var User = require('./userModel.js');
var jwt = require('jwt-simple');

module.exports = {

	

  getOne : function(req,res){
    User.findOne({_id: req.params.id})
        .exec(function(err, user){
          console.log( req.params.id);
          if(user){
             //res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(user);
          }
        })
  },



  signin: function (req, res) {
    var username=req.body.username;
    var password = req.body.password;

    User.findOne({username: username , password : password})
      .exec(function (error, user) {
        if(error){
          res.status(500).send(error);
        } else if (!user) {
          console.log('error');
          res.status(500).send(new Error('User does not exist'));
        } else {
			console.log("write user");
			var token = jwt.encode(user, 'secret');
			res.setHeader('x-access-token',token);
			var data={
			token: token,
			username: username
			}
			res.json(data);
        }
      });
  },



  checkAuth: function (req, res) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      res.status(500).send(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      User.findOne({username: user.username})
        .exec(function (error, foundUser) {
          if(error){
            res.status(500).send(error);
          } else if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        });
    }
  }

  

};




