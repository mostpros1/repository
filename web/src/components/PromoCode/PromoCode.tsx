import React, { useState } from 'react';
import './PromoCode.css';

const PromoCodePage = () => {
  const [promoCode, setPromoCode] = useState('');
  const [message, setMessage] = useState('');

  const handleApplyPromoCode = () => {
    // Hier kun je de logica toevoegen om de promotiecode te valideren.
    // Voor dit voorbeeld zullen we gewoon een bericht weergeven.
    if (promoCode === 'DISCOUNT2024') {
      setMessage('De promotiecode is succesvol toegepast!');
    } else {
      setMessage('Ongeldige promotiecode. Probeer het opnieuw.');
    }
  };

  return (
    <div className="promo-code-page">
      <h1>Voer je promotiecode in</h1>
      <div className="promo-code-form">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Promotiecode"
        />
        <button onClick={handleApplyPromoCode}>Toepassen</button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PromoCodePage;
