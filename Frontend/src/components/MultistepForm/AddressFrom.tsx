import TwoWorkers from '../../assets/2personenmettools.png' 

export function AddressForm() {
  return (
    <>
      <div className="content-con">
        <img src={TwoWorkers} alt="" />
        <h2>
          Voer je postcode in om vakspecialisten in jouw omgeving te vinden
        </h2>
      </div>
      <form className="form-inputs">
        <input
          type="text"
          className="form-input first-input"
          placeholder="Postcode"
        />
        <input
          type="text"
          className="form-input second-input"
          placeholder="Stad"
        />
      </form>
    </>
  );
}
