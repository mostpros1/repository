import React from "react";
import Home from "./(Components)/Home/home";
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
import ProfileSettingsOne from "./(Components)/Profile/ProfileSettingsOne"
import ProfileSettingsTwo from "./(Components)/Profile/ProfileSettingsTwo";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);
import { RootStackParamList } from "./types";
import ProfileSecurity from "./(Components)/Profile/ProfileSecurity";

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
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ProfileSecurity" component={ProfileSecurity} />
        <Stack.Screen name="ProfileSettingsOne" component={ProfileSettingsOne} />
        <Stack.Screen
          name="ProfileSettingsTwo"
          component={ProfileSettingsTwo}
        />
        {/* <Stack.Screen name="" component={} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
