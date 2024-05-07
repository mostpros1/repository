import './Characteristics.css'

import one from "../../assets/1.png"
import two from "../../assets/2.png"
import three from "../../assets/3.png"
import schilder from "../../assets/schilder.png"

function Characteristics() {
    return (
        <>
            <article className="character_con">
                <section className="title_container">
                    <h2>Waarom kiezen voor Mostpros?</h2>
                </section>
                <section className="whyMostpros_container">
                    <section className="whyMostpros_left">
                        <article className="whyMostpros">
                            <img src={one} alt="" />
                            <p>Groeiend vakspecialisten netwerk in Benelux.</p>
                        </article>
                        <article className="whyMostpros">
                            <img src={two} alt="" />
                            <p>
                                Toegang tot talentenpools met studenten en beginnende vakspecialisten.
                            </p>
                        </article>
                        <article className="whyMostpros">
                            <img src={three} alt="" />
                            <p>
                                Advies en ondersteuning. Samen met de community zijn we voortdurend op zoek naar slimmere manieren om te klussen in en om je huis.
                            </p>
                        </article>
                    </section>
                    <section className="whyMostpros_right">
                        <img src={schilder} alt="" />
                    </section>
                </section>
            </article>

        </>
    )
}

export default Characteristics