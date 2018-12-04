const express               = require('express');
const nodemailer            = require('nodemailer');
const cors                  = require('cors');
const app                   = express();
// app.use(cors());
var whitelist = ['http://www.mollyvyoung.com', 'http://joshedgel.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  // methods: 'GET,PUT,POST',
  // allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Content-Type, application/json, Access-Control-Request-Headers, Access-Control-Allow-Origin'
  optionsSuccessStatus: 200

}

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'mistermailbuddy@gmail.com',
    pass: 'mypasswordistaco'
  }
})

app.get('/send', cors(corsOptions), (req,res)=>{
  res.json({msg: 'This is CORS-enabled'})
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
});

app.get('/', (req,res)=>{
  res.sendfile('index.html');
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log('Dunder Mifflin, this is Pam.');
  console.log('Michael Scott, extension ' + port)
})
