import './Characteristics.css'

import one from "../../assets/1.png"
import two from "../../assets/2.png"
import three from "../../assets/3.png"
import schilder from "../../assets/schilder.png"

function Characteristics() {
    return (
        <>
            <div className="character_con">
                <div className="title_container">
                    <h2>Waarom Mostpros</h2>
                </div>
                <div className="whyMostpros_container">
                    <div className="whyMostpros_left">
                        <div className="whyMostpros">
                            <img src={one} alt="" />
                            <p>Groeiend vakspecialisten netwerk in Benelux.</p>
                        </div>
                        <div className="whyMostpros">
                            <img src={two} alt="" />
                            <p>
                                Toegang tot talentenpools met studenten en beginnende vakspecialisten.
                            </p>
                        </div>
                        <div className="whyMostpros">
                            <img src={three} alt="" />
                            <p>
                                Advies en ondersteuning. Samen met de community zijn we voortdurend op zoek naar slimmere manieren om te klussen in en om je huis.
                            </p>
                        </div>
                    </div>
                    <div className="whyMostpros_right">
                        <img src={schilder} alt="" />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Characteristics