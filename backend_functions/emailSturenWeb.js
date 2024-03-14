const express = require('express');
const cors = require('cors');
const { sendMail } = require('./emails/sendSesMail.js');

const mostprosEmail = "timon.heidenreich@icloud.com";

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { to, text, html } = req.body;
    
    try {
        
        //console.log(to);
        await sendEmail(to, text, html);
        res.send({ message: 'Email sent successfully' }, { message: to });
    } catch (error) {
        res.status(500).send({ message: 'Failed to send email', error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



async function sendEmail(to, text, html) {
    /*try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "timon.heidenreich@gmail.com",
                pass: "fpfv iywx durr yiwt ",// Make sure this is your actual password
            },
        });

        const info = await transporter.sendMail({
            from: `"info" <${mostprosEmail}>`,
            to: to,
            subject: subject,
            text: text,
            html: html,
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; // Rethrow the error to be caught by the caller
    }*/
    try {
        
        const subject = "Test Email";
        const from = mostprosEmail;
        const naar = [to];

        sendMail(naar, subject, text, html, from);
    } catch (error) {
        console.error("Error sending email:", error);
        // Handle the error here
    }
}