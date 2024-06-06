import NavBar from '../../components/ui/NavBar/NavBar';
import Footer from '../../components/ui/Footer/Footer';
import DataSafetyComp from "../../components/DataSafetyComp/DataSafetyComp"

function DataSafetyPage() {
    return (
        <div id="root">
            <NavBar />   
            <DataSafetyComp/>             
            <Footer />
        </div>
    )
}

export default DataSafetyPage;