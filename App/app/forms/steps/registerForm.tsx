import React from "react";
import { Link } from "expo-router";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type registerData = {
  email: string;
  password: string;
};

type registerFormProps = registerData & {
  updateFields: (fields: Partial<registerData>) => void;
};

export function RegisterForm({
  email,
  password,
  updateFields,
}: registerFormProps) {
  return (
    <View style={styles.formContainer}>
      <View>
        <Text></Text>
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
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => updateFields({ password: text })}
          placeholder="Enter your email"
          value={password}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => updateFields({ password: text })}
          placeholder="Enter your email"
          value={password}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => updateFields({ password: text })}
          placeholder="Enter your email"
          value={password}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => updateFields({ password: text })}
          placeholder="Enter your email"
          value={password}
        />
      </View>
      <Text>
        Nog geen account? <Text>account aanmaken</Text>
      </Text>
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
});
