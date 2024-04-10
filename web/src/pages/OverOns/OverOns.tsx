import NavBar from '../../components/ui/NavBar/NavBar';
import Footer from '../../components/ui/Footer/Footer';
import OverOnsComp from "../../components/OverOnsComp/OverOnsComp"


function OverOns() {
    return (
        <div id="root">
            <NavBar />   
            <OverOnsComp/>             
            <Footer />
        </div>
    )
}

export default OverOns;