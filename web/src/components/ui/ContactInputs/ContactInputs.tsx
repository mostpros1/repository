import "./ContactInputs.css";

function ContactInputs() {
  return (
    <form method="Post" className="contact_form" action="http://localhost:3000/send-email">
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
      <textarea className="contact_question" name="html" placeholder="Wat is uw vraag?"></textarea>
      <input type="submit" className="contact_form_submit" value="Versturen"/>
    </form>
  );
}




export default ContactInputs;
