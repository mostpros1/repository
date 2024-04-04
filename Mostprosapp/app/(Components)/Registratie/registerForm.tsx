import React from "react";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type registerData = {
  voornaam: string;
  achternaam: string;
  email: string;
  telefoonNummer: string;
  password: string;
};

type registerFormProps = registerData & {
  updateFields: (fields: Partial<registerData>) => void;
};

export function RegisterForm({
  voornaam,
  achternaam,
  email,
  telefoonNummer,
  password,
  updateFields,
}: registerFormProps) {
  return (
    <View style={styles.formContainer}>
      <View>
        <Text>Voornaam</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => updateFields({ voornaam: text })}
          placeholder="Voer uw voornaam in:"
          value={voornaam}
          keyboardType="email-address"
        />
      </View>
      <View>
        <Text>Achternaam</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => updateFields({ achternaam: text })}
          placeholder="Voer uw achternaam in:"
          value={achternaam}
        />
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => updateFields({ email: text })}
          placeholder="Voer uw email in:"
          value={email}
        />
        <Text>Telefoon Nummer</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => updateFields({ telefoonNummer: text })}
          placeholder="Voer uw telefoon nummer in:"
          value={telefoonNummer}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => updateFields({ password: text })}
          placeholder="Vul uw wachtwoord in:"
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
