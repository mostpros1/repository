import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Pressable,
  Image,
  ScrollView,
  ImageBackground,
  Linking,
  Modal,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { Dimensions } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons";
import Footer from "../Footer";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const EditProfile = ({ navigation }) => {
  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.view}>
            <View style={styles.topContainer}>
              <View style={styles.topButtonsContainer}>
                <Pressable
                  style={[styles.linkOne, styles.returnButton]}
                  onPress={() => navigation.navigate("")}
                >
                  <View style={styles.smallCircle}>
                    <Icon name="arrow-back" size={28} color="#308AE4" />
                  </View>
                </Pressable>
              </View>
              <View style={styles.topContainerSecondSectionTwo}>
                <Text style={[styles.name, styles.textBold]}>Over</Text>
              </View>
            </View>
            <View style={styles.imageTextWrapper}>
              <Image
                style={styles.image}
                source={require("../../../assets/images/jan.png")}
              />
              <Text style={styles.editTitle}>Wijzig afbeelding</Text>
            </View>
            <View style={styles.editBarsBox}>
                <View style={styles.editBarsTitleWrapper}>
                    <Text style={styles.editTitle}>Voornaam</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Lisa"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.editBarsTitleWrapper}>
                    <Text style={styles.editTitle}>Achternaam</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Zoetlief"
                    />
                </View>
                <View style={styles.editBarsTitleWrapper}>
                    <Text style={styles.editTitle}>Emailadres</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="lisazoetlief@hotmail.com"
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.editBarsTitleWrapper}>
                    <Text style={styles.editTitle}>Telefoonnummer</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="+31 01234***89"
                        keyboardType="phone-pad"
                    />
                </View>
            </View>
            <Pressable
                style={[styles.nextButton]}
              >
                <Text style={[styles.nextButtonText, styles.whiteButtonText]}>
                  Opslaan
                </Text>
              </Pressable>
          </View>
        </ScrollView>
        <Footer navigation={navigation} activePage="Profile" />
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    height: Platform.OS === 'ios' ? windowHeight - 50 : Platform.OS === 'android' ? windowHeight * 1.1 : 'auto', // Adjust height based on platform
    width: windowWidth,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },

  nextButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },

  whiteButtonText: {
    color: "#fff",
  },

  input: {
    backgroundColor: "#E9F4FF",
    borderRadius: 10,
    padding: 10,
    width: '100%',
    height: 55,
    marginTop: 10,
    marginBottom: 14,
},

nextButton: {
    backgroundColor: "#318ae5",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: "center",
    width: 200,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  editBarsTitleWrapper:{
    width: "100%",
  },

  editBarsBox:{
    width: windowWidth,
    padding: 20,
  },

  imageTextWrapper: {
    width: windowWidth,
    height: 135,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  editTitle:{
    fontSize: 14,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 60,
    aspectRatio: 1,
    marginBottom: 5,
  },

  linkOne: {
    borderRadius: 10,
    backgroundColor: "#308AE4",
    width: 250,
    textAlign: "center",
    padding: 10,
    bottom: -60,
    alignItems: "center",
  },

  textBold: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "bold",
  },

  topContainer: {
    width: 700,
    height: 100,
    display: "flex",
    backgroundColor: "#308AE4",
    alignItems: "center",
    flexDirection: "column",
    borderBottomEndRadius: 250,
    borderBottomStartRadius: 250,
    marginBottom: 25,
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    paddingHorizontal: 20,
    position: "absolute",
    top: -25,
  },
  returnButton: {
    backgroundColor: "transparent",
    width: 60,
    textAlign: "center",
  },
  topContainerSecondSectionTwo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 54,
    gap: 2,
  },
  name: {
    color: "white",
  },
  arrow: {
    fontSize: 22,
  },
  smallCircle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EditProfile;
