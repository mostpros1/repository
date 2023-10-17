import TwoWorkers from '../../assets/2personenmettools.png'

type LocationData = {
  postCode: string
  stad: string
}

type LocationFormProps = LocationData & {
  updateFields: (fields: Partial<LocationData>) => void
}

export function LocationForm({ postCode, stad, updateFields }: LocationFormProps) {
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
          required
          className="form-input first-input"
          placeholder='Postcode'
          value={postCode}
          onChange={e => updateFields({ postCode: e.target.value })}
        />
        <input
          type="text"
          required
          className="form-input second-input"
          placeholder='Stad'
          value={stad}
          onChange={e => updateFields({ stad: e.target.value })}
        />
      </form>
    </>
  )
}