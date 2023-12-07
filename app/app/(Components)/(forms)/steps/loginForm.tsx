import React from "react";
import { Link } from "expo-router";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type loginData = {
  email: string;
  password: string;
};

type loginFormProps = loginData & {
  updateFields: (fields: Partial<loginData>) => void;
};

export function LoginForm({ email, password, updateFields }: loginFormProps) {
  return (
    <View style={styles.formContainer}>
      <View>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => updateFields({ email: text })}
          placeholder="Enter your email"
          value={email}
          keyboardType="email-address"
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => updateFields({ password: text })}
          placeholder="Enter your email"
          value={password}
        />
      </View>
      <View>
        <Text>
          Nog geen account?{" "}
          <Link style={styles.link} href="../register">
            account aanmaken
          </Link>
        </Text>

        <Link style={styles.link} href="../register">
          Inschrijven als professional
        </Link>
      </View>
      <View style={styles.alternativeLogin}>
        <Text>Of</Text>
        <View style={styles.loginIcons}>
          <Image
            style={styles.icon}
            source={require("../../../../assets/images/icon_facebook.png")}
          ></Image>
          <Image
            style={styles.icon}
            source={require("../../../../assets/images/icon_google.png")}
          ></Image>
          <Image
            style={styles.icon}
            source={require("../../../../assets/images/icon_instagram.png")}
          ></Image>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  formContainer: {
    width: windowWidth,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    height: 60,
    width: windowWidth * 0.8,
  },
  alternativeLogin: {
    width: windowWidth * 0.8,
    borderTopWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  loginIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    margin: 10,
  },
});
