import NavBar from '../../components/ui/NavBar/NavBar';
import Footer from '../../components/ui/Footer/Footer';
import TemplateStaticComp from "../../components/TemplateStaticComp/TemplateStaticComp";

function TemplatePageStatic() {
    return (
        <div id="root">
            <NavBar />   
            <TemplateStaticComp/>             
            <Footer />
        </div>
    )
}

export default TemplatePageStatic;