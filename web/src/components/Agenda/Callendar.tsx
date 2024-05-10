import React from 'react';
import SideNav from "../ui/SideNav/SideNav.tsx";
import Navigation from "../ui/NavBar/Navigation.tsx";
import Footer from "../ui/Footer/Footer.tsx";
import Cal from "./cal.tsx";
import './Callendar.css'; // Import the CSS file
import "../ui/NavBar/NavBar.css";

function Callendar() {
    return (
        <div>
            <Navigation />
            <div className="flex-container"> {/* Apply the flex-container class */}
                <SideNav />
                <div className="flex-item"> {/* Apply the flex-item class */}
                    <Cal />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Callendar;