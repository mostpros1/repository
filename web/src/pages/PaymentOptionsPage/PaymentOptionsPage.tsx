import NavBar from '../../components/ui/NavBar/NavBar';
import Footer from '../../components/ui/Footer/Footer';
import PaymentOptionsComp from "../../components/PaymentOptionsComp/PaymentOptionsComp"

function PaymentOptionsPage() {
    return (
        <div id="root">
            <NavBar />   
            <PaymentOptionsComp/>             
            <Footer />
        </div>
    )
}

export default PaymentOptionsPage;