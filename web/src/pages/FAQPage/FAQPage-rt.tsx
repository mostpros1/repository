import React from 'react';
import SideNav from "../../components/ui/SideNav/SideNav";
import FAQ from "../../components/FAQ/FAQ";
import "./FAQPage-rt.css";



function FAQPageLayout() {
    return (
        <main className="FAQmain">
            <section className="RightsideFAQsection">
                <article className="sideNavFAQ">
                    {/* inhoud sidenav */}
                    <SideNav />
                </article>
            </section>
            <section className='rightsideFAQSection'>
                <FAQ />
            </section>
        </main>
    );
}



export default FAQPageLayout;