import { useEffect, FormEvent, useState } from "react";
import { useAppForm } from "../../hooks/useAppForm";
import { LoginForm } from "./loginForm";
// import { useUser } from '../../context/UserContext';
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { Dimensions } from "react-native";
import { Auth } from "aws-amplify";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type AppFormData = {
  email: string;
  password: string;
};
const INITIAL_DATA: AppFormData = {
  email: "",
  password: "",
};

function LoginPage({navigation}) {
  // const { updateUser } = useUser();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  
  const handleLogin = async () => {
    try {
      const authenticatedUser = await Auth.signIn(loginData.email, loginData.password);
      navigation.navigate("Home");
      console.log('Logged in user:', authenticatedUser);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const updateLoginData = (fields) => {
    setLoginData((prevData) => ({ ...prevData, ...fields }));
  };

  return (
    <>
      
      <View>
        <View>
          <LoginForm {...loginData} updateFields={updateLoginData} setUserExists={() => {}} handleLogin={handleLogin} />
        </View>
      </View>
    </>
  );
}

export default LoginPage;
