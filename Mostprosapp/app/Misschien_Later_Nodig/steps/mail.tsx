import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

export type MailData = {
  mail: string;
};

type InfoFormPropsTwo = MailData & {
  updateFields: (fields: Partial<MailData>) => void;
};

export function MailForm({ mail, updateFields }: InfoFormPropsTwo) {
  return (
    <View>
      <Text>Voer je postcode in om klussen in jouw omgeving te vinden.</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => updateFields({ mail: text })}
        placeholder="Enter your email"
        value={mail}
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
