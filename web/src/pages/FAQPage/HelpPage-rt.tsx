import React from 'react';
import FAQ from "../../components/FAQ/Help";
import "./FAQPage-rt.css";

function FAQPageLayout() {
    return (
        <main className="FAQmain">
            <section className='rightsideFAQSection'>
                <FAQ />
            </section>
        </main>
    );
}

export default FAQPageLayout;