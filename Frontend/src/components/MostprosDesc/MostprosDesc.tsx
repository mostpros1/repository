import './MostprosDesc.css'
import manWithHammerIcon from "../../assets/Group 783.png"
import girlWithDrill from "../../assets/Group 788.png"
import peopleWithTools from "../../assets/Group 791.png"

function MostprosDesc() {
    return (
        <>
            {/* How does Mostpros work? */}
            <div className='desc_step_con'>
                <div className="title_container">
                    <h2>Hoe werkt Mostpros?</h2>
                </div>
                <div className="description_container">
                    <div className="description">
                        <div className='desc_text'>
                            <h4>1 Beschrijf je klus</h4>
                            <p>
                                Voer in de zoekbalk je klus in, noteer je postcode en geef een beschrijving van de gewenste werkzaamheden. <strong>Let op:</strong> U dient aan het einde in te loggen om aanbod te ontvangen.
                            </p>
                        </div>
                        <div className="desc_img_con">
                            <img src={manWithHammerIcon} alt="" />
                        </div>
                    </div>
                    <div className="description">
                        <div className='desc_text'>
                            <h4>2 Krijg een vakspecialist</h4>
                            <p>
                                Ontvang reacties van vakspecialisten uit jouw omgeving of kies zelf een specialist en neem contact met hem/haar op.
                            </p>
                        </div>
                        <div className="desc_img_con">
                            <img src={girlWithDrill} alt="" />
                        </div>
                    </div>
                    <div className="description">
                        <div className='desc_text'>
                            <h4>3 Ontvang ondersteuning</h4>
                            <p>
                                De vakspecialist voert uw klus uit op de afgesproken dag.
                            </p>
                        </div>
                        <div className="desc_img_con">
                            <img src={peopleWithTools} alt="" />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MostprosDesc