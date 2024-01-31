import "./HomeOwnerDashboard.css"
import NavBar from '../../components/ui/NavBar/NavBar'
import HomeOwnerDashboardLeftside from '../../components/HomeOwnerDashboard/HomeOwnerDashboardLeftside/HomeOwnerDashboardLeftside'
import HomeOwnerDashboardRightside from '../../components/HomeOwnerDashboard/HomeOwnerDashboardRightside/HomeOwnerDashboardRightside'
import Footer from '../../components/ui/Footer/Footer'

function HomeOwnerDashboard() {
    return (
        <>
            <NavBar />
            <div className='HO_dashboard_wrapper'>
                <div className="HO_dashboard_con">
                    <HomeOwnerDashboardLeftside />
                    <HomeOwnerDashboardRightside />
                </div>
            </div>
            <Footer />
        </>

    )
}

export default HomeOwnerDashboard