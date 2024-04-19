import React, { useState } from "react";
import "./HomeOwnerDeactivation.css"; // Make sure to create a corresponding CSS file

function HomeOwnerDeactivation() {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleDeleteAccount = () => {
    if (isConfirmed) {
      // Here you would put the logic to handle the account deletion
      console.log("Account will be deleted.");
    }
  };

  return (
    <div>
      <div className="header-con">
        <h2>Account verwijderen</h2>
      </div>
      <div className="account-deletion">
        <p>
          Als u uw account verwijdert heeft u geen toegang meer tot onze
          gegevens, wij verwijderen al uw persoonlijke data.
        </p>
        <div className="confirmation-checkbox">
          <input
            id="delete-confirm"
            type="checkbox"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
          />
          <label htmlFor="delete-confirm">
            Bevestig dat u uw account wilt verwijderen.
          </label>
        </div>
        <button
          className="delete-account-button"
          onClick={handleDeleteAccount}
          disabled={!isConfirmed}
        >
          Account verwijderen
        </button>
      </div>
    </div>
  );
}

export default HomeOwnerDeactivation;
