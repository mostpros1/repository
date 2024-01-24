import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export type ExtraInfoData = {
  extraInfo: string;
};

type ExtraInfoFormProps = ExtraInfoData & {
  updateFields: (fields: Partial<ExtraInfoData>) => void;
};

export function InfoFormThree({ extraInfo, updateFields }: ExtraInfoFormProps) {
  return (
    <View>
      <Text>Aanvullende informatie (niet verplicht)</Text>
      <Text>Deel hier a.u.b. niet je contactgegevens. </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => updateFields({ extraInfo: text })}
        placeholder="Beschrijf je klus hier met aanvullende informatie denk aan eventuele schade, enz."
        value={extraInfo}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    width: windowWidth * 0.9,
    padding: 10,
    height: 250,
  },
});
