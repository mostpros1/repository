import "./HomeOwnerResultPage.css"
import NavBar from "../../components/ui/NavBar/NavBar"
import FilterBar from "../../components/FilterBar/FilterBar"
import SpecialistList from "../../components/SpecialistList/SpecialistList"
import Footer from "../../components/ui/Footer/Footer"

function HomeOwnerResultPage() {
    return (
        <>
            <NavBar />
            <div className="HO_result">
                <div className="HO_wrapper">
                    <FilterBar />
                    <SpecialistList />
                </div>
            </div>
            <Footer />
        </>

    )
}

export default HomeOwnerResultPage;