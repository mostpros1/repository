import "./disclaimer.css";
import privacylockpic from "../../assets/locked_icon_dude.svg";

function disclaimer() {
  return (
    <main id="privacy-policyMain">
      <section id="privacypolicyUpperSection">
        <h1>Disclaimer</h1>
        <img id="Privacyimage" src={privacylockpic} alt="Privacy Lock" />
      </section>

      <section id="privacypolicyLowerSection">
        <p className="privacy-text">
          Er kunnen op geen enkele wijze rechten worden ontleend aan, noch
          aanspraak gemaakt worden op de inhoud van deze website. Hoewel bij de
          sa­men­stel­ling van de inhoud van deze in­ter­netsi­te de grootst
          mogelijke zorg­vul­dig­heid wordt betracht, bestaat de mo­ge­lijk­heid
          dat bepaalde informatie (na verloop van tijd) verouderd of niet (meer)
          correct is.
        </p>

        <p>
          Mostpros is niet aan­spra­ke­lijk voor de eventuele schade die zou
          kunnen voort­vloei­en uit het gebruik van gegevens uit de door
          Mostpros gecreëerde site. Mostpros wijst hierbij alle
          aan­spra­ke­lijk­heid af voor schade ten gevolge van het gebruik van
          deze gegevens of gegevens waarnaar links op deze site(s) verwijst
          (verwijzen). De gegevens op deze site kunnen zonder waar­schu­wing
          worden gewijzigd.
        </p>
        <p>
          Mostpros geeft geen garanties met betrekking tot de aard en de inhoud
          van de informatie van de site en is niet aan­spra­ke­lijk voor de
          inhoud van deze informatie of voor de gevolgen van het gebruik
          daarvan. Iedere aan­spra­ke­lijk­heid voor eventuele schade ten
          gevolge van toegang tot en het gebruik van de site, wordt door
          Mostpros uit­druk­ke­lijk afgewezen. Tevens wordt geen garantie
          geboden voor het foutloos en on­on­der­bro­ken func­ti­o­ne­ren van de
          site. Ver­wij­zin­gen of ver­bin­din­gen naar andere sites of bronnen
          die niet eigendom zijn van Mostpros zijn slechts opgenomen ter
          informatie van de gebruiker van de site.
        </p>
        <p className="privacy-text">
          Mostpros is niet ver­ant­woor­de­lijk voor de be­schik­baar­heid van
          deze sites of bronnen. Mostpros aanvaardt geen enkele
          aan­spra­ke­lijk­heid met betrekking tot de inhoud, ad­ver­ten­ties,
          producten of andere zaken op dergelijke sites of bronnen of
          be­schik­baar­heid. Mostpros is niet aan­spra­ke­lijk voor enige vorm
          van schade of verlies ver­oor­zaakt door of in verband met het gebruik
          van of door het afgaan op de inhoud, goederen of diensten als
          aangeboden op dergelijke sites of bronnen
        </p>
        <p>
          Wanneer je een e-mail of andere berichten naar ons stuurt, is het
          mogelijk dat we die berichten bewaren. Soms vragen wij je naar jouw
          per­soon­lij­ke gegevens die voor de situatie relevant zijn. Dit maakt
          het mogelijk jouw vragen te verwerken en jouw verzoeken te
          be­ant­woor­den. De gegevens worden opgeslagen op eigen beveiligde
          servers van Mostpros of die van een derde partij. Wij zullen deze
          gegevens niet combineren met andere per­soon­lij­ke gegevens waarover
          wij beschikken.
        </p>
        <span>Copyright</span>
        <p>
          Alle rechten voor­be­hou­den. Niets uit deze website
          (informatie, beelden, images), mag worden gekopieerd dan wel
          opgeslagen in een ge­ge­vens­be­stand, in enige vorm of enige wijze,
          hetzij elek­tro­nisch, digitaal, mechanisch, handmatig,
          fo­to­gra­fisch of enige andere wijze.
        </p>
      </section>
    </main>
  );
}

export default disclaimer;
