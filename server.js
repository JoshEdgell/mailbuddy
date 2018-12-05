const express               = require('express');
const nodemailer            = require('nodemailer');
const cors                  = require('cors');
const dotenv                = require('dotenv').config();
const app                   = express();

// const whiteList = process.env.WHITELIST
// const whiteList = 'http://mollyvyoung.com'

const corsOptions = {
  origin: ['http://mollyvyoung.com', 'http://joshedgell.com'],
  optionsSuccessStatus: 200
}

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USERNAME,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    pass: process.env.USERPASS
  }
})

app.get('/send', cors(corsOptions), (req,res)=>{
  // res.json({msg:"this looks like it is working"})
    const messageBody = 'This message was sent from an automatic mailer.  The message body begins below the line.\n================================\n\n' + req.query.text
    const mailOptions = {
      to: req.query.to,
      subject: req.query.subject,
      text: messageBody
      // In the future, this can be improved by sending an html key that is a string of HTML and all that shit for a much better-looking message.
    };
    // res.json(mailOptions) //This worked




    // Checking transporter.verify above here
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.json(error)
        } else {
          res.json(info)
        }
    });
})

// app.get('/send', (req,res)=>{
//   var messageBody = 'This message was sent from an automatic mailer.  The message body begins below the line.\n================================\n\n' + req.query.text
//   const mailOptions = {
//     to: req.query.to,
//     subject: req.query.subject,
//     text: messageBody
//   }
//   transporter.sendMail(mailOptions, function(error,response){
//     if (error){
//       res.json(error, 'error from transporter.sendMail')
//     } else {
//       res.json(response);
//     }
//   })
// });

app.get('/', (req,res)=>{
  res.sendfile('index.html');
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log('Dunder Mifflin, this is Pam.');
  console.log('Michael Scott, extension ' + port)
})
