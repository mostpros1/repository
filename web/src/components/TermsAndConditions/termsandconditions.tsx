import React from "react";
import lockkey from "../../assets/locked_icon_dude.svg";
import "./termsandconditions.css";

const TermsAndCondition = () => {
  return (
    <main id="terms-Main">
      <section id="terms-UpperSection">
        <h1>Algemene voorwaarden</h1>
        <img id="terms-image" src={lockkey} alt="Privacy Lock" />
      </section>

      <section id="terms-LowerSection">
        <h3 id="terms-title">Algemene Voorwaarden Mostpros</h3>
        <p id="terms-topText">
          Versie: 1.0 Laatst aangepaste datum: 28 - 08 - 2023
        </p>
        <ol className="terms-listStyle">
          <li id="terms-title">Definities</li>
          <p id="terms-description">
            In deze algemene voorwaarden worden een aantal begrippen gehanteerd
            in enkelvoud en meervoud die met een hoofdletter geschreven zijn en
            die de betekenis hebben zoals in dit artikel gedefinieerd.
          </p>
          <li>Algemene Voorwaarden Mostpros: deze voorwaarden.</li>
          <li>
            Algemene Voorwaarden Derden: de door derden gehanteerde
            leveringsvoorwaarden, licentievoorwaarden, garantievoorwaarden en
            overige voorwaarden.
          </li>
          <li>
            Mostpros: Mostpros, ingeschreven bij de Kamer van Koophandel onder
            nr. 67186963 en de ondernemingen die deze Algemene Voorwaarden van
            toepassing verklaren.
          </li>
          <li>
            Mostpros Producten: alle door Mostpros verstrekte Producten, de
            daaruit voortvloeiende voorzieningen en daarmee samenhangende
            werkzaamheden, die afkomstig zijn van Mostpros en waarvan eventuele
            intellectuele eigendomsrechten en andere rechten bij Mostpros
            berusten. Mostpros Producten omvatten o.a. door Mostpros ingebrachte
            standaard technische- en/of design oplossingen en voor algemeen
            gebruik ontwikkelde en niet-exclusief aan Cliënt beschikbaar
            gestelde generieke programmatuurelementen, platformen en frameworks
            van Mostpros.
          </li>
          <li>
            Maatwerk: alle door Mostpros verstrekte Producten, specifiek voor
            Cliënt ontwikkeld (onder diens leiding, toezicht en/of instructies)
            en schriftelijk aangeduid en overeengekomen als maatwerk waarvan
            eventuele intellectuele eigendomsrechten en andere rechten bij
            Cliënt berusten.
          </li>
          <li>
            Broncode: de programmeercode die kan worden weergegeven in een
            formaat, leesbaar en begrijpelijk voor een programmeur. Deze omvat
            gerelateerde Broncode-documentatie, opmerkingen en procedurele
            codes. Uit Broncode kan de objectcode worden gecompileerd.
          </li>
          <li>
            Cliënt: de partij of persoon die met Mostpros een overeenkomst heeft
            afgesloten.
          </li>
          <li>
            Derden Producten: alle door Mostpros verstrekte Producten, de
            daaruit voortvloeiende voorzieningen en de daarmee samenhangende
            werkzaamheden die afkomstig zijn van derden en waarvan eventuele
            intellectuele eigendomsrechten, industriële eigendomsrechten en
            andere rechten in beginsel niet bij Mostpros berusten.
          </li>
          <li>
            Hosting: verstrekking van een niet-exclusieve virtuele Omgeving in
            een datacenter van een derde waarin voor Cliënt gegevens,
            programmatuur, Producten (en indien mogelijk apparatuur) kunnen
            worden geplaatst. Hosting omvat niet de eigen Omgeving van Cliënt
            (zie art. 3.2 ) en het internet.
          </li>
          <li>
            Producten: door Mostpros verstrekte producten (inclusief Maatwerk),
            diensten, voorzieningen en de daarmee samenhangende werkzaamheden in
            de relatie tussen Mostpros en Cliënt.
          </li>
          <li>
            Omgeving: de systeemomgeving bestaande uit software, hardware en de
            randapparatuur waarop een variant van een Product draait, mee
            communiceert of op enige wijze van afhankelijk is.
          </li>
          <li>
            Project: een grote Wijziging waarvan Mostpros op basis van ervaring
            en inzicht inschat dat de definiëring, ontwikkeltijd en uitvoering
            meer dan 8 uur in beslag neemt.
          </li>
          <li>
            Responsetijd: de tijd tussen de ontvangst door Mostpros van de
            melding van de Storing door Cliënt en het moment dat Mostpros
            streeft te beginnen met het herstel.
          </li>
          <li>
            SLA: Service Level Agreement, een schriftelijke overeenkomst tussen
            Mostpros en Cliënt op basis van inspanning waarin afspraken met
            betrekking tot Producten, zoals Responsetijden en de gewenste
            kwaliteit kunnen worden afgesproken.
          </li>
          <li>
            Storing: een fout of gebrek in het Product die het functioneren
            verstoort die in de functionele beschrijvingen van processen en
            gegevens in het functioneel ontwerp dan wel technisch ontwerp is
            vastgelegd. Indien deze beschrijvingen niet beschikbaar zijn, zal er
            in overleg worden bepaald of het gemelde probleem redelijkerwijs een
            Storing in het Product betreft. Van een Storing is alleen sprake
            indien deze kan worden aangetoond en kan worden gereproduceerd.
            Partijen komen deze definitie overeen, tenzij zij in de overeenkomst
            hiervan afwijken.
          </li>
          <li>
            Support: het op verzoek van (gebruikers van) Cliënt of uit eigen
            initiatief verstrekken van mondelinge en schriftelijke (per e-mail)
            ondersteuning omtrent de technische- en ontwikkelaspecten van de
            Producten en daarmee samenhangende elementen. Cliënt is
            verantwoordelijk en zorgt voor eerstelijns- support, zijnde het
            registreren en aanmelden van Storingen aan Mostpros en het versteken
            van ondersteuning aan gebruikers voor wat betreft de functionele
            aspecten van de Producten.
          </li>
          <li>
            Uitwijkprocedure: een uitgewerkt beleid en middelen waarover Cliënt
            beschikt om in het geval van Storingen het verstoorde bedrijfsproces
            op alternatieve wijze kan continueren.
          </li>
          <li>
            Werkdagen: normale Nederlandse werktijden ( 9.00 - 17.00 CET) op
            maandag t/m vrijdag, uitgezonderd nationale en in Nederland erkende
            feestdagen.
          </li>
          <li>
            Wijziging: een aanpassing in de Broncode die effect heeft op de
            functionaliteit, technische werking of de beschikbaarheid van een
            Product.
          </li>
          <li>
            Software as a Service: dienst bestaande uit het ter beschikking
            stellen van functionaliteit op afstand via elektronische weg.
          </li>
        </ol>
      </section>
    </main>
  );
};

export default TermsAndCondition;
