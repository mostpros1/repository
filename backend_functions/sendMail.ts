export async function sendMail(subject: string, email: string, text: string, html: string) {
    const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subject: subject,
            to: email,
            text: text,
            html:html,
        }),
    });
    const data = await response.json();
    console.log(data);
}