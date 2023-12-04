import './MostprosDesc.css'
import manWithHammerIcon from "../../assets/manmethammer.png"
import girlWithDrill from "../../assets/vrouwmetboor.png"
import peopleWithTools from "../../assets/2personenmettools.png"

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
                                Denk aan klussen voor je uitbouw, renovatie, tegels, dak, keuken,
                                ramen, deuren, badkamer, sanitair, stuken, verwarming,
                                loodgieterswerk, elektriciteit, stofferen, slopen, afvoeren,
                                isolatie, timmerwerken, algemene klussen, schoonmaak, enz.
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
                                Krijg een aannemer, gevelspecialist, metselaar, ontwerper,
                                tegelzetter, dakdekker, keukenmonteur, glaszetter,
                                kozijnspecialist, badkamerspecialist, stukadoor, installateur,
                                loodgieter, elektricien enz.
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
                                Naast de standaard ondersteuning van de vakspecialist zijn we bij
                                Mostpros.com ook constant opzoek naar slimmere manieren om
                                iedereen in het netwerk te ondersteunen met groeien.
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