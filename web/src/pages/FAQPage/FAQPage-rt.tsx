import React from 'react';
import SideNav from "../../components/ui/SideNav/SideNav";
import FAQ from "../../components/FAQ/FAQ";
import "./FAQPage-rt.css";



function FAQPageLayout() {
    return (
        <main className="FAQmain">
            <section className="LeftsideFAQsection">
                <article className="sideNavFAQ">
                    <SideNav />
                </article>
            </section>
            <section className='RightsideFAQSection'>
                <FAQ />
            </section>
        </main>
    );
}



export default FAQPageLayout;