const express               = require('express');
const nodemailer            = require('nodemailer');
const cors                  = require('cors');
const app                   = express();


app.options('*',cors());
const whiteList = [
  'http://joshedgell.com',
  'http://mollyvyoung.com'
]
const corsOptions = {
  // origin: function(origin, callback){
  //   if (whiteList.indexOf(origin) !== -1) {
  //     callback(null, true)
  //   } else {
  //     callback(new Error('Not allowed by CORS'))
  //   }
  // }
  // origin: whiteList,
  origin: true,
  methods: 'GET',
  allowedHeaders: 'Access-Control-Allow-Origin', 'Origin',
  headers: {
    'Access-Control-Allow-Origin' : whiteList
  },
  preflightContinue: true
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'mistermailbuddy@gmail.com',
    pass: 'mypasswordistaco'
  }
});

app.get('/send', cors(corsOptions), (req,res)=>{
  res.json({msg: 'This is CORS-enabled'})



  var messageBody = 'This message was sent from an automatic mailer.  The message body begins below the line.\n================================\n\n' + req.query.text
  const mailOptions = {
    to: req.query.to,
    subject: req.query.subject,
    text: messageBody
  }
  transporter.sendMail(mailOptions, function(error,response){
    if (error){
      res.json(error, 'error from transporter.sendMail')
    } else {
      res.json(response);
    }
  })
});

app.get('/', (req,res)=>{
  res.sendfile('index.html');
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log('Dunder Mifflin, this is Pam.');
  console.log('Michael Scott, extension ' + port)
})
