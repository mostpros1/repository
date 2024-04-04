//import { SES } from "./declarations.ts";
import aws from 'aws-sdk';

const SES = new aws.SES({
    region: import.meta.env.VITE_AWS_REGION,
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
});

const MostropsEmail = "timon@timonheidenreich.eu";

export function sendMail(email: string, subject: string, text: string, html: string) {
    const params = {
        Source: MostropsEmail,
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Subject: {
                Data: subject,
            },
            Body: {
                Text: {
                    Data: text,
                },
                Html: {
                    Data: html,
                },
            },
        },
    };

    SES.sendEmail(params, (err, data) => {
        if (err) {
            console.error('Error sending email:', err);
        } else {
            console.log('Email sent successfully:', data.MessageId);
        }
    });
}
