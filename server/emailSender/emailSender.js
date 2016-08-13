var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport ({
  service: "hotmail",
  auth: {
        user: 'greensaloon@outlook.com',
        pass: process.env.emailPass
  }
}));
var sendEmail = function(mailOptions){
  mailOptions.from = 'حلويات الصالون الأخضر <greensaloon@outlook.com>';
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
       console.log(error);
    }else{
    console.log('Message sent: ' + info.response);
    }
  });
};

module.exports = function (req, res, next ) {
  var emailBody = 'الرجاء الضغط على الرابط التالي لمشاهدة التقرير\n\n';
  // todo: add heroku link to the report URL
  emailBody += 'https://gs-survey.herokuapp.com/#' + req.body.reportUrl;

  var mailOptions = {
            to: req.body.email,
            subject: 'تقرير جديد',
            text: emailBody
          };
          sendEmail(mailOptions);
          res.status(200).send('email sent')
};


