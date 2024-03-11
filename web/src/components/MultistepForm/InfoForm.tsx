import React, { useState } from 'react';

type InfoData = {
  aanvullendeInformatie: string;
};

type InfoFormProps = InfoData & {
  updateFields: (fields: Partial<InfoData>) => void;
};

export function InfoForm({ aanvullendeInformatie, updateFields }: InfoFormProps) {
  const [isValidInput, setValidInput] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    const inputRegex = /^[a-zA-Z0-9\s]*$/;
    const isValid = inputRegex.test(inputValue);

    setValidInput(isValid);

    if (isValid) {
      updateFields({ aanvullendeInformatie: inputValue });
    }
  };

  return (
    <div className="info-con">
      <h2>Aanvullende informatie (niet verplicht)</h2>
      <div className="text-field-con">
        <h4>Deel hier a.u.b niet je contactgegevens.</h4>
        <div>
          <textarea
            className={`text-field ${isValidInput ? '' : 'invalid'}`}
            placeholder="Beschrijf je klus hier met aanvullende informatie denk aan eventuele schade, enz."
            value={aanvullendeInformatie}
            onChange={handleInputChange}
          ></textarea>
        </div>
        {!isValidInput && <p className="error-message">Voer alstublieft alleen letters en cijfers in.</p>}
      </div>
    </div>
  );
}
