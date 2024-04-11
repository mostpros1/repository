import NavBar from '../../components/ui/NavBar/NavBar';
import Footer from '../../components/ui/Footer/Footer';
import ConfirmDateComp from "../../components/ConfirmDateComp/ConfirmDateComp"

function ConfirmDatePage() {
    return (
        <div id="root">
            <NavBar />   
            <ConfirmDateComp/>             
            <Footer />
        </div>
    )
}

export default ConfirmDatePage;