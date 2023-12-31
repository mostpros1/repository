import React from "react";
import LandingPage from "./LandingPage";
import KeuzePage from "./(Components)/keuze";
import howItWorksOneHomeowner from "./(Components)/(Homeowner)/howItWorksOneHomeowner";
import howItWorksTwoHomeowner from "./(Components)/(Homeowner)/howItWorksTwoHomeowner";
import howItWorksThreeHomeowner from "./(Components)/(Homeowner)/howItWorksThreeHomeowner";
import howItWorksOneSpecialist from "./(Components)//(Specialist)/howItWorksOneSpecialist";
import howItWorksTwoSpecialist from "./(Components)/(Specialist)/howItWorksTwoSpecialist";
import howItWorksThreeSpecialist from "./(Components)/(Specialist)/howItWorksThreeSpecialist";
import Register from "./(Components)/(forms)/register";
import Login from "./(Components)/(forms)/login";
import Home from "./(Components)/(tabs)/home";
// import Verify from "./(Components)/(forms)/Verification";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);


const App = () => {
//   type RootStackParamList = {
//     LandingPage: undefined;
//     KeuzePage: undefined;
//     HowItWorksOneHomeowner: undefined;
//     HowItWorksTwoHomeowner: undefined;
//     HowItWorksThreeHomeowner: undefined;
//     HowItWorksOneSpecialist: undefined;
//     HowItWorksTwoSpecialist: undefined;
//     HowItWorksThreeSpecialist: undefined;
//     Home: undefined;
//     Register: undefined;
//     Login: undefined;
//   };
//   const Stack = createNativeStackNavigator<RootStackParamList>();
//   type Screen1NavigationProp = StackNavigationProp<
//     RootStackParamList,
//     "Screen1"
//   >;
//   type Screen1RouteProp = RouteProp<RootStackParamList, "Screen1">;

//   type Screen2NavigationProp = StackNavigationProp<
//     RootStackParamList,
//     "Screen2"
//   >;
//   type Screen2RouteProp = RouteProp<RootStackParamList, "Screen2">;
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="LandingPage"
//         screenOptions={{ headerShown: false }}
//       >
//         <Stack.Screen name="LandingPage" component={LandingPage} />
//         <Stack.Screen name="KeuzePage" component={KeuzePage} />
//         <Stack.Screen
//           name="howItWorksOneHomeowner"
//           component={howItWorksOneHomeowner}
//         />
//         <Stack.Screen
//           name="howItWorksTwoHomeowner"
//           component={howItWorksTwoHomeowner}
//         />
//         <Stack.Screen
//           name="howItWorksThreeHomeowner"
//           component={howItWorksThreeHomeowner}
//         />
//         <Stack.Screen
//           name="howItWorksOneSpecialist"
//           component={howItWorksOneSpecialist}
//         />
//         <Stack.Screen
//           name="howItWorksTwoSpecialist"
//           component={howItWorksTwoSpecialist}
//         />
//         <Stack.Screen
//           name="howItWorksThreeSpecialist"
//           component={howItWorksThreeSpecialist}
//         />
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Register" component={Register} />
//         <Stack.Screen name="Login" component={Login} />
//         {/* <Stack.Screen name="Verify" component={Verify} /> */}
//         {/* <Stack.Screen name="" component={} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
};

export default App;
