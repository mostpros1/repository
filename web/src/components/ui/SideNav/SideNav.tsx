import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  HandymanOutlined as HandymanOutlinedIcon,
  Message as MessageIcon,
  DateRange as DateRangeIcon,
  Payment as PaymentIcon,
  StarOutline as StarOutlineIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  HelpOutline as HelpOutlineIcon,
} from "@mui/icons-material";
import { MdOutlinePhonelinkSetup } from "react-icons/md";
import { MdOutlinePointOfSale } from "react-icons/md";
import { useUser } from "../../../context/UserContext";
import "./SideNav.css";
import { useUserType } from "../../../useUserTypeContext";
import { Auth } from "aws-amplify";
import Stripe from "stripe";
import AWS from "aws-sdk";

interface UserState {
  isProfessional: boolean;
  setIsProfessional: (value: boolean) => void;
  isHomeowner: boolean;
  setIsHomeowner: (value: boolean) => void;
}

const SideNav = () => {
  const { isProfessional, setIsProfessional, setIsHomeowner } =
    useUserType() as UserState;

  const { user } = useUser();
  const navigate = useNavigate();
  const { lang } = useParams(); // Extract the lang parameter
  //const [isProfessional, setIsProfessional] = useState(false);
  //const [isHomeowner, setIsHomeowner] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const checkUserRole = async () => {
      const dashboardPaths = [
        `/${lang}/pro-dashboard/`,
        `/${lang}/homeowner-dashboard/`,
      ];
      const isFromDashboard = dashboardPaths.some((path) =>
        location.pathname.includes(path)
      );

      if (!isFromDashboard) {
        // Check if user is authenticated
        if (user?.signInUserSession?.accessToken?.payload) {
          const groups =
            user.signInUserSession.accessToken.payload["cognito:groups"];
          if (groups?.includes("Homeowner")) {
            setIsHomeowner(true);
            setIsProfessional(false);
          } else if (groups?.includes("Professional")) {
            setIsProfessional(true);
            setIsHomeowner(false);
          }
        } else {
          // User is not logged in, redirect to login page
          console.log("User is not logged in!");
          navigate(`/${lang}/login`);
        }
      } else {
        // User is on a dashboard path
        const isHomeownerDashboard = location.pathname.includes(
          `/${lang}/homeowner-dashboard/`
        );
        const isProDashboard = location.pathname.includes(
          `/${lang}/pro-dashboard/`
        );

        if (isHomeownerDashboard) {
          setIsHomeowner(true);
          setIsProfessional(false);
        } else if (isProDashboard) {
          setIsProfessional(true);
          setIsHomeowner(false);
        }
      }
    };
    ("?");
    // Call the function when dependencies change
    checkUserRole();
  }, [
    user,
    location.pathname,
    lang,
    setIsHomeowner,
    setIsProfessional,
    navigate,
  ]);

  // const comingSoonTabs = [
  //   { path: "revenues", label: "Inkomsten" },
  //   { path: "occupancy-ahr", label: "Bezettingsgraad" },
  //   { path: "screening", label: "Screening" },
  // ];

  const stripeSignUp = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userEmail = user.attributes.email;
      const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
        apiVersion: "2023-10-16",
      });

      const stripeAccount = await stripe.accounts.create({
        type: "standard",
        email: userEmail,
        country: "NL",
      });

      const cognitoClient = new AWS.CognitoIdentityServiceProvider();
      await cognitoClient
        .adminUpdateUserAttributes({
          UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
          Username: userEmail,
          UserAttributes: [
            { Name: "custom:stripeAccountId", Value: stripeAccount.id },
          ],
        })
        .promise();

      const result = await stripe.accountLinks.create({
        account: stripeAccount.id,
        type: "account_onboarding",
        refresh_url: `${window.location.origin}/nl/payments/onboarding-failed`,
        return_url: `${window.location.origin}/nl/homeowner-dashboard/payments`,
      });

      window.location.href = result.url;
    } catch (err) {
      console.error(err);
      console.log("Kon geen verbinding maken met Stripe");
    }
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {isProfessional ? (
          <>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link" : "sidebar-link"
                }
              >
                <DashboardIcon />
                Dashboard
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard/calender`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <DateRangeIcon />
                Kalender
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard/jobs`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <HandymanOutlinedIcon />
                Klussen
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard/chat`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <MessageIcon />
                Berichten
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard/reporting`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <PaymentIcon />
                Reporting
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard/setup`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <MdOutlinePhonelinkSetup />
                Setup
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard/profile`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <AccountCircleIcon />
                Profiel
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard/settings`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <SettingsIcon />
                Instellingen
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/help`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <HelpOutlineIcon />
                Help
              </NavLink>
            </li>
            {/* <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard/promocode`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <MdOutlinePointOfSale />
                Promo codes
              </NavLink>
            </li> */}
            {/* {comingSoonTabs.map((tab) => (
              <li className="sidebar-item coming-soon" key={tab.path}>
                <div className="sidebar-link">
                  <StarOutlineIcon />
                  {tab.label}
                  <div className="coming-soon-tooltip">Binnenkort online</div>
                </div>
              </li>
            ))} */}
            
            <button className="ProPaymentsButtonSideNav" onClick={stripeSignUp}>
              Verbind met Stripe
            </button>
          </>
        ) : (
          <>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/homeowner-dashboard/jobs`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <HandymanOutlinedIcon />
                Klussen
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/homeowner-dashboard/chat`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <MessageIcon />
                Berichten
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/homeowner-dashboard/payments`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <PaymentIcon />
                Betalingen
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/homeowner-dashboard/reviews`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <StarOutlineIcon />
                Reviews
              </NavLink>
            </li>
            <div className="sidebar-bottom">
              <li className="sidebar-item">
                <NavLink
                  to={`/${lang}/homeowner-dashboard/profile`}
                  className={({ isActive }) =>
                    isActive ? "sidebar-link active" : "sidebar-link"
                  }
                >
                  <AccountCircleIcon />
                  Profiel
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  to={`/${lang}/homeowner-dashboard/settings`}
                  className={({ isActive }) =>
                    isActive ? "sidebar-link active" : "sidebar-link"
                  }
                >
                  <SettingsIcon />
                  Instellingen
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  to={`/${lang}/help`}
                  className={({ isActive }) =>
                    isActive ? "sidebar-link active" : "sidebar-link"
                  }
                >
                  <HelpOutlineIcon />
                  Help
                </NavLink>
              </li>
            </div>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideNav;
