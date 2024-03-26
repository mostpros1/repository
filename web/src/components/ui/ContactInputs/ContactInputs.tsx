import "./ContactInputs.css";
import { sendMail } from "./../../../../../backend_functions/email.ts";


function ContactInputs() {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Access form data
    const formData = new FormData(event.target);
    const firstname = formData.get('firstname');
    const lastname = formData.get('lastname');
    const email = formData.get('to');
    const subject = formData.get('subject');
    const question = formData.get('question');

    // Now you can use these variables as needed (e.g., send them to your server)
    console.log('First Name:', firstname);
    console.log('Last Name:', lastname);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Question:', question);

    sendMail(String(email), String(subject), String(question), "<p>"+ String(question) + "</p>");
  };
  return (
    <form method="Post" className="contact_form" onSubmit={handleSubmit}>
      <div className="contact_input">
        <label>Naam</label>
        <input name="firstname" type="text" />
      </div>
      <div className="contact_input">
        <label>Achternaam</label>
        <input name="lastname" type="text" />
      </div>
      <div className="contact_input">
        <label>Email</label>
        <input name="to" type="text" />
      </div>
      <div className="contact_input">
        <label>Onderwerp</label>
        <input name="subject" type="text" />
      </div>
      <textarea className="contact_question" name="question" placeholder="Wat is uw vraag?"></textarea>
      <input type="submit" className="contact_form_submit" value="Versturen"/>
    </form>
  );
}




export default ContactInputs;
