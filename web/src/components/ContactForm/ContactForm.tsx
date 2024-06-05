import "./ContactForm.css";
import ContactInputs from "../ui/ContactInputs/ContactInputs";

function ContactForm() {
  return (
    <div className="contact">
      <div className="contact_con">
        <div className="contact_left">
          <div className="contact_address_info">
            <h2>Office</h2>
            <div className="contact_address">
              <p>2013 AS, Haarlem</p>
              <p>Kinderhuissingel 6-K</p>
            </div>
          </div>
        </div>
        <div className="contact_right">
          <h2 className="contact_righth2">Heb je vragen neem contact met ons op!</h2>         
          <ContactInputs />
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
