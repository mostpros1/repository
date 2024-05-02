import NavBar from '../../components/ui/NavBar/NavBar';
import Footer from '../../components/ui/Footer/Footer';
import IdealOptionsComp from "../../components/IdealOptionsComp/IdealOptionsComp"

function IdealOptionsPage() {
    return (
        <div id="root">
            <NavBar />   
            <IdealOptionsComp/>             
            <Footer />
        </div>
    )
}

export default IdealOptionsPage;