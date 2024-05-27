import SideNav from "../../components/ui/SideNav/SideNav";
import HomeProPaymentsComp from "../../components/HomeProPaymentsComp/HomeProPaymentsComp";
import "./HomeProPayments-rt.css";

function proPaymentLayout() {
    return (
        <main className="homeProPaymentsMain">
            <section className="sidenavHomeProPaymentsSection">
                <article className="sideNavHomeProPayments">
                    <SideNav />
                </article>
            </section>
            <section className='rightsideHomeProPaymentsSection'>
                <HomeProPaymentsComp />
            </section>
        </main>
    );
}

export default proPaymentLayout;