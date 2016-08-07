var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport ({
  service: "hotmail",
  auth: {
        user: 'volunteerhub@outlook.com', //tochange
        pass: 'P@SSW0RD_ADMIN'//tochange
  }
}));
var sendEmail = function(mailOptions){
  mailOptions.from = 'VolunteerHub <volunteerhubco@gmail.com>';//tochange
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
       console.log(error);
    }else{
    console.log('Message sent: ' + info.response);
    }
  });
};

module.exports = function (req, res, next ) {
  var emailBody = 'الرجاء الضغط على الرابط التالي لمشاهدة التقرير' + '\n\n';
  // todo: add heroku link to the report URL
  emailBody += 'http://192.168.1.142:3000/#' + req.body.reportUrl;

  var mailOptions = {
            to: req.body.email,
            subject: 'New Report',
            text: emailBody
          };
          sendEmail(mailOptions);
          res.status(200).send('email sent')
};


