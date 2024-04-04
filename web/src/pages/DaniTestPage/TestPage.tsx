import NavBar from '../../components/ui/NavBar/NavBar';
import Footer from '../../components/ui/Footer/Footer';
import TestComp from "../../components/TestComp/TestComp"

function TestPage() {
    return (
        <div id="root">
            <NavBar />   
            <TestComp/>             
            <Footer />
        </div>
    )
}

export default TestPage;