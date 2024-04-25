import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Pressable,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { Dimensions } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CompanyKvk = ({ navigation }) => {
  const [kvkNumber, setKvkNumber] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleRegister = () => {
    if (kvkNumber.length !== 8) {
      Alert.alert(
        "Ongeldig KVK Nummer",
        "Zorg ervoor dat je het 8-cijferig KvK nummer invoert."
      );
    } else if (companyName.trim() === "") {
      Alert.alert(
        "Bedrijfsnaam vereist",
        "Voer alstublieft de bedrijfsnaam in."
      );
    } else {
      navigation.navigate("SpecialistResults");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}></View>
            <Pressable
              style={styles.crossCircle}
              onPress={() => navigation.navigate("SpecialistNavigation")}
            >
              <Text style={styles.crossTitle}>X</Text>
            </Pressable>
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Bedrijf-situatie</Text>
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>
              Hoeveel personen zijn er werkzaam in jouw bedrijf?
            </Text>
          </View>

          <View style={styles.beroepContainer}>
            <Text style={styles.beroepTitle}>Bedrijf naam:</Text>
            <Pressable style={styles.containerInput}>
              <TextInput
                testID="bedrijfInput"
                placeholder="Bedrijf naam:"
                style={styles.input}
                value={companyName}
                onChangeText={setCompanyName}
              />
            </Pressable>
            <Text style={styles.beroepTitle}>KvK nummer: </Text>
            <Pressable style={styles.containerInput}>
              <TextInput
                testID="kvkInput"
                placeholder="Uw Kvk nummer:"
                style={styles.input}
                keyboardType="numeric"
                maxLength={8}
                value={kvkNumber}
                onChangeText={setKvkNumber}
              />
              <Icon name="info" size={23} color="#308AE4" />
            </Pressable>

            <Pressable
              testID="geenKvk"
              style={styles.blueTitleContainer}
              onPress={() => navigation.navigate("NoKvKInfo")}
            >
              <Text style={styles.blueTitle}>Ik heb geen KVK-nummer</Text>
            </Pressable>
          </View>

          <View style={styles.buttonsContainer}>
            <Pressable
              testID="vorigeBtn-7"
              style={[styles.nextButton, styles.nextButtonColorOne]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.nextButtonText}>Vorige</Text>
            </Pressable>
            <Pressable testID="volgendeBtn-8" style={[styles.nextButton]} onPress={handleRegister}>
              <Text style={[styles.nextButtonText, styles.whiteButtonText]}>
                Inschrijven
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight - 100,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 0.3,
    backgroundColor: "lightgray",
    height: 60,
    borderRadius: 10,
    padding: 10,
    width: "75%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 15,
    marginBottom: 15,
  },

  beroepContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    paddingTop: 50,
    paddingBottom: 30,
  },

  beroepTitle: {
    textAlign: "left",
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    display: "flex",
  },

  blueTitleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#63A7EB",
  },
  blueTitle: {
    color: "#63A7EB",
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  pressableContainer: {
    width: windowWidth - 20,
    height: 60,
    paddingRight: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E9F4FF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  checkbox: {
    position: "absolute",
    top: 20,
    right: 10,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
  },
  checkboxSelected: {
    backgroundColor: "#308be5",
  },

  scrollViewContainer: {
    flexGrow: 1,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
  },
  crossCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#318ae5",
    alignItems: "center",
    justifyContent: "center",
  },
  crossTitle: {
    color: "#fefffe",
    fontSize: 20,
    fontWeight: "bold",
  },
  titleBox: {
    alignItems: "center",
    paddingTop: 40,
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    color: "#010100",
    textAlign: "center",
    fontSize: 16,
  },
  titleLight: {
    color: "#202121",
    textAlign: "center",
    fontSize: 15,
    width: 300,
  },

  bottomButtonsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonsContainer: {
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
  },

  nextButton: {
    backgroundColor: "#318ae5",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: "center",
    width: 170,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  nextButtonColorOne: {
    backgroundColor: "#fffefe",
    borderWidth: 3,
    borderColor: "#7db7ec",
  },

  nextButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },

  whiteButtonText: {
    color: "#fff",
  },
});

export default CompanyKvk;
