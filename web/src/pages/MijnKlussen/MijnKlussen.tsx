import NavBar from '../../components/ui/NavBar/NavBar'
import Footer from '../../components/ui/Footer/Footer'
import './MijnKlussen.css'
import JobDisc from '../../components/JobProfile/JobDisc'

function KlussenPage() {
    return (
        <div id="root">
            <NavBar />
            <div className="main-content">
                <JobDisc />
            </div>
            <Footer />
        </div>
    )
}

export default KlussenPage