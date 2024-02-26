import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./ContactInputs.css";

function ContactInputs() {
  const form = useRef<HTMLFormElement>(null); // Specificeer het type van de ref

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs.sendForm(
        "service_3qsys7i",
        "template_geg6mjp",
        form.current,
        "86f-HlB8D8HziMVps"
      ).then(
        (result) => {
          console.log(result.text);
          alert("Bericht succesvol verzonden!");
        },
        (error) => {
          console.log(error.text);
          alert("Fout bij het verzenden van het bericht. Probeer het later opnieuw.");
        }
      );
    }
  };

  return (
    <form ref={form} className="contact_form" onSubmit={sendEmail}>
      <div className="contact_input">
        <label>Naam</label>
        <input type="text" name="user_name" />
      </div>
      <div className="contact_input">
        <label>Achternaam</label>
        <input type="text" name="user_lastname" />
      </div>
      <div className="contact_input">
        <label>Email</label>
        <input type="email" name="user_email" />
      </div>
      <textarea className="contact_question" placeholder="Wat is uw vraag?" name="message"></textarea>
      <input type="submit" className="contact_form_submit" value="Versturen"/>
    </form>
  );
}

export default ContactInputs;
