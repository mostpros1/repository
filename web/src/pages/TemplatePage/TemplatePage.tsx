import NavBar from '../../components/ui/NavBar/NavBar';
import Footer from '../../components/ui/Footer/Footer';
import TemplateComp from "../../components/TemplateComp/TemplateComp"

function TemplatePage() {
    return (
        <div id="root">
            <NavBar />   
            <TemplateComp/>             
            <Footer />
        </div>
    )
}

export default TemplatePage;