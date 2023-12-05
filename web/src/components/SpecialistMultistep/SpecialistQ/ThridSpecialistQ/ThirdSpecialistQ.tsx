import "../FirstSpecialistQ/FirstSpecialistQ"

function ThirdSpecialistQ() {
  return (
    <div className="specialist_q_wrapper">
        <h2>Bedrijf-situatie</h2>
        <p>Waarom ben je als startend bedrijf op zoek naar klussen op Mostpros?</p>
        <div className="specialist_q_con">
            <div className="specialist_q">
                <label>Ik wil gaten in mijn agenda opvullen</label>
                <input type="radio" value="hello" />
            </div>
            <div className="specialist_q">
                <label>Ik wil mijn klantenbestand opbouwen</label>
                <input type="radio" value="hello" />
            </div>  
            <div className="specialist_q">
                <label>Ik wil mijn bedrijf laten groeien en opschalen om meer mensen in dienst te nemen</label>
                <input type="radio" value="hello" />
            </div>  
            <div className="specialist_q">
                <label>Ik wil een nieuwe manier om klanten te vinden uitproberen</label>
                <input type="radio" value="hello" />
            </div>         
        </div>
    </div>
  )
}

export default ThirdSpecialistQ