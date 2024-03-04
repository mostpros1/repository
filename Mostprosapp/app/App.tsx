import React from "react";
import Home from "./(Components)/Home/home";
import TestHome from "./(Components)/Home/TestHome";
import ProfileNavigation from "./(Components)/Profile/ProfileNavigation";
import ChatNavigation from "./(Components)/Chat/ChatNavigation";
import SpecialistNavigation from "./(Components)/Specialist/SpecialistNavigation";
import HomeOwnerNavigation from "./(Components)/Homeowner/HomeOwnerNavigation";
import LandingPage from "./LandingPage";
import KeuzePage from "./(Components)/Home/keuze";
import HowItWorksOneHomeowner from "./(Components)/Homeowner/HowItWorksOneHomeowner";
import HowItWorksTwoHomeowner from "./(Components)/Homeowner/HowItWorksTwoHomeowner";
import HowItWorksThreeHomeowner from "./(Components)/Homeowner/HowItWorksThreeHomeowner";
import HowItWorksOneSpecialist from "./(Components)/Specialist/HowItWorksOneSpecialist";
import HowItWorksTwoSpecialist from "./(Components)/Specialist/HowItWorksTwoSpecialist";
import HowItWorksThreeSpecialist from "./(Components)/Specialist/HowItWorksThreeSpecialist";
import Register from "./(Components)/Registratie/Register";
import Login from "./(Components)/Login/Login";
import Verify from "./(Components)/Verificatie/Verification";
import Profile from "./(Components)/Profile/Profile";
import ProfileSettings from "./(Components)/Profile/ProfileSecurity";
import ProfileSecurity from "./(Components)/Profile/ProfileSecurity";
import HomeOwnerResults from "./(Components)/Homeowner/HomeOwnerResults";
import ProfileSettingsOne from "./(Components)/Profile/ProfileSettingsOne"
import ProfileSettingsTwo from "./(Components)/Profile/ProfileSettingsTwo";
import ProfileNotifications from "./(Components)/Profile/ProfileNotifications";
import ProfileGeneralSettings from "./(Components)/Profile/ProfileGeneralSettings";
import ChatOverview from "./(Components)/Chat/ChatOverview";
import HomePageSpecialist from "./(Components)/Specialist/HomePageSpecialist";
import HomeOwnerCreate from "./(Components)/Homeowner/HomeOwnerCreate";
import HomeOwnerPostalCode from "./(Components)/Homeowner/HomeOwnerPostalCode";
import HomeOwnerEmail from "./(Components)/Homeowner/HomeOwnerEmail";
import HomeOwnerAppLoodgieter from "./(Components)/Homeowner/HomeOwnerAppLoodgieter";
import HomeOwnerAppHovenier from "./(Components)/Homeowner/HomeOwnerAppHovenier";
import HomeOwnerAppDakdekker from "./(Components)/Homeowner/HomeOwnerAppDakdekker";
import HomeOwnerAppSchoonmaker from "./(Components)/Homeowner/HomeOwnerAppSchoonmaker";
import HomeOwnerAppAannemer from "./(Components)/Homeowner/HomeOwnerAppAannemer";
import HomeOwnerAppElektricien from "./(Components)/Homeowner/HomeOwnerAppElektricien";
import HomeOwnerAppAI_home_adviseur from "./(Components)/Homeowner/HomeOwnerAppAI-home-adviseur";
import HomeOwnerAppBadkamerspecialist from "./(Components)/Homeowner/HomeOwnerAppBadkamerspecialist";
import PostalCodeSpecialist from "./(Components)/Specialist/PostalCodeSpecialist";
import GegevensSpecialist from "./(Components)/Specialist/GegevensSpecialist";
import HomeOwnerExtraInfo from "./(Components)/Homeowner/HomeOwnerExtraInfo";
import OmgevingSpecialist from "./(Components)/Specialist/OmgevingSpecialist";
import CompanySituation1 from "./(Components)/Specialist/CompanySituation1";
import CompanySituation2 from "./(Components)/Specialist/CompanySituation2";
import CompanySituation3 from "./(Components)/Specialist/CompanySituation3";
import ProfilePrivacy from "./(Components)/Profile/ProfilePrivacy";
import DateAndTimePicker from "./(Components)/Specialist/DateAndTimePicker";
import ProfileAbout from "./(Components)/Profile/ProfileAbout";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);
import { RootStackParamList } from "./types";

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="LandingPage"
        screenOptions={{ headerShown: false }} 
      >
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="KeuzePage" component={KeuzePage} />
        <Stack.Screen
          name="HowItWorksOneHomeowner"
          component={HowItWorksOneHomeowner}
        />
        <Stack.Screen
          name="HowItWorksTwoHomeowner"
          component={HowItWorksTwoHomeowner}
        />
        <Stack.Screen
          name="HowItWorksThreeHomeowner"
          component={HowItWorksThreeHomeowner}
        />
        <Stack.Screen
          name="HowItWorksOneSpecialist"
          component={HowItWorksOneSpecialist}
        />
        <Stack.Screen
          name="HowItWorksTwoSpecialist"
          component={HowItWorksTwoSpecialist}
        />
        <Stack.Screen
          name="HowItWorksThreeSpecialist"
          component={HowItWorksThreeSpecialist}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TestHome" component={TestHome}/>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ProfileSecurity" component={ProfileSecurity} />
        <Stack.Screen name="ProfileSettingsOne" component={ProfileSettingsOne} />
        <Stack.Screen name="ProfileNotifications" component={ProfileNotifications} />
        <Stack.Screen name="ProfileSettingsTwo" component={ProfileSettingsTwo}/>
        <Stack.Screen name="ProfileGeneralSettings" component={ProfileGeneralSettings}/>
        <Stack.Screen name="ChatOverview" component={ChatOverview}/>
        <Stack.Screen name="HomePageSpecialist" component={HomePageSpecialist}/>
        <Stack.Screen name="ProfilePrivacy" component={ProfilePrivacy}/>
        <Stack.Screen name="ProfileAbout" component={ProfileAbout}/>
        <Stack.Screen name="ProfileNavigation" component={ProfileNavigation}/>
        <Stack.Screen name="SpecialistNavigation" component={SpecialistNavigation}/>
        <Stack.Screen name="ChatNavigation" component={ChatNavigation}/>
        <Stack.Screen name="HomeOwnerNavigation" component={HomeOwnerNavigation}/>
        <Stack.Screen name="HomeOwnerResults" component={HomeOwnerResults}/>
        <Stack.Screen name="HomeOwnerCreate" component={HomeOwnerCreate}/>
        <Stack.Screen name="HomeOwnerPostalCode" component={HomeOwnerPostalCode}/>
        <Stack.Screen name="HomeOwnerAppLoodgieter" component={HomeOwnerAppLoodgieter}/>
        <Stack.Screen name="HomeOwnerAppHovenier" component={HomeOwnerAppHovenier}/>
        <Stack.Screen name="HomeOwnerAppDakdekker" component={HomeOwnerAppDakdekker}/>
        <Stack.Screen name="HomeOwnerAppSchoonmaker" component={HomeOwnerAppSchoonmaker}/>
        <Stack.Screen name="HomeOwnerAppAannemer" component={HomeOwnerAppAannemer}/>
        <Stack.Screen name="HomeOwnerAppElektricien" component={HomeOwnerAppElektricien}/>
        <Stack.Screen name="HomeOwnerEmail" component={HomeOwnerEmail}/>
        <Stack.Screen name="HomeOwnerExtraInfo" component={HomeOwnerExtraInfo}/>
        <Stack.Screen name="HomeOwnerAppAI_home_adviseur" component={HomeOwnerAppAI_home_adviseur}/>
        <Stack.Screen name="HomeOwnerAppBadkamerspecialist" component={HomeOwnerAppBadkamerspecialist}/>
        <Stack.Screen name="PostalCodeSpecialist" component={PostalCodeSpecialist}/>
        <Stack.Screen name="GegevensSpecialist" component={GegevensSpecialist} />
        <Stack.Screen name="OmgevingSpecialist" component={OmgevingSpecialist} />
        <Stack.Screen name="CompanySituation1" component={CompanySituation1} />
        <Stack.Screen name="CompanySituation2" component={CompanySituation2}/>
        <Stack.Screen name="CompanySituation3" component={CompanySituation3} />
        <Stack.Screen name="DateAndTimePicker" component={DateAndTimePicker}/>
        
        {/* <Stack.Screen name="" component={} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;