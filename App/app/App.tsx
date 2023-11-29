import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import routerTry from "./routerTry";
import routerTryTwo from "./routerTryTwo";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="routerTry">
        <Stack.Screen name="routerTry" component={routerTry} />
        <Stack.Screen name="routerTryTwo" component={routerTryTwo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
