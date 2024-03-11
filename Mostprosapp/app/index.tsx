import React from "react";
import { registerRootComponent } from "expo";
import App from "./App";
import { Amplify, Auth,} from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);
Auth.configure(awsExports);
const Root = () => <App />;

registerRootComponent(Root);
