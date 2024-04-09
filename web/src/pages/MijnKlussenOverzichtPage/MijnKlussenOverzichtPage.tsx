import NavBar from '../../components/ui/NavBar/NavBar';
import Footer from '../../components/ui/Footer/Footer';
import MijnKlussenOverzichtComp from "../../components/MijnKlussenOverzichtComp/MijnKlussenOverzichtComp"

function MijnKlussenOverzichtPage() {
    return (
        <div id="root">
            <NavBar />   
            <MijnKlussenOverzichtComp/>             
            <Footer />
        </div>
    )
}

export default MijnKlussenOverzichtPage;