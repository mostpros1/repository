import { Routes, Route, Navigate } from "react-router-dom";
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


const App = () => {
  const { user } = useUser();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/nl/jobs-mostpros" element={<MyTaskPage />} />
      <Route path="/nl/jobs" element={<KlussenPage />} />
      <Route path="/nl/jobs/lekkages-repareren" element={<KlussenPage />} />
      <Route path="/nl/jobs/sanitair-installeren" element={<KlussenPage />} />
      <Route path="/nl/jobs/tuinontwerp-maken" element={<KlussenPage />} />
      <Route path="/nl/forgot-password" element={<WachtwoordVergetenPage />} />
      <Route path="/nl/confirm-mail" element={<BevestigEmailPage />} />
      <Route path="/nl/huiseigenaar-resultaat" element={<HomeOwnerDashboard />} />
      <Route path="/nl/pro-onboarding" element={<SpecialistPage />} />
      <Route path="/nl/homeowner-dashboard" element={<ResultsPage />} />
      <Route path="/nl/pro-dashboard" element={<ResultsPage />} />
      <Route path="/nl/about" element={<AboutUsPage />} />
      <Route path="/nl/how-it-works" element={<HowItWorksPage />} />
      <Route path="/nl/contact" element={<ContactPage />} />
      <Route path="/MijnKlussen" element={<MijnKlussen />} />
      <Route path="/nl/home-innovation" element={<HomeInovation />} />
      <Route path="/VSDashboard" element={<VSDashboard />} />
      <Route path="/nl/homeowner-dashboard/profile" element={<HomeOwnerDashboardPage />} />
      <Route path="/nl/pro-dashboard/profile" element={<SpecialistProfile />} />
      <Route path="/EditProfileSection" element={<HomeOwnerDashboardPage />} />
      <Route path="/DetailJob" element={<DetailJobPage />} />
      <Route path="/PaymentOptions" element={<PaymentOptionsPage />} />
      <Route path="/nl/DashboardPage" element={<DashboardPage />} />
      <Route path="/nl/HomeOwnerResultPage" element={<HomeOwnerResultPage />} />
      <Route path="/IdealOptions" element={<IdealOptionsPage />} />
      <Route path="/nl/homeowner-dashboard/calender" element={<Calender />} />
      <Route path="/nl/pro-dashboard/calender" element={<Calender />} />
      <Route path="/nl/ViewProfessionals" element={<ViewProfessionals />} />
      <Route
        path="/nl/MijnKlussenOverzicht"
        element={<MijnKlussenOverzichtPage />}
      />
      <Route path="/nl/OverOns" element={<OverOns />} />
      <Route path="/nl/ConfirmDate" element={<ConfirmDatePage />} />
      <Route path="/nl/homeowner-dashboard/jobs" element={<Jobspage />} />
      <Route path="/nl/pro-dashboard/jobs" element={<Jobspage />} />
      <Route path="/nl/Invoice" element={<InvoicePage />} />
      <Route path="/nl/homeowner-dashboard/payments" element={<HomeProPaymentsPage />} />
      <Route path="/nl/homeowner-dashboard/chat" element={<ChatMain />} />
      <Route path="/nl/pro-dashboard/chat" element={<ChatMain />} />
      <Route
        path="/nl/homeowner-dashboard/settings"
        element={<HomeOwnerSettingsPage />}
      />
      <Route
        path="/nl/pro-dashboard/settings"
        element={<HomeOwnerSettingsPage />}
      />
      <Route
        path="/nl/HomeOwnerNotification"
        element={<HomeOwnerNotification />}
      />
      <Route path="/nl/HomeOwnerSecurity" element={<HomeOwnerSecurity />} />
      <Route
        path="/nl/HomeOwnerDeactivation"
        element={<HomeOwnerDeactivation />}
      />
      <Route path="/nl/FAQPage" element={<FAQPage />} />
      <Route path="/nl/jobspage" element={<Jobspage />} />
      <Route path="/nl/homeowner-dashboard/reviews" element={<ReviewPage />} />
      <Route path="/nl/pro-dashboard/reviews" element={<ReviewPage />} />
      <Route path="/nl/DetailJob" element={<DetailJobPage />} />
      <Route
        path="/nl/MijnKlussenOverzicht"
        element={<MijnKlussenOverzichtPage />}
      />
      <Route path="/nl/OverOns" element={<OverOns />} />
      <Route path="/nl/ConfirmDate" element={<ConfirmDatePage />} />
      <Route path="/nl/homeowner-dashboard/jobs" element={<Jobspage />} />
      <Route path="/nl/pro-dashboard/jobs" element={<Jobspage />} />
      <Route path="/nl/Invoice" element={<InvoicePage />} />
      <Route path="/nl/homeowner-dashboard/chat" element={<ChatMain />} />
      <Route path="/nl/pro-dashboard/chat" element={<ChatMain />} />
      <Route path="/nl/VSMijnklussen" element={<VSMijnklussen />} />
      <Route path="/nl/login" element={<LoginPage />} />
      <Route path="/nl/register" element={<RegisterPage />} />
      <Route path="/nl/payments">
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
        path="/nl/admin-paneel"
        element={
          user && user.role === "Admin" ? <AdminSideBar /> : <Navigate to="/" />
        }
      >
        <Route index element={<AdminMain />} />
        <Route path="manage-users" element={<ManageUser />} />
      </Route>
      <Route
        path="/nl/dashboard-huiseigenaar"
        element={
          user && user.role === "Homeowner" ? (
            <HomeOwnerDashboard />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/nl/dashboard-professional"
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

export default App;
