import "./InvoiceComp.css";
import Logo from "../../assets/Mostproslogoblue.png";

function InvoiceComp() {
  return (
    <main id="mainmain">
      <section id="InvoiceCompSection">
        <section id="topButtonContainer">
          <a id="topButton" href="" rel="noopener noreferrer">
            Terug naar resultaten
          </a>
          <div className="progressContainer">
            <h5 className="InvoiceCompProgressTitle">Factuur</h5>
            <div className="progressBar">
              <div className="progressBlock filled"></div>
              <div className="progressBlock filled"></div>
              <div className="progressBlock"></div>
              <div className="progressBlock"></div>
              <div className="progressBlock"></div>
            </div>
          </div>
        </section>
      </section>
      <article className="invoiceWhiteCard">
        <section className="invoiceWhiteCardImgInfoWrapper">
          <img src={Logo} alt="Logo of mostpros" className="invoiceLogoImg" />
          <div>
            <p className="invoiceAdressInfo">Mostpros</p>
            <p className="invoiceAdressInfo">2013 AS, Haarlem</p>
            <p className="invoiceAdressInfo">Kinderhuissingel 6-K</p>
          </div>
        </section>
        <section className="invoiceWhiteCardInfoWrapper">
          <div>
            <p className="invoiceAdressInfo">Mostpros</p>
            <p className="invoiceAdressInfo">2013 AS, Haarlem</p>
            <p className="invoiceAdressInfo">Kinderhuissingel 6-K</p>
          </div>
        </section>
        <section className="invoiceWhiteCardInfoInvoiceWrapper">
          <h5 className="InvoiceCompProgressTitleTwo">Factuur</h5>
          <div className="InvoiceInfoWrapper">
            <p className="invoiceAdressInfoTwo">Factuurnummer: 234567</p>
            <p className="invoiceAdressInfoTwo">Factuurdatum: 29-09-2023</p>
            <p className="invoiceAdressInfoTwo">Relatienummer: 234561</p>
          </div>
        </section>
        <section className="invoiceWhiteCardDescriptionWrapper">
          <div className="InvoiceTitleWrapper">
            <h5 className="InvoiceCompProgressTitleTwo">Omschrijving</h5>
          </div>
          <div className="InvoiceInfoWrapper">
            <p className="invoiceAdressInfoTwo">
              Nieuwe leiding aanleggen: De leiding in de keuken, badkamer en in
              de tuin moeten aangelegd worden. Er is geen schade in de keuken en
              badkamer. Er is wel schade in de tuin waar de leiding momenteel
              is.
            </p>
          </div>
        </section>
        <section className="invoicePriceDetailsOneWrapper bordertopbottom">
        <div className="invoicePriceDetailsOne">
            <p className="invoiceAdressInfoTwo">Prijs</p>
            <p className="invoiceAdressInfoTwo">Bedrag</p>
            <p className="invoiceAdressInfoTwo">Btw</p>
          </div>
          <div className="invoicePriceDetailsOne">
            <p className="invoiceAdressInfoTwo">€ 500,00</p>
            <p className="invoiceAdressInfoTwo">€ 500,00</p>
            <p className="invoiceAdressInfoTwo">21%</p>
          </div>
        </section>
        <section className="invoicePriceDetailsOneWrapper">
        <div className="invoicePriceDetailsOne">
            <p className="invoiceAdressInfoTwo">Totaal exclusief BTW</p>
            <p className="invoiceAdressInfoTwo">BTW(21%)</p>
          </div>
          <div className="invoicePriceDetailsOne">
            <p className="invoiceAdressInfoTwo">€ 500,00</p>
            <p className="invoiceAdressInfoTwo">€ 35,23</p>
          </div>
        </section>
        <section className="invoicePriceDetailsOneWrapper bordertop">
        <div className="invoicePriceDetailsOne">
            <p className="invoiceAdressInfoTwo">Totaal inclusief BTW</p>
          </div>
          <div className="invoicePriceDetailsOne">
            <p className="invoiceAdressInfoTwo">€ 535,20</p>
          </div>
        </section>
      </article>
      <section className="invoiceButtonContainer">
         <button className="invoiceButtonOne">Vorige</button>
          <button className="invoiceButtonTwo">Betalen</button>
        </section>
    </main>
  );
}

export default InvoiceComp;
