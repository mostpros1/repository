import { useState } from "react";
import "./termsandconditions.css";
import react from "react";

const TermsAndConditionsText = () => {
  const [currentText, setCurrentText] = useState(0);

  const switchText = () => {
    setCurrentText((prevText) => (prevText === 0 ? 1 : 0));
  };

  return (
    <>
      <section id="btn-container">
        <button id="switchText" onClick={switchText}>
          Huis Eigenaar
        </button>
        <button id="switchText" onClick={switchText}>
          Vakspecialist
        </button>
      </section>
      {currentText === 0 && (
        <div>
          <h3 id="terms-title">
            Algemene Voorwaarden voor Opdrachtgevers bij Mostpros
          </h3>
          <p id="terms-topText">
            Versie: 1.0 Laatst aangepaste datum: 28 - 08 - 2023
          </p>
          <h3>Artikel 1: Definities</h3>
          <p>
            1.1 In deze algemene voorwaarden worden de volgende termen gebruikt:
          </p>
          <h3>Artikel 2: Toepasselijkheid</h3>
          <p>
            2.1 Deze algemene voorwaarden zijn van toepassing op alle
            aanbiedingen, overeenkomsten en leveringen van diensten door en via
            Mostpros, tenzij schriftelijk anders is overeengekomen.
          </p>
          <p>
            2.2 Door gebruik te maken van het platform van Mostpros, accepteert
            de Opdrachtgever deze algemene voorwaarden.{" "}
          </p>
          <h3>Artikel 3: Registratie en Account</h3>
          <p>
            3.1 Om gebruik te maken van het platform, dient de Opdrachtgever
            zich te registreren en een account aan te maken.
          </p>
          <p>
            3.2 De Opdrachtgever is verantwoordelijk voor het vertrouwelijk
            houden van zijn inloggegevens en voor alle activiteiten die via het
            account plaatsvinden.
          </p>
          <p>
            3.3 Mostpros behoudt zich het recht voor om accounts die in strijd
            handelen met deze algemene voorwaarden te verwijderen of te
            blokkeren.
          </p>
          <h3>Artikel 4: Plaatsing en Aanneming van Opdrachten</h3>
          <p>
            4.1 Opdrachtgevers kunnen via het platform opdrachten plaatsen met
            een duidelijke omschrijving van de werkzaamheden.
          </p>
          <p>
            4.2 De Opdrachtgever dient de opdracht zo volledig en nauwkeurig
            mogelijk te beschrijven om misverstanden te voorkomen.
          </p>
          <p>
            4.3 Mostpros behoudt zich het recht voor om opdrachten die in strijd
            zijn met de huisregels of die onjuiste informatie bevatten, te
            verwijderen.
          </p>
          <h3>Artikel 5: Uitvoering van Opdrachten</h3>
          <p>
            5.1 Vakmannen kunnen reageren op geplaatste opdrachten en offertes
            uitbrengen.
          </p>
          <p>
            5.2 De Opdrachtgever is verantwoordelijk voor het selecteren van een
            geschikte Vakman op basis van de ontvangen offertes en
            beoordelingen.
          </p>
          <p>
            5.3 Een overeenkomst komt tot stand wanneer de Opdrachtgever een
            offerte van een Vakman accepteert via het platform.
          </p>
          <h3>Artikel 6: Betalingen en Facturatie</h3>
          <p>
            6.1 Betalingen voor uitgevoerde opdrachten geschieden via de door
            Mostpros aangeboden betalingsmethoden.
          </p>
          <p>
            6.2 Mostpros kan transactiekosten in rekening brengen, welke vooraf
            duidelijk worden gecommuniceerd.
          </p>
          <p>
            6.3 De Opdrachtgever dient de betaling te voldoen na voltooiing van
            de opdracht en goedkeuring van de uitgevoerde werkzaamheden.
          </p>
          <h3>Artikel 7: Annuleringen en Wijzigingen</h3>
          <p>
            7.1 De Opdrachtgever kan een geplaatste opdracht annuleren zolang
            deze nog niet door een Vakman is geaccepteerd.
          </p>
          <p>
            7.2 Wijzigingen aan een opdracht kunnen in overleg tussen
            Opdrachtgever en Vakman worden aangebracht via het platform.
          </p>
          <p>
            7.3 Annuleringen van een reeds geaccepteerde opdracht kunnen
            onderhevig zijn aan annuleringskosten, afhankelijk van de voortgang
            van de werkzaamheden.
          </p>
          <h3>Artikel 8: Aansprakelijkheid</h3>
          <p>
            8.1 Mostpros is niet aansprakelijk voor schade voortvloeiend uit
            overeenkomsten tussen Opdrachtgevers en Vakmannen.
          </p>
          <p>
            8.2 De Opdrachtgever is verantwoordelijk voor het verstrekken van
            juiste en volledige informatie over de opdracht.
          </p>
          <p>
            8.3 De Opdrachtgever is verantwoordelijk voor een tijdige en
            correcte betaling van de overeengekomen vergoeding aan de Vakman.
          </p>
          <h3>Artikel 9: Reviews en Feedback</h3>
          <p>
            9.1 Opdrachtgevers kunnen na voltooiing van een opdracht reviews en
            feedback geven over de Vakman.
          </p>
          <p>
            9.2 Mostpros behoudt zich het recht voor om reviews die in strijd
            zijn met de huisregels of onjuiste informatie bevatten, te
            verwijderen.
          </p>
          <h3>Artikel 10: Verzekering en Licenties</h3>
          <p>
            10.1 Mostpros respecteert de privacy van alle gebruikers en handelt
            conform de Algemene Verordening Gegevensbescherming (AVG).
          </p>
          <p>
            10.2 Persoonlijke gegevens van gebruikers worden uitsluitend
            gebruikt voor de dienstverlening van Mostpros en worden niet gedeeld
            met derden zonder toestemming van de gebruiker.
          </p>
          <h3>Artikel 11: Privacy en Gegevensbescherming</h3>
          <p>
            11.1 Mostpros behoudt zich het recht voor om deze algemene
            voorwaarden te wijzigen.
          </p>
          <p>
            11.2 Wijzigingen treden in werking op het moment dat deze op het
            platform zijn gepubliceerd.
          </p>
          <p>
            11.3 Indien de gebruiker niet akkoord gaat met de gewijzigde
            voorwaarden, kan hij zijn account beëindigen.
          </p>
          <h3>Artikel 12: Wijzigingen van de Algemene Voorwaarden</h3>
          <p>
            12.1 Op alle rechtsbetrekkingen waarbij Mostpros partij is, is
            uitsluitend het Nederlands recht van toepassing.
          </p>
          <p>
            12.2 Geschillen tussen Mostpros en de gebruiker zullen in eerste
            instantie worden voorgelegd aan de bevoegde rechter in het
            arrondissement waar Mostpros is gevestigd.
          </p>
          <p>
            Voor verdere vragen of opmerkingen over deze algemene voorwaarden
            kunt u contact opnemen met Mostpros via [contactgegevens].
          </p>
        </div>
      )}
      {currentText === 1 && (
        <div>
          <h3 id="terms-title">
            Algemene Voorwaarden voor Vakmannen bij Mostpros
          </h3>
          <p id="terms-topText">
            Versie: 1.0 Laatst aangepaste datum: 28 - 08 - 2023
          </p>
          <h3>Artikel 1: Definities</h3>
          <p>
            1.1 In deze algemene voorwaarden worden de volgende termen gebruikt:
          </p>
          <h3>Artikel 2: Toepasselijkheid</h3>
          <p>
            2.1 Deze algemene voorwaarden zijn van toepassing op alle
            aanbiedingen, overeenkomsten en leveringen van diensten door en via
            Mostpros, tenzij schriftelijk anders is overeengekomen.
          </p>
          <p>
            2.2 Door gebruik te maken van het platform van Mostpros, accepteert
            de Vakman deze algemene voorwaarden.
          </p>
          <h3>Artikel 3: Registratie en Account</h3>
          <p>
            3.1 Om gebruik te maken van het platform, dient de Vakman zich te
            registreren en een account aan te maken.
          </p>
          <p>
            3.2 De Vakman is verantwoordelijk voor het vertrouwelijk houden van
            zijn inloggegevens en voor alle activiteiten die via het account
            plaatsvinden.
          </p>
          <p>
            3.3 Mostpros behoudt zich het recht voor om accounts die in strijd
            handelen met deze algemene voorwaarden te verwijderen of te
            blokkeren.
          </p>
          <h3>Artikel 4: Plaatsing en Aanneming van Opdrachten</h3>
          <p>
            4.1 Opdrachtgevers kunnen via het platform opdrachten plaatsen, met
            een duidelijke omschrijving van de werkzaamheden.
          </p>
          <p>
            4.2 Vakmannen kunnen reageren op geplaatste opdrachten en offertes
            uitbrengen. 4.3 Een overeenkomst komt tot stand wanneer een
            opdrachtgever een offerte van een Vakman accepteert via het
            platform.
          </p>
          <h3>Artikel 5: Uitvoering van Opdrachten</h3>
          <p>
            5.1 De Vakman verplicht zich de aangenomen opdracht naar beste
            kunnen en conform de eisen van goed vakmanschap uit te voeren.
          </p>
          <p>
            5.2 De Vakman zorgt voor de benodigde materialen en gereedschappen,
            tenzij anders overeengekomen.
          </p>
          <p>
            5.3 De Vakman dient zich te houden aan de overeengekomen termijnen
            en de opdrachtgever tijdig te informeren bij eventuele vertragingen.
          </p>
          <h3>Artikel 6: Betalingen en Facturatie</h3>
          <p>
            6.1 Betalingen voor uitgevoerde opdrachten geschieden via de door
            Mostpros aangeboden betalingsmethoden.
          </p>
          <p>
            6.2 Mostpros kan transactiekosten in rekening brengen, welke vooraf
            duidelijk worden gecommuniceerd.
          </p>
          <p>
            6.3 Vakmannen ontvangen betalingen na voltooiing van de opdracht en
            goedkeuring door de opdrachtgever, via het platform.
          </p>
          <h3>Artikel 7: Annuleringen en Wijzigingen</h3>
          <p>
            7.1 Opdrachtgevers kunnen een geplaatste opdracht annuleren zolang
            deze nog niet door een Vakman is geaccepteerd.
          </p>
          <p>
            7.2 Wijzigingen aan een opdracht kunnen in overleg tussen
            opdrachtgever en Vakman worden aangebracht via het platform.
          </p>
          <p>
            7.3 Annuleringen van een reeds geaccepteerde opdracht kunnen
            onderhevig zijn aan annuleringskosten.
          </p>
          <h3>Artikel 8: Aansprakelijkheid</h3>
          <p>
            8.1 Mostpros is niet aansprakelijk voor schade voortvloeiend uit
            overeenkomsten tussen opdrachtgevers en Vakmannen.
          </p>
          <p>
            8.2 De Vakman is verantwoordelijk voor de uitvoering van de
            werkzaamheden en de kwaliteit daarvan.
          </p>
          <p>
            8.3 De opdrachtgever is verantwoordelijk voor een tijdige en
            correcte betaling van de overeengekomen vergoeding.
          </p>
          <h3>Artikel 9: Reviews en Feedback</h3>
          <p>
            9.1 Opdrachtgevers kunnen na voltooiing van een opdracht reviews en
            feedback geven.
          </p>
          <p>
            9.2 Mostpros behoudt zich het recht voor om reviews die in strijd
            zijn met de huisregels of onjuiste informatie bevatten, te
            verwijderen.
          </p>
          <h3>Artikel 10: Verzekering en Licenties</h3>
          <p>
            10.1 De Vakman dient te beschikken over de benodigde verzekeringen,
            vergunningen en licenties die noodzakelijk zijn voor de uitvoering
            van de werkzaamheden.
          </p>
          <p>
            10.2 De Vakman vrijwaart Mostpros en de opdrachtgever van aanspraken
            van derden voortvloeiend uit de uitvoering van de werkzaamheden.
          </p>
          <h3>Artikel 11: Privacy en Gegevensbescherming</h3>
          <p>
            11.1 Mostpros respecteert de privacy van alle gebruikers en handelt
            conform de Algemene Verordening Gegevensbescherming (AVG).
          </p>
          <p>
            11.2 Persoonlijke gegevens van gebruikers worden uitsluitend
            gebruikt voor de dienstverlening van Mostpros en worden niet gedeeld
            met derden zonder toestemming van de gebruiker.
          </p>
          <h3>Artikel 12: Wijzigingen van de Algemene Voorwaarden</h3>
          <p>
            12.1 Mostpros behoudt zich het recht voor om deze algemene
            voorwaarden te wijzigen.
          </p>
          <p>
            12.2 Wijzigingen treden in werking op het moment dat deze op het
            platform zijn gepubliceerd.
          </p>
          <p>
            12.3 Indien de gebruiker niet akkoord gaat met de gewijzigde
            voorwaarden, kan hij zijn account beëindigen.
          </p>
          <h3>Artikel 13: Toepasselijk Recht en Geschillen</h3>
          <p>
            13.1 Op alle rechtsbetrekkingen waarbij Mostpros partij is, is
            uitsluitend het Nederlands recht van toepassing.
          </p>
          <p>
            13.2 Geschillen tussen Mostpros en de gebruiker zullen in eerste
            instantie worden voorgelegd aan de bevoegde rechter in het
            arrondissement waar Mostpros is gevestigd.
          </p>
        </div>
      )}
    </>
  );
};
export default TermsAndConditionsText;
