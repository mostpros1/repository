import React from "react";
import { registerRootComponent } from "expo";
import { AppRegistry } from "react-native";
import App from "./App";

const Root = () => <App />;

registerRootComponent(Root);
