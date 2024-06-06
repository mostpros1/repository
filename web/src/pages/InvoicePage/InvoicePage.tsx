import NavBar from '../../components/ui/NavBar/NavBar';
import Footer from '../../components/ui/Footer/Footer';
import InvoiceComp from "../../components/InvoiceComp/InvoiceComp"

function InvoicePage() {
    return (
        <div id="root">
            <NavBar />   
            <InvoiceComp/>             
            <Footer />
        </div>
    )
}

export default InvoicePage;