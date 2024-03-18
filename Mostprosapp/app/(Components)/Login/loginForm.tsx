import React from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { Dimensions } from "react-native";

import { Dispatch, SetStateAction } from "react";
// import facebook from '../../../../assets/images/facebook_.svg';
// import google from '../../assets/google_.svg';
// import instagram from '../../assets/instagram_.svg';
// import { Link } from 'react-router-dom';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type LoginData = {
  email: string;
  password: string;
};

type LoginFormProps = LoginData & {
  updateFields: (fields: Partial<LoginData>) => void;
  setUserExists: Dispatch<SetStateAction<boolean>>;
  handleLogin: () => void;
};

export function LoginForm({
  email,
  password,
  updateFields,
  setUserExists,
  handleLogin,
}: LoginFormProps) {
  return (
    <>
      <View style={styles.view}>
        {/* <Text>Login om vakspecialist te vinden</Text> */}
        <Image
              style={styles.image}
              source={require("../../../assets/images/logo2.png")}
            />
        <View>
          <View>
            <Text style={styles.inputTitle}>Email</Text>
            <Pressable style={styles.containerInput}>
              <TextInput
                placeholder="Bijv. joe@hotmail.com"
                value={email}
                onChangeText={(text) => updateFields({ email: text })}
              />
            </Pressable>
            <Text style={styles.inputTitle}>Wachtwoord</Text>
            <Pressable style={styles.containerInput}>
              <TextInput
                placeholder="Wachtwoord"
                value={password}
                onChangeText={(text) => updateFields({ password: text })}
              />
            </Pressable>
          </View>
          <View style={styles.accountWrapper}>
            <Text>
              Nog geen account?{" "}
              <Pressable onPress={() => setUserExists(false)}>
                <Text style={styles.clickableBlue}>Account aanmaken</Text>
              </Pressable>
            </Text>
          </View>
          {/* <Link className='login-link' to="/wachtwoord-vergeten">Wachtwoord vergeten?</Link> */}
        </View>
        <View>
          <View style={styles.line}></View>
          <View style={styles.loginbuttonsWrapper}>
            <Text>Of login met onderstaande opties</Text>
            <View style={styles.loginbuttonsWrapperTwo}>
            <Image
              style={styles.image}
              source={require("../../../assets/images/facebook.png")}
            />
            <Image
              style={styles.image}
              source={require("../../../assets/images/google.png")}
            />
            <Image
              style={styles.image}
              source={require("../../../assets/images/insta.png")}
            />
            </View>
            {/* <View><img src={facebook} alt="" />Facebook</View> */}
            {/* <View><img src={google} alt="" />Gmail</View>
            <View><img src={instagram} alt="" />Instagram</View> */}
          </View>
        </View>

        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonTitle}>Inloggen</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    height: windowHeight,
    width: windowWidth,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {},

  loginbuttonsWrapper: {
    width: windowWidth - 130,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  loginbuttonsWrapperTwo: {
    width: windowWidth - 130,
    padding: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },

  line: {
    width: windowWidth - 130,
    marginTop: 20,
    marginBottom: 20,
    height: 3,
    borderRadius: 1,
    backgroundColor: "#A6ACB2",
  },

  buttonTitle: {
    color: "white",
  },
  loginButton: {
    backgroundColor: "#318ae5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: windowWidth - 130,
    borderRadius: 13,
  },

  accountWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  clickableBlue: {
    color: "#1679fe",
    textDecorationLine: "underline",
  },

  inputTitle: {
    fontSize: 17,
  },

  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#f5f5f9",
    backgroundColor: "#f9f9f8",
    height: 60,
    borderRadius: 10,
    padding: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 15,
    marginBottom: 15,
  },
});
