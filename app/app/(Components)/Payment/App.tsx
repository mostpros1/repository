import React from "react";
import LandingPage from "./LandingPage";
import KeuzePage from "./(Components)/keuze";
import HowItWorksOneHomeowner from "./(Components)/(Homeowner)/howItWorksOneHomeowner";
import HowItWorksTwoHomeowner from "./(Components)/(Homeowner)/howItWorksTwoHomeowner";
import HowItWorksThreeHomeowner from "./(Components)/(Homeowner)/howItWorksThreeHomeowner";
import HowItWorksOneSpecialist from "./(Components)/(Specialist)/howItWorksOneSpecialist";
import HowItWorksTwoSpecialist from "./(Components)/(Specialist)/howItWorksTwoSpecialist";
import HowItWorksThreeSpecialist from "./(Components)/(Specialist)/howItWorksThreeSpecialist";
import Register from "./(Components)/(forms)/register";
import Login from "./(Components)/(forms)/login";
import Home from "./(Components)/(tabs)/home";
import Verify from "./(Components)/(forms)/Verification";
import Profile from "./(Components)/(tabs)/Profile";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { RootStackParamList } from "./types";
Amplify.configure(awsconfig);
import DateAndTimePicker from "./(Components)/Booking/Calender";
import PaymentLink from "./(Components)/Payment/Payments";
import ChatMain from "./(Components)/Chat/ChatMain";
import ChatOverview from "./(Components)/Chat/ChatNavigation";
import ChatNavigation from "./(Components)/Chat/ChatNavigation";
import Footer from "./(Components)/footer";

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
        <Stack.Screen name="DateAndTimePicker" component={DateAndTimePicker} />
        <Stack.Screen name="PaymentLink" component={PaymentLink} />
        <Stack.Screen name="ChatMain" component={ChatMain} />
        <Stack.Screen name="ChatOverview" component={ChatOverview} />
        <Stack.Screen name="ChatNavigation" component={ChatNavigation} />
        <Stack.Screen name="Footer" component={Footer} />
        {/* <Stack.Screen name="" component={} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
