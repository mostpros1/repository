import "./ContactInputs.css";
import { sendMail } from "./../../../../../backend_functions/sendMail.ts"; // Import the sendEmail function from your email module


function ContactInputs() {

  async function triggerEmailSending(name, lastName, email, question) {
    
        const subject: string = 'Contact Formulier Mostpros';
        const email: string = 'timon.heidenreich@gmail.com';
        const text: string = "naam: " + name + ", " + "achternaam: " + lastName + ", " + "email: " + email + ", " + "vraag: " + question;
        const html: string = "<i>" + "naam: " + name + ", " + "achternaam: " + lastName + ", " + "email: " + email + ", " + "vraag: " + question + "</i>";
    
    sendMail(subject, email, text, html);

    const data = await response.json();
    console.log(data);
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Capture form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const question = formData.get('question'); // Log form data to the console
    try {
      // Call sendEmail function
      //subject: string, to: string, text: string, html: string


      triggerEmailSending(name, lastName, email, question);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again later."); // Show an error message
    }
  };

  return (
    <form className="contact_form" onSubmit={handleSubmit}>
      <div className="contact_input">
        <label>Naam</label>
        <input type="text" name="name" />
      </div>
      <div className="contact_input">
        <label>Achternaam</label>
        <input type="text" name="lastName" />
      </div>
      <div className="contact_input">
        <label>Email</label>
        <input type="text" name="email" />
      </div>
      <textarea className="contact_question" placeholder="Wat is uw vraag?" name="question"></textarea>
      <input type="submit" className="contact_form_submit" value="Versturen" />
    </form>
  );
}

export default ContactInputs;
