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
import ProfilePrivacy from "./(Components)/Profile/ProfilePrivacy";
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

        {/* <Stack.Screen name="" component={} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;