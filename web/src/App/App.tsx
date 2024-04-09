import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
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
import ChatPage from "../pages/ChatPage/ChatPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import HomeOwnerDashboard from "../pages/HomeOwnerDashboard/HomeOwnerDashboard";
import ProfessionalDashboard from "../pages/ProfessionalDashboard/ProfessionalDashboard";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import MijnKlussen from "../pages/MijnKlussen/MijnKlussen";
import HomeInovation from "../pages/HomeInovationPage/HomeInovation";
import OverOns from "../pages/OverOns/OverOns";
import VSDashboard from "../pages/VakspecialistDashboard/VSDashboard";
import SpecialistProfile from "../pages/SpecialistProfilePage/SpecialistProfile";
import EditProfile from "../pages/EditProfilePage/EditProfile";
import DetailJobPage from "../pages/DetailJobPage/DetailJobPage";
import MijnKlussenOverzichtPage from "../pages/MijnKlussenOverzichtPage/MijnKlussenOverzichtPage";
import VSMijnklussen from "../pages/VakspecialistMijnKlussen/VSMijnklussen";
import "./App.css";
import ChatContactList from "../components/Chat/ChatContactList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mijn-klussen" element={<MyTaskPage />} />
      <Route path="/klussen" element={<KlussenPage />} />
      <Route path="/klussen/lekkages-repareren" element={<KlussenPage />} />
      <Route path="/klussen/sanitair-installeren" element={<KlussenPage />} />
      <Route path="/klussen/tuinontwerp-maken" element={<KlussenPage />} />
      <Route path="/wachtwoord-vergeten" element={<WachtwoordVergetenPage />} />
      <Route path="/bevestig-email" element={<BevestigEmailPage />} />
      <Route path="/huiseigenaar-resultaat" element={<DashboardPage />} />
      <Route path="/inschrijven-als-specialist" element={<SpecialistPage />} />
      <Route path="/specialist-resultaat" element={<ResultsPage />} />
      <Route path="/over-ons" element={<AboutUsPage />} />
      <Route path="/hoe-werkt-het" element={<HowItWorksPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/MijnKlussen" element={<MijnKlussen />} />
      <Route path="/HomeInovation" element={<HomeInovation />} />
      <Route path="/VSDashboard" element={<VSDashboard />} />
      <Route path="/SpecialistProfile" element={<SpecialistProfile />} />
      <Route path="/EditProfileSection" element={<EditProfile />} />
      <Route path="/DetailJob" element={<DetailJobPage />} />
      <Route path="/MijnKlussenOverzicht" element={<MijnKlussenOverzichtPage />} />
      <Route path="/OverOns" element={<OverOns />} />


      <Route path="/VSMijnklussen" element={<VSMijnklussen />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/registreer" element={<RegisterPage />} />

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

      <Route path="/chat" element={<ChatPage />} />

      {/* Protected routes */}
      <Route
        path="/admin-paneel"
        element={
          <ProtectedRoute
            allowedRoles={["Admin"]}
            page={<AdminSideBar />}
            redirectTo="/"
          />
        }
      >
        <Route index element={<AdminMain />} />
        <Route path="manage-users" element={<ManageUser />} />
      </Route>

      <Route
        path="/dashboard-huiseigenaar"
        element={
          <ProtectedRoute
            allowedRoles={["Homeowner"]}
            page={<HomeOwnerDashboard />}
            redirectTo="/"
          />
        }
      />
      <Route
        path="/dashboard-professional"
        element={
          <ProtectedRoute
            allowedRoles={["Professional"]}
            page={<ProfessionalDashboard />}
            redirectTo="/"
          />
        }
      />
    </Routes>
  );
};

export default App;
