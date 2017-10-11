'use strict';
var nodemailer = require('nodemailer');
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'panospost1@gmail.com',
        pass: 'posmelene'
    }
};
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);
/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  res.render('modules/core/server/views/index', {
    user: req.user || null
  });
};
/**
 * send mail to panospost1@gmail.com
 */
exports.sendMail=function(req,res){

	var mailOptions = {
			from: req.body.contactName+'" 👥"'+req.body.email, // sender address
			to: 'panospost1@gmail.com', // list of receivers
			subject: 'Μήνυμα από τον χρήστη '+req.body.contactName, // Subject line
			text: req.body.contactMsg+' 🐴', // plaintext body
			html: '<b>'+req.body.contactMsg +'🐴</b>' // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				return console.log(error);
			}
			console.log('Message sent: ' + info.response);
		});
		res.json(req.body);
};
/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
