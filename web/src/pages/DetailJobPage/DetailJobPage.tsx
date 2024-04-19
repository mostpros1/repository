import NavBar from '../../components/ui/NavBar/NavBar';
import Footer from '../../components/ui/Footer/Footer';
import DetailJobComp from "../../components/DetailJobComp/DetailJobComp"

function DetailJobPage() {
    return (
        <div id="root">
            <NavBar />   
            <DetailJobComp/>             
            <Footer />
        </div>
    )
}

export default DetailJobPage;