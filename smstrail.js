
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
// var client = require('twilio')(process.env.AC5e289c8926743ec2f28fc3b41fd5d01b, process.env.TWILIO_TOKEN);
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({ 
         body: 'Help.....................!! Urgent need of blood with your matching blood group . Please donate some blood you are getting chance to save life',  
         messagingServiceSid: 'MGa6a2aba55a2b53e61274df047248bfc5',      
         to: '+919075341267' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();