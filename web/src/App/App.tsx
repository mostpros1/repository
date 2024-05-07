import { Routes, Route, useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import React from "react";
import HomePage from "../pages/HomePage/HomePage";
import KlussenPage from "../pages/KlussenPage/KlussenPage";
import SpecialistPage from "../pages/Offertestraat-specialist/SpecialistPage";
import ResultsPage from "../pages/ResultsPage/ResultsPage";
import MyTaskPage from "../pages/MyTasksPage/MyTaskPage";
import HomeOwnerTasksPage from "../pages/HomeOwnerTasksPage/HomeOwnerTasksPage";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import HowItWorksPage from "../pages/HowItWorksPage/HowItWorksPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import HomeOwnerResultPage from "../pages/HomeOwnerResultPage/HomeOwnerResultPage";
import AdminSideBar from "../components/AdminSideBar/AdminSideBar";
import AdminMain from "../pages/AdminHomePage/AdminMain";
import ManageUser from "../pages/AdminHomePage/ManageUser";
import WachtwoordVergetenPage from "../pages/WachtwoordVergetenPage/WachtwoordVergetenPage";
import BevestigEmailPage from "../pages/BevestigEmailPage/BevestigEmailPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
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
import HomeOwnerDashboardPage from "../pages/HomeOwnerDashboardPage/HomeOwnerDashboard.tsx";
import DetailJobPage from "../pages/DetailJobPage/DetailJobPage";
import MijnKlussenOverzichtPage from "../pages/MijnKlussenOverzichtPage/MijnKlussenOverzichtPage";
import VSMijnklussen from "../pages/VakspecialistMijnKlussen/VSMijnklussen";
import ConfirmDatePage from "../pages/ConfirmDatePage/ConfirmDatePage";
import HomeOwnerSettingsPage from "../pages/HomeOwnerSettingsPage/HomeOwnerSettingsPage";
import HomeOwnerNotification from "../components/HomeOwnerSettings/HomeOwnerNotification";
import HomeOwnerSecurity from "../components/HomeOwnerSettings/HomeOwnerSecurity";
import HomeOwnerDeactivation from "../components/HomeOwnerSettings/HomeOwnerDeactivation";
import Jobspage from "../pages/JobsPage/JobsPage";
import ReviewPage from "../pages/ReviewPage/ReviewPage";
import InvoicePage from "../pages/InvoicePage/InvoicePage.tsx";
import ChatMain from "../pages/ChatPage/ChatPage";
import IdealOptionsPage from "../pages/IdealOptionsPage/IdealOptionsPage.tsx";
import ChatContactList from "../components/Chat/ChatContactList";
import HomeProPaymentsPage from "../pages/HomeProPaymentsPage/HomeProPaymentsPage.tsx";
import ChatPage from "../pages/ChatPage/ChatPage.tsx";
import Calender from "../pages/CalenderPage/CalenderPage.tsx";
import FAQPage from "../pages/FAQPage/FAQPage.tsx";
import ViewProfessionals from "../components/ViewProfessionals/ViewProfessionals";
import { useTranslation } from "react-i18next";

import Callender from "../components/Agenda/Callendar.tsx";

const LanguageAwareRoutes = () => {
  const { user } = useUser();

  const { lang } = useParams();
  const { t } = useTranslation();

  // Function to prepend language to the given path
  /*const addLanguagePrefix = (path) => {
    return `/${lang}${path}`;
  };*/

  return (
    <Routes>
      
      <Route path="/home-owner-result" element={<HomeOwnerResultPage />} />
      <Route path="/jobs-mostpros" element={<MyTaskPage />} />
      <Route path="/jobs" element={<KlussenPage />} />
      <Route path="/jobs/lekkages-repareren" element={<KlussenPage />} />
      <Route path="/jobs/sanitair-installeren" element={<KlussenPage />} />
      <Route path="/jobs/tuinontwerp-maken" element={<KlussenPage />} />
      <Route path="/forgot-password" element={<WachtwoordVergetenPage />} />
      <Route path="/confirm-mail" element={<BevestigEmailPage />} />
      <Route path="/huiseigenaar-resultaat" element={<HomeOwnerDashboard />} />
      <Route path="/pro-onboarding" element={<SpecialistPage />} />
      <Route path="/homeowner-dashboard" element={<ResultsPage />} />
      <Route path="/pro-dashboard" element={<ResultsPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/MijnKlussen" element={<MijnKlussen />} />
      <Route path="/home-innovation" element={<HomeInovation />} />
      <Route path="/VSDashboard" element={<VSDashboard />} />
      <Route path="/homeowner-dashboard/profile" element={<HomeOwnerDashboardPage />} />
      <Route path="/pro-dashboard/profile" element={<SpecialistProfile />} />

      <Route path="/DetailJob" element={<DetailJobPage />} />
      <Route path="/PaymentOptions" element={<PaymentOptionsPage />} />
      <Route path="/DashboardPage" element={<DashboardPage />} />
      <Route path="/HomeOwnerResultPage" element={<HomeOwnerResultPage />} />
      <Route path="/IdealOptions" element={<IdealOptionsPage />} />
      <Route path="/homeowner-dashboard/calender" element={<Callender />} />
      <Route path="/pro-dashboard/calender" element={<Calender />} />
      <Route path="/ViewProfessionals" element={<ViewProfessionals />} />
      <Route
        path="/MijnKlussenOverzicht"
        element={<MijnKlussenOverzichtPage />}
      />
      <Route path="/OverOns" element={<OverOns />} />
      <Route path="/ConfirmDate" element={<ConfirmDatePage />} />
      <Route path="/homeowner-dashboard/jobs" element={<Jobspage />} />
      <Route path="/pro-dashboard/jobs" element={<Jobspage />} />
      <Route path="/Invoice" element={<InvoicePage />} />
      <Route path="/homeowner-dashboard/payments" element={<HomeProPaymentsPage />} />
      <Route path="/homeowner-dashboard/chat" element={<ChatMain />} />
      <Route path="/pro-dashboard/chat" element={<ChatMain />} />
      <Route
        path="/homeowner-dashboard/settings"
        element={<HomeOwnerSettingsPage />}
      />
      <Route
        path="/pro-dashboard/settings"
        element={<HomeOwnerSettingsPage />}
      />
      <Route
        path="/HomeOwnerNotification"
        element={<HomeOwnerNotification />}
      />
      <Route path="/HomeOwnerSecurity" element={<HomeOwnerSecurity />} />
      <Route
        path="/HomeOwnerDeactivation"
        element={<HomeOwnerDeactivation />}
      />
      <Route path="/FAQPage" element={<FAQPage />} />
      <Route path="/jobspage" element={<Jobspage />} />
      <Route path="/homeowner-dashboard/reviews" element={<ReviewPage />} />
      <Route path="/pro-dashboard/reviews" element={<ReviewPage />} />
      <Route path="/DetailJob" element={<DetailJobPage />} />
      <Route
        path="/MijnKlussenOverzicht"
        element={<MijnKlussenOverzichtPage />}
      />
      <Route path="/OverOns" element={<OverOns />} />
      <Route path="/ConfirmDate" element={<ConfirmDatePage />} />
      <Route path="/homeowner-dashboard/jobs" element={<Jobspage />} />
      <Route path="/pro-dashboard/jobs" element={<Jobspage />} />
      <Route path="/Invoice" element={<InvoicePage />} />
      <Route path="/homeowner-dashboard/chat" element={<ChatMain />} />
      <Route path="/pro-dashboard/chat" element={<ChatMain />} />
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
  //<Route path="/EditProfileSection" element={<EditProfile />} />
};



const App = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const pathName = window.location.pathname;
    const hash = window.location.hash;

    if (!window.location.pathname.startsWith('/nl')) {
      if (!window.location.pathname.startsWith('/en')) {
        if (pathName === '/') {
          navigate('/nl/');
        } else {
          navigate('/nl' + pathName + hash);
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
    <Routes>
      {/* Wildcard route to capture the language part of the URL */}
      <Route path="/:lang/*" element={<LanguageAwareRoutes />} />
      {/* Fallback route if no language is specified */}
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
