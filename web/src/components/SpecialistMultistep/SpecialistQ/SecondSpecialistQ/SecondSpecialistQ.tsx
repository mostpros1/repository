import "../FirstSpecialistQ/FirstSpecialistQ"

function SecondSpecialistQ() {
  return (
    <div className="specialist_q_wrapper">
        <h2>Bedrijf-situatie</h2>
        <p>Wat is uw huidige professionele situatie?</p>
        <div className="specialist_q_con">
            <div className="specialist_q">
                <label>Ik heb mijn bedrijf ingeschreven en wacht op mijn KVK-nummer</label>
                <input type="radio" value="hello" />
            </div>
            <div className="specialist_q">
                <label>Mijn bedrijf bestaat minder dan 3 maanden</label>
                <input type="radio" value="hello" />
            </div>  
            <div className="specialist_q">
                <label>Mijn bedrijf bestaat 3 maanden tot 1 jaar</label>
                <input type="radio" value="hello" />
            </div>  
            <div className="specialist_q">
                <label>Mijn bedrijf bestaat al langer dan 1 jaar</label>
                <input type="radio" value="hello" />
            </div>  
            <div className="specialist_q">
                <label>Ik heb geen bedrijf</label>
                <input type="radio" value="hello" />
            </div>            
        </div>
    </div>
  )
}

export default SecondSpecialistQ