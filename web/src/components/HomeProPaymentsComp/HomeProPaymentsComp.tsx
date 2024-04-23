import "./HomeProPaymentsComp.css";
import { FaSearch } from 'react-icons/fa'; // Importing the search icon from react-icons library

function HomeProPaymentsComp() {
  return (
    <main className="ProPaymentsMain">
      <section className="ProPaymentsSearchWrapper">
        <p className="ProPaymentsText">Payments are going through stripe. Stripe is a safe payment service. It looks like you haven’t connected to stripe yet. Click the button below to connect to stripe and get payed for your services.</p>
        <button type="button" className="ProPaymentsButton">Connect to Stripe</button>
      </section>

      <section className="ProPayments">

        <article className="ProPaymentsStroke ProPaymentsInfoBar">
          <p className="ProPaymentInfo">Date</p>
          <p className="ProPaymentsInfo">Name</p>
          <p className="ProPaymentsInfo">Transaction Nr.</p>
          <p className="ProPaymentsInfo">Status</p>
          <p className="ProPaymentsInfo">Amount</p>
        </article>
        <article className="ProPaymentsStroke">
          <p>19 Mar, 2024</p>
          <p>S. Barneveld</p>
          <p>2102399123489</p>
          <p className="textorange">Awaiting</p>
          <p>1250,-</p>
        </article>        
        <article className="ProPaymentsStroke">
          <p>19 Mar, 2024</p>
          <p>S. Barneveld</p>
          <p>2102399123489</p>
          <p className="textred">Cancelled</p>
          <p>1250,-</p>
        </article>        
        <article className="ProPaymentsStroke">
          <p>19 Mar, 2024</p>
          <p>S. Barneveld</p>
          <p>2102399123489</p>
          <p className="textgreen">Paid</p>
          <p>1250,-</p>
        </article>        
        <article className="ProPaymentsStroke">
          <p>19 Mar, 2024</p>
          <p>S. Barneveld</p>
          <p>2102399123489</p>
          <p className="textgreen">Paid</p>
          <p>1250,-</p>
        </article>        
        <article className="ProPaymentsStroke">
          <p>19 Mar, 2024</p>
          <p>S. Barneveld</p>
          <p>2102399123489</p>
          <p className="textgreen">Paid</p>
          <p>1250,-</p>
        </article>
        <article className="ProPaymentsStroke">
          <p>19 Mar, 2024</p>
          <p>S. Barneveld</p>
          <p>2102399123489</p>
          <p className="textgreen">Paid</p>
          <p>1250,-</p>
        </article>        
        <article className="ProPaymentsStroke">
          <p>19 Mar, 2024</p>
          <p>S. Barneveld</p>
          <p>2102399123489</p>
          <p className="textgreen">Paid</p>
          <p>1250,-</p>
        </article>        
        <article className="ProPaymentsStroke">
          <p>19 Mar, 2024</p>
          <p>S. Barneveld</p>
          <p>2102399123489</p>
          <p className="textgreen">Paid</p>
          <p>1250,-</p>
        </article>        
        <article className="ProPaymentsStroke">
          <p>19 Mar, 2024</p>
          <p>S. Barneveld</p>
          <p>2102399123489</p>
          <p className="textgreen">Paid</p>
          <p>1250,-</p>
        </article>
      </section>
    </main>
  );
}

export default HomeProPaymentsComp;
