const express               = require('express');
const nodemailer            = require('nodemailer');
const cors                  = require('cors');
const app                   = express();

const whiteList = ['http://mollyvyoung.com', 'http://joshedgell.com']
// const whiteList = 'http://mollyvyoung.com'

const corsOptions = {
  origin: whiteList,
  optionsSuccessStatus: 200
}

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'mistermailbuddy@gmail.com',
    pass: 'mypasswordistaco'
  }
})

app.get('/send', cors(corsOptions), (req,res)=>{
  // res.json({msg:"this looks like it is working"})
    var messageBody = 'This message was sent from an automatic mailer.  The message body begins below the line.\n================================\n\n' + req.query.text
    const mailOptions = {
      to: req.query.to,
      subject: req.query.subject,
      text: messageBody
    }
    res.json(mailOptions)
    // transporter.sendMail(mailOptions, function(error, response){
    //   if (error){
    //     res.json(error, 'You done messed up, A-a-ron!')
    //   } else {
    //     res.json(response, 'message sent')
    //   }
    // })
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
