import "../FirstSpecialistQ/FirstSpecialistQ"

function FourthSpecialistQ() {
  return (
    <div className="specialist_q_wrapper">
        <h2>Bedrijf-situatie</h2>
        <p>Hoeveel personen zijn er werkzaam in jouw bedrijf</p>
        <div className="specialist_q_con">
            <div className="specialist_q">
                <label>Ik ben zelfstandig ondernemer, zonder medewerkers</label>
                <input type="radio" value="hello" />
            </div>
            <div className="specialist_q">
                <label>1 medewerker</label>
                <input type="radio" value="hello" />
            </div>  
            <div className="specialist_q">
                <label>2 tot 10 medewerkers</label>
                <input type="radio" value="hello" />
            </div>  
            <div className="specialist_q">
                <label>Meer dan 10 medewerkers</label>
                <input type="radio" value="hello" />
            </div>         
        </div>
    </div>
  )
}

export default FourthSpecialistQ