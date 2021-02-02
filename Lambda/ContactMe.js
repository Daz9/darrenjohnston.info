var AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});
var ses = new AWS.SES();
const axios = require('axios')



var RECEIVER = 'djohns206@caledonian.ac.uk';
var SENDER = 'djohns206@caledonian.ac.uk';

var response = {
 "isBase64Encoded": false,
 "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'example.com'},
 "statusCode": 200,
 "body": "{\"result\": \"Success.\"}"
 };

exports.handler = function (event, context) {
    console.log('Received event:', event);
    verifycaptcha(event);
};

function verifycaptcha (event) {
    var secret_key = "#################";
    var token = event.gcaptcha;
    var url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
    var promise = axios.post(url).then(function (response) {
    if (response.data.success){
        console.log("SENDING EMAIL");
        sendEmail(event, function (err, data) {
        context.done(err, null);
    });
    }
  })
}
 
function sendEmail (event, done) {
    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'name: ' + event.name + '\nphone: ' + event.phone + '\nemail: ' + event.email + '\ndesc: ' + event.desc,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Website Referral Form: ' + event.name,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    ses.sendEmail(params, done);
}