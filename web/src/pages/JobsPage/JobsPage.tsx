import React from "react";
import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import JobsLayout from "./Jobs-rt";
import "./JobsPage.css";

const jobspage = () => {
  return (
    <div id="root">
      <NavBar />
      <JobsLayout />
      <Footer />
    </div>
  );
};

export default jobspage;
