import { useParams, Navigate, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import React from "react";
import KlussenPage from "../pages/KlussenPage/KlussenPage";
import SpecialistPage from "../pages/Offertestraat-specialist/SpecialistPage";
import ResultsPage from "../pages/ResultsPage/ResultsPage";
import MyTaskPage from "../pages/MyTasksPage/MyTaskPage";
import HowItWorksPage from "../pages/HowItWorksPage/HowItWorksPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import HomeOwnerResultPage from "../pages/HomeOwnerResultPage/HomeOwnerResultPage";
import AdminSideBar from "../components/AdminSideBar/AdminSideBar";
import AdminMain from "../pages/AdminHomePage/AdminMain";
import ManageUser from "../pages/AdminHomePage/ManageUser";
import WachtwoordVergetenPage from "../pages/WachtwoordVergetenPage/WachtwoordVergetenPage";
import BevestigEmailPage from "../pages/BevestigEmailPage/BevestigEmailPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import HomeOwnerDashboard from "../pages/HomeOwnerDashboard/HomeOwnerDashboard";
import ProfessionalDashboard from "../pages/ProfessionalDashboard/ProfessionalDashboard";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import MijnKlussen from "../pages/MijnKlussen/MijnKlussen";
import PaymentOptionsPage from "../pages/PaymentOptionsPage/PaymentOptionsPage";
import HomeInovation from "../pages/HomeInovationPage/HomeInovation";
import OverOns from "../pages/OverOns/OverOns";
import VSDashboard from "../pages/VakspecialistDashboard/VSDashboard";
import SpecialistProfile from "../pages/SpecialistProfilePage/SpecialistProfile";
import DetailJobPage from "../pages/DetailJobPage/DetailJobPage";
import WhyMostProsPage from "../pages/WhyMostProsPage/WhyMostProsPage.tsx";
import MijnKlussenOverzichtPage from "../pages/MijnKlussenOverzichtPage/MijnKlussenOverzichtPage";
import VSMijnklussen from "../pages/VakspecialistMijnKlussen/VSMijnklussen";
import ConfirmDatePage from "../pages/ConfirmDatePage/ConfirmDatePage";
import HomeOwnerSettingsPage from "../pages/HomeOwnerSettingsPage/HomeOwnerSettingsPage";
import Jobspage from "../pages/JobsPage/JobsPage";
import ReviewPage from "../pages/ReviewPage/ReviewPage";
import InvoicePage from "../pages/InvoicePage/InvoicePage.tsx";
import DataSafetyPage from "../pages/DataSafetyPage/DataSafetyPage.tsx";
import ChatMain from "../pages/ChatPage/ChatPage";
import IdealOptionsPage from "../pages/IdealOptionsPage/IdealOptionsPage.tsx";
import HomeProPaymentsPage from "../pages/HomeProPaymentsPage/HomeProPaymentsPage.tsx";
import Calender from "../pages/CalenderPage/CalenderPage.tsx";
import ViewProfessionals from "../components/ViewProfessionals/ViewProfessionals";
import HomePageTwo from "../pages/HomePageTwo/HomePageTwo.tsx";
import Setup from "../pages/SetupPage/SetupPage.tsx";
import PromoCodePage from "../components/PromoCode/PromoCode.tsx";

/* Extra Pages */
import FAQPage from "../pages/FAQPage/FAQPage.tsx";
import CareerPage from "../pages/CareerPage/CareerPage";
import DisclaimerPage from "../pages/DisclaimerPage/disclaimerpage";
import QualityPage from "../pages/QualityPage/QualityPage.tsx";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage/privacy-policy";
import TermsAndConditions from "../pages/TermsAndConditionsPage/TermsAndConditionsPage";
// import ProductUpdatePage from "../pages/ProductUpdatePage/ProductUpdatePage.tsx";
/* Template */
import OfferTemplate from "../components/PaymentLink/offers/offerTemplate.tsx";
import TemplatePage from "../pages/TemplatePage/TemplatePage.tsx";
import TemplateStaticPage from "../pages/TemplatePageStatic/TemplatePageStatic.tsx";

// error pages

import ErrorPage404 from "../pages/!ErrorPages/ErrorPage404.tsx";
import ErrorPage101 from "../pages/!ErrorPages/ErrorPage101.tsx";
import ErrorPage100 from "../pages/!ErrorPages/ErrorPage100.tsx";
import ErrorPage102 from "../pages/!ErrorPages/ErrorPage102.tsx";
import ErrorPage103 from "../pages/!ErrorPages/ErrorPage103.tsx";
import ErrorPage200 from "../pages/!ErrorPages/ErrorPage200.tsx";
import ErrorPage201 from "../pages/!ErrorPages/ErrorPage201.tsx";
import ErrorPage202 from "../pages/!ErrorPages/ErrorPage202.tsx";
import ErrorPage203 from "../pages/!ErrorPages/ErrorPage203.tsx";
import ErrorPage204 from "../pages/!ErrorPages/ErrorPage204.tsx";
import ErrorPage205 from "../pages/!ErrorPages/ErrorPage205.tsx";
import ErrorPage206 from "../pages/!ErrorPages/ErrorPage206.tsx";
import ErrorPage207 from "../pages/!ErrorPages/ErrorPage207.tsx";
import ErrorPage208 from "../pages/!ErrorPages/ErrorPage208.tsx";
import ErrorPage226 from "../pages/!ErrorPages/ErrorPage226.tsx";
import ErrorPage301 from "../pages/!ErrorPages/ErrorPage301.tsx";
import ErrorPage302 from "../pages/!ErrorPages/ErrorPage302.tsx";
import ErrorPage303 from "../pages/!ErrorPages/ErrorPage303.tsx";
import ErrorPage304 from "../pages/!ErrorPages/ErrorPage304.tsx";
import ErrorPage305 from "../pages/!ErrorPages/ErrorPage305.tsx";
import ErrorPage306 from "../pages/!ErrorPages/ErrorPage306.tsx";
import ErrorPage307 from "../pages/!ErrorPages/ErrorPage307.tsx";
import ErrorPage308 from "../pages/!ErrorPages/ErrorPage308.tsx";

import { useTranslation } from "react-i18next";
import HomeOwnerProfielPage from "../pages/HomeOwnerDashboardPage/HomeOwnerProfielPage.tsx";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.tsx";
import HelpPage from "../pages/FAQPage/HelpPage.tsx";
import OverzichtProfPage from "../pages/OverzichtPage/OverzichtProfPage.tsx";
import OverzichtKlussenPage from "../pages/OverzichtPage/OverzichtKlussenPage.tsx";
import DateAndTimePicker from "../components/Agenda/Cal2.tsx";
import Cal from "../components/Agenda/cal.tsx";

const LanguageAwareRoutes = () => {
  const { user } = useUser();

  const { lang } = useParams();
  const { t } = useTranslation();

  return (
    <Routes>
      {/* error pages  */}
      <Route path="/404" element={<ErrorPage404 />} />
      <Route path="/100" element={<ErrorPage100 />} />
      <Route path="/101" element={<ErrorPage101 />} />
      <Route path="/102" element={<ErrorPage102 />} />
      <Route path="/103" element={<ErrorPage103 />} />
      <Route path="/200" element={<ErrorPage200 />} />
      <Route path="/201" element={<ErrorPage201 />} />
      <Route path="/202" element={<ErrorPage202 />} />
      <Route path="/203" element={<ErrorPage203 />} />
      <Route path="/204" element={<ErrorPage204 />} />
      <Route path="/205" element={<ErrorPage205 />} />
      <Route path="/206" element={<ErrorPage206 />} />
      <Route path="/207" element={<ErrorPage207 />} />
      <Route path="/208" element={<ErrorPage208 />} />
      <Route path="/226" element={<ErrorPage226 />} />
      <Route path="/301" element={<ErrorPage301 />} />
      <Route path="/302" element={<ErrorPage302 />} />
      <Route path="/303" element={<ErrorPage303 />} />
      <Route path="/304" element={<ErrorPage304 />} />
      <Route path="/305" element={<ErrorPage305 />} />
      <Route path="/306" element={<ErrorPage306 />} />
      <Route path="/307" element={<ErrorPage307 />} />
      <Route path="/308" element={<ErrorPage308 />} />

      <Route path="/test" element={<DateAndTimePicker />} />
      <Route path="/" element={<HomePageTwo />} />
      <Route path="/offers" element={<OfferTemplate />} />
      <Route path="/jobs-overview" element={<OverzichtKlussenPage />} />
      <Route path="/pro-overview" element={<OverzichtProfPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/TemplatePage" element={<TemplatePage />} />
      <Route path="/TemplateStaticPage" element={<TemplateStaticPage />} />
      <Route path="/home-owner-result" element={<HomeOwnerResultPage />} />
      <Route path="/jobs-mostpros" element={<MyTaskPage />} />
      <Route path="/jobs" element={<KlussenPage />} />
      <Route path="/jobs/lekkages-repareren" element={<KlussenPage />} />
      <Route path="/jobs/sanitair-installeren" element={<KlussenPage />} />
      <Route path="/jobs/tuinontwerp-maken" element={<KlussenPage />} />
      <Route path="/wachtwoord-vergeten" element={<WachtwoordVergetenPage />} />
      <Route path="/confirm-mail" element={<BevestigEmailPage />} />
      <Route path="/huiseigenaar-resultaat" element={<HomeOwnerDashboard />} />
      <Route path="/pro-onboarding" element={<SpecialistPage />} />
      <Route path="/homeowner-dashboard" element={<ResultsPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/why-mostpros" element={<WhyMostProsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/MijnKlussen" element={<MijnKlussen />} />
      <Route path="/home-innovation" element={<HomeInovation />} />
      <Route path="/VSDashboard" element={<VSDashboard />} />
      <Route
        path="/homeowner-dashboard/profile"
        element={<HomeOwnerProfielPage />}
      />
      /* Pro dashboard links */
      <Route path="/pro-dashboard" element={<ResultsPage />} />
      <Route path="/pro-dashboard/profile" element={<HomeOwnerProfielPage />} />
      <Route path="/pro-dashboard/help" element={<FAQPage  />} />
      {/* <Route path="/pro-dashboard/profile" element={<SpecialistProfile />} /> */}
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/quality" element={<QualityPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/disclaimer" element={<DisclaimerPage />} />
      <Route path="/DetailJob" element={<DetailJobPage />} />
      <Route path="/pro-dashboard/setup" element={<Setup />} />
      <Route path="/pro-dashboard/promocode" element={<PromoCodePage />} />
      <Route path="/pro-dashboard/calender" element={<Calender />} />
      <Route path="/pro-dashboard/jobs" element={<Jobspage />} />
      <Route path="/pro-dashboard/reporting" element={<HomeProPaymentsPage />}/>
      <Route path="/pro-dashboard/chat" element={<ChatMain />} />
      <Route path="/pro-dashboard/settings" element={<HomeOwnerSettingsPage />}/>
      <Route path="/pro-dashboard/reviews" element={<ReviewPage />} />

      {/* <Route path="/product-updates" element={<ProductUpdatePage />} /> */}
      <Route path="/PaymentOptions" element={<PaymentOptionsPage />} />
      <Route path="/DashboardPage" element={<DashboardPage />} />
      <Route path="/HomeOwnerResultPage" element={<HomeOwnerResultPage />} />
      <Route path="/IdealOptions" element={<IdealOptionsPage />} />
      <Route path="/homeowner-dashboard/calender" element={<Calender />} />
      <Route path="/ViewProfessionals" element={<ViewProfessionals />} />
      <Route
        path="/MijnKlussenOverzicht"
        element={<MijnKlussenOverzichtPage />}
      />
      <Route path="/about" element={<OverOns />} />
      <Route path="/ConfirmDate" element={<ConfirmDatePage />} />
      <Route path="/homeowner-dashboard/jobs" element={<Jobspage />} />
      <Route path="/Invoice" element={<InvoicePage />} />
      <Route path="/data-safety" element={<DataSafetyPage />} />
      <Route
        path="/homeowner-dashboard/payments"
        element={<HomeProPaymentsPage />}
      />
      <Route path="/homeowner-dashboard/chat" element={<ChatMain />} />
      <Route path="/career" element={<CareerPage />} />
      <Route
        path="/homeowner-dashboard/settings"
        element={<HomeOwnerSettingsPage />}
      />
      <Route path="/homeowner-dashboard/FAQPage" element={<FAQPage />} />
      <Route path="/jobspage" element={<Jobspage />} />
      <Route path="/homeowner-dashboard/reviews" element={<ReviewPage />} />
      <Route path="/VSMijnklussen" element={<VSMijnklussen />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/payments">
        <Route path="success" element={<>Betaling is gelukt!</>} />
        <Route path="canceled" element={<>Betaling is geannuleerd.</>} />
        <Route
          path="onboarding-failed"
          element={
            <>
              Er is een fout opgetreden. Mogelijk is deze link niet meer in
              gebruik.
            </>
          }
        />
      </Route>
      <Route
        path="/admin-paneel"
        element={
          user && user.role === "Admin" ? <AdminSideBar /> : <Navigate to="/" />
        }
      >
        <Route index element={<AdminMain />} />
        <Route path="manage-users" element={<ManageUser />} />
      </Route>
      <Route
        path="/dashboard-huiseigenaar"
        element={
          user && user.role === "Homeowner" ? (
            <HomeOwnerDashboard />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/dashboard-professional"
        element={
          user && user.role === "Professional" ? (
            <ProfessionalDashboard />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

const App = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const pathName = window.location.pathname;
    const hash = window.location.hash;

    if (!window.location.pathname.startsWith("/nl")) {
      if (!window.location.pathname.startsWith("/en")) {
        if (pathName === "/") {
          navigate("/nl/");
        } else {
          navigate("/nl" + pathName + hash);
        }
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
      setLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Wildcard route to capture the language part of the URL */}
        <Route path="/:lang/*" element={<LanguageAwareRoutes />} />
        {/* Fallback route if no language is specified */}
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
