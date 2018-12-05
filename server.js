const express               = require('express');
const nodemailer            = require('nodemailer');
const cors                  = require('cors');
const app                   = express();


app.get('/send', cors(), (req,res)=>{
  res.json({
    msg: 'This is CORS-enabled for all origins'
  })
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
