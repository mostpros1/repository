import React from 'react';
import SideNav from "../ui/SideNav/SideNav";
import Cal from "./cal";
import './Callendar.css'; // Import the CSS file
import "../ui/NavBar/NavBar.css";

function Callendar() {
    return (
        <main className="CalendarMain">
            <section className="sideNavCalendarSection">
                <article className="sideNavCalendar">
                    {/* inhoud sidenav */}
                    <SideNav />
                </article>
            </section>
            <section className='rightsideCalendarSection'>
                <Cal />
            </section>
        </main>
    );
}

export default Callendar;
