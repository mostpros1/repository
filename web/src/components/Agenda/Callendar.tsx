import React from 'react';
import SideNav from "../ui/SideNav/SideNav";
import Cal from "./cal";
import DateAndTimePicker from "./Cal2.tsx";
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
                {/* versie Dani */}
                <Cal />
                 {/* <DateAndTimePicker/> deze uncommenten voor de versie van Timon  */}
            </section>
        </main>
    );
}

export default Callendar;
