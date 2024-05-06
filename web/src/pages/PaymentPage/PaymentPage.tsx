import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import SideNav from "../../components/ui/SideNav/SideNav";
import PaymentList from "../../components/PaymentsList/PaymentList";
import StripeNotice from "../../components/PaymentsList/PaymentList";
import "./PaymentPage.css";

const PaymentPage = () => {
  return (
    <>
      <NavBar />
      <div className="Payment-panel">
        <div className="side-panel-left-payment">
          <SideNav />
        </div>
        <div className="side-panel-right-payment">
          <PaymentList />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;