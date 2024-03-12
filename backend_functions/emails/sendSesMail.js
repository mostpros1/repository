const aws = require('aws-sdk');

const config = require('./config'); // load configurations file

aws.config.update({
    region: import.meta.env.VITE_AWS_REGION,
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
});

const ses = new aws.SES({apiVersion: '2010-12-01'});

const sendMail = (to, subject, message, from) => {
    const params = {
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: message
                },
                /* replace the Html attribute with the following if you want to send plain text emails. 
                Text: {
                    Charset: "UTF-8",
                    Data: message
                }
             */
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        ReturnPath: from ? from : config.aws.ses.from.default,
        Source: from ? from : config.aws.ses.from.default,
    };

    ses.sendEmail(params, (err, data) => {
        if (err) {
            return console.log(err, err.stack);
        } else {
            console.log("Email sent.", data);
        }
    });
};

module.exports = {sendMail};