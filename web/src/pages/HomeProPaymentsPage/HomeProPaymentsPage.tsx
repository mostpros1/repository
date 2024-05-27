import React from "react";
import NavBar from "../../components/ui/NavBar/NavBar";
import ProPaymentLayout from "./HomeProPayments-rt";
import Footer from "../../components/ui/Footer/Footer";
import "./HomeProPaymentsPage.css";

function HomeProPaymentsPage() {
  return (
    <div id="root">
      <NavBar />
      <ProPaymentLayout />
      <Footer />
    </div>
  );
}

export default HomeProPaymentsPage;
