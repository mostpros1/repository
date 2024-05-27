import './MostprosDesc.css'
import manWithHammerIcon from "../../assets/Group 595.png"
import girlWithDrill from "../../assets/Group 787.png"
import peopleWithTools from "../../assets/Group 1098.png"

function MostprosDesc() {
    return (
        <>
            {/* How does Mostpros work? */}
            <div className='desc_step_con'>
                <div className="title_container">
                    <h2 className="howItWorksTitleMostProsDesc">Hoe werkt het als Huiseigenaar?</h2>
                </div>
                <div className="description_container">
                    <div className="description">
                        <div className='desc_text'>
                            <h4>1 Beschrijf je klus</h4>
                            <p>
                                Voer in de zoekbalk je klus in, noteer je postcode en geef een beschrijving van de gewenste werkzaamheden. 
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
                                Ontvang reacties van vakspecialisten uit jouw omgeving. Kies zelf een specialist en neem contact op.
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