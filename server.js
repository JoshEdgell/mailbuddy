const express               = require('express');
const nodemailer            = require('nodemailer');
const app                   = express();

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'mistermailbuddy@gmail.com',
    pass: 'mypasswordistaco'
  }
})

app.get('/send', (req,res)=>{
  console.log(req.query);
  var messageBody = 'This message was sent from an automatic mailer.  The message body begins below the line.\n================================\n\n' + req.query.text
  const mailOptions = {
    to: req.query.to,
    subject: req.query.subject,
    text: messageBody
  }
  smtpTransport.sendMail(mailOptions, function(error,response){
    if (error){
      console.log(error);
    } else {
      console.log(response);
      res.send('sent');
    }
  })
})

const port = 3000;

app.listen(port, ()=>{
  console.log('Dunder Mifflin, this is Pam.');
  console.log('Michael Scott, extension ' + port)
})
