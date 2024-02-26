//import nodemailer from 'nodemailer';

const mostprosEmail: string = "timon.heidenreich@gmail.com";//"teammostpros@gmail.com";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
        user: "timon.heidenreich@gmail.com",
        pass: "fpfv iywx durr yiwt ",
    },
});

export async function sendEmail(subject: string, to: string, text: string, html: string) {
    const info = await transporter.sendMail({
        from: `"info" <${mostprosEmail}>`,
        to: to,
        subject: subject,
        text: text,
        html: html,
    });

    console.log("Message sent: %s", info.messageId);
}


// om aanteroeppen moet je dit doen:  sendEmail(alle gegevens plak je hier).catch(console.error);