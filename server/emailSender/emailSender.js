var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport ({
  service: "hotmail",
  auth: {
        user: 'volunteerhub@outlook.com',
        pass: 'P@SSW0RD_ADMIN'
  }
}));
var sendEmail = function(mailOptions){
  mailOptions.from = 'VolunteerHub <volunteerhubco@gmail.com>';
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
       console.log(error);
    }else{
    console.log('Message sent: ' + info.response);
    }
  });
};

module.exports = function (req, res, next) {
  var mailOptions = {
            to: req.body.email,
            subject: 'New Report',
            html: req.body.emailBody
          };
          sendEmail(mailOptions);
          res.status(200).send('email sent')
};


