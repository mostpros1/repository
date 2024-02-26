import React from "react";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";

type postcodeData = {
  input: string;
};

type postcodeFormProps = postcodeData & {
  updateFields: (fields: Partial<postcodeData>) => void;
};

export function PostcodeForm({ input, updateFields }: postcodeFormProps) {
  return (
    <View>
      <Text>Voer je postcode in om klussen in jouw omgeving te vinden.</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => updateFields({ input: text })}
        placeholder="Enter your email"
        value={input}
        keyboardType="email-address"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: "100%",
  },
});
