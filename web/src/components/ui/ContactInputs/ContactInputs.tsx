import "./ContactInputs.css";
import { sendEmail } from "./../../../../backend_functions/emailSturen.ts"; // Import the sendEmail function from your email module

function ContactInputs() {
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Capture form data
    const formData = {
      name: event.target.elements.name.value,
      lastName: event.target.elements.lastName.value,
      email: event.target.elements.email.value,
      question: event.target.elements.question.value
    };

    try {
      // Call sendEmail function
      //subject: string, to: string, text: string, html: string
      //await sendEmail("Contact Form", "teammostpros@gmail.com", `${formData.question}`, ''); // You may add HTML content here if needed

      alert("Email sent successfully!"); // Show a success message
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
      <input type="submit" className="contact_form_submit" value="Versturen"/>
    </form>
  );
}

export default ContactInputs;
