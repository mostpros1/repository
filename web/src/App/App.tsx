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
import HomeOwnerDashboard from "../pages/HomeOwnerDashboard/HomeOwnerDashboard";
import ProfessionalDashboard from "../pages/ProfessionalDashboard/ProfessionalDashboard";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import "./App.css";

const App = () => {
    const [userGroup, setUserGroup] = useState<string[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        const checkAuthState = async () => {
            try {
                const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
                setUserGroup(groups);
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        
        if (user) {
            checkAuthState();
        }
    }, [user]);

    useEffect(() => {
        console.log("User Group:", userGroup);
        console.log(isAuthenticated);
    }, [userGroup]);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mijn-klussen" element={<MyTaskPage />} />
            <Route path="/klussen" element={<KlussenPage />} />
            <Route path="/klussen/lekkages-repareren" element={<KlussenPage />} />
            <Route path="/klussen/sanitair-installeren" element={<KlussenPage />} />
            <Route path="/klussen/tuinontwerp-maken" element={<KlussenPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registreer" element={<RegisterPage />} />
            <Route path="/wachtwoord-vergeten" element={<WachtwoordVergetenPage />} />
            <Route path="/bevestig-email" element={<BevestigEmailPage />} />
            <Route path="/huiseigenaar-resultaat" element={<DashboardPage />} />
            <Route path="/inschrijven-als-specialist" element={<SpecialistPage />} />
            <Route path="/specialist-resultaat" element={<ResultsPage />} />
            <Route path="/over-ons" element={<AboutUsPage />} />
            <Route path="/hoe-werkt-het" element={<HowItWorksPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {isAuthenticated && userGroup.includes('Homeowner') && (
               <Route path="/dashboard-huiseigenaar" element={<HomeOwnerDashboard />} /> 
            )}
            {isAuthenticated && userGroup.includes('Professional') && (
                <Route path="/dashboard-professional" element={<ProfessionalDashboard />} />
            )} 
            <Route path="/admin-paneel" element={<AdminSideBar />} >
                <Route index element={<AdminMain />} />
                <Route path="manage-users" element={<ManageUser />} />
            </Route>
            <Route path="/chat" element={<ChatPage />} />
        </Routes>
    )
}

export default App;