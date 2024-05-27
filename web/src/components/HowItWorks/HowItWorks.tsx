import "./HowItWorks.css"
import HomeButton from "../ui/HomeButton/HomeButton"
import MostprosDesc from "../MostprosDesc/MostprosDesc"

function HowItWorks() {
  return (
    <div className="HowItsWorks">
      <section className="howItWorksSectionHome">
        <article className="howItWorksTitleContainerHome">
          <h2 className="howItWorksTitleHome">Hoe werkt het als Huiseigenaar?</h2>
        </article>
        <section className="howItworksContainerCards">
          <article className="howItWorksCardHome">
            <h5 className="howitworkscardhomeH5">Beschrijf je klus</h5>
            <p className="howitworkscardhomeP">
              Voer in de zoekbalk je klus in en geef een beschrijving van de
              gewenste werkzaamheden.
            </p>
          </article>
          <article className="howItWorksCardHome">
            <h5 className="howitworkscardhomeH5">Vind & huur vakmannen</h5>
            <p className="howitworkscardhomeP">
              Ontvang reacties van vakmannen. Chat rechtstreeks. Bespreek
              details, kosten en de tijdlijn. Vergelijk offertes en huur met
              vertrouwen.
            </p>
          </article>
          <article className="howItWorksCardHome">
            <h5 className="howitworkscardhomeH5">Beheer & betaal vakmannen</h5>
            <p className="howitworkscardhomeP">
              Beheer en betaal veilig de ingehuurde vakman, nadat het gewenste
              resultaat is geleverd.
            </p>
          </article>
        </section>
        <section className="howItWorksSectionHome">
        <article className="howItWorksTitleContainerHome">
          <h2 className="howItWorksTitleHome">Hoe werkt het als Vakspecialist?</h2>
        </article>
        <section className="howItworksContainerCards">
          <article className="howItWorksCardHome">
            <h5 className="howitworkscardhomeH5">Ontvang opdrachten</h5>
            <p className="howitworkscardhomeP">
              Ontvang opdrachten binnen je beschikbaarhed en werkgebied.
            </p>
          </article>
          <article className="howItWorksCardHome">
            <h5 className="howitworkscardhomeH5">Kom in contact</h5>
            <p className="howitworkscardhomeP">
              Kom eenvoudig in contact met huiseigenaren die klussen hebben.
            </p>
          </article>
          <article className="howItWorksCardHome">
            <h5 className="howitworkscardhomeH5">Plan een afspraak</h5>
            <p className="howitworkscardhomeP">
              Plan een afspraak op een tijd die voor jullie beiden goed uitkomt.
            </p>
          </article>
        </section>
      </section>
      </section>
    </div>
  )
}

export default HowItWorks