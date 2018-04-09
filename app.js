const nodemailer = require('nodemailer');



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'santosh.kp@medtrixhealthcare.com',
    pass: 'jaikrishna@1'
  }
});

var mailOptions = {
  from: 'santosh.kp@medtrixhealthcare.com',
  to: 'psantoshkumar127@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});