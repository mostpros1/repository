import React from 'react'
import "./ProfessionalDashboard.css"
import NavBar from '../../components/ui/NavBar/NavBar'
import HomeOwnerDashboardLeftside from '../../components/HomeOwnerDashboard/HomeOwnerDashboardLeftside/HomeOwnerDashboardLeftside'
import HomeOwnerDashboardRightside from '../../components/HomeOwnerDashboard/HomeOwnerDashboardRightside/HomeOwnerDashboardRightside'
import Footer from '../../components/ui/Footer/Footer'

function ProfessionalDashboard() {
    return (
        <>
            <NavBar />
            <div className="prof_dashboard_wrapper">
                <div className="prof_dashboard_con">
                    <HomeOwnerDashboardLeftside />
                    <HomeOwnerDashboardRightside />
                </div>
            </div>
            <Footer />
        </>

    )
}
export default ProfessionalDashboard