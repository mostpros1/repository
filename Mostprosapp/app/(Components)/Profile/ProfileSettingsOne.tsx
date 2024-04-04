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
} from "react-native";
import { Dimensions } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProfileSettingsOne = ({ navigation }) => {
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
                <Text style={[styles.name, styles.textBold]}>Profiel</Text>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../../../assets/images/jan.png")}
              />
              <View style={styles.textSpacer}>
                <Text style={styles.title}>Lisa Zoetlief</Text>
                <TouchableOpacity>
                  <Pressable>
                    <Text style={styles.clickableText} onPress={() => navigation.navigate("EditProfile")}>Profiel Bijwerken</Text>
                  </Pressable>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.middleContainerFirstSection}>
              <Pressable
                style={[styles.linkTwoTop, styles.agendaButton]}
                onPress={() => navigation.navigate("")}
              >
                <Icon name="badge" size={23} color="black" />
                <Text style={[styles.text, styles.textButtonBlack]}>
                  Membership
                </Text>
                <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                  <Text style={[styles.arrow]}>&gt;</Text>
                </TouchableOpacity>
              </Pressable>
              <Pressable
                style={[styles.linkTwo, styles.agendaButton]}
                onPress={() => navigation.navigate("")}
              >
                <Icon name="construction" size={23} color="black" />
                <Text style={[styles.text, styles.textButtonBlack]}>
                  Mijn Klussen
                </Text>
                <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                  <Text style={[styles.arrow]}>&gt;</Text>
                </TouchableOpacity>
              </Pressable>
              <Pressable
                style={[styles.linkTwo, styles.agendaButton]}
                onPress={() => navigation.navigate("")}
              >
                <Icon name="payments" size={23} color="black" />
                <Text style={[styles.text, styles.textButtonBlack]}>
                  Betaalmethode
                </Text>
                <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                  <Text style={[styles.arrow]}>&gt;</Text>
                </TouchableOpacity>
              </Pressable>
              <Pressable
                style={[styles.linkTwo, styles.agendaButton]}
                onPress={() => navigation.navigate("")}
              >
                <Icon name="sms" size={23} color="black" />
                <Text style={[styles.text, styles.textButtonBlack]}>
                  Klanten Service
                </Text>
                <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                  <Text style={[styles.arrow]}>&gt;</Text>
                </TouchableOpacity>
              </Pressable>
              <Pressable
                style={[styles.linkTwoBottom, styles.agendaButton]}
                onPress={() => navigation.navigate("")}
              >
                <Icon name="settings" size={23} color="black" />
                <Text style={[styles.text, styles.textButtonBlack]}>
                  Settingen
                </Text>
                <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                  <Text style={[styles.arrow]}>&gt;</Text>
                </TouchableOpacity>
              </Pressable>
            </View>

            <View style={styles.logoutWrapper}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => console.log("Logout clicked")}>
                <Text style={styles.buttonText}>Uitloggen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    height: windowHeight,
    width: windowWidth,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
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
  circleContainer: {
    marginTop: 55,
    width: 170,
    height: 170,
    display: "flex",
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: 400,
    borderWidth: 1,
    borderColor: "white",
    overflow: "hidden",
  },
  topContainerSecondSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 15,
    gap: 2,
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
  firstMiddleContainerWrapper: {
    width: "100%",
    height: "50%",
    padding: 10,
    paddingBottom: 0,
    paddingTop: 32,
    backgroundColor: "white",
  },
  secondMiddleContainerWrapper: {
    width: "100%",
    height: 100,
    padding: 10,
    backgroundColor: "white",
  },
  middleContainerFirstSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 0,
    paddingBottom: 100,
  },
  agendaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  imageContainer: {
    width: windowWidth,
    padding: 25,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
  },
  button: {
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  linkTwo: {
    backgroundColor: "#E9F4FF",
    width: 350,
    textAlign: "left",
    padding: 20,
    bottom: -20,
    alignItems: "flex-start",
  },
  linkTwoTop: {
    borderRadius: 10,
    backgroundColor: "#E9F4FF",
    width: 350,
    textAlign: "left",
    padding: 20,
    bottom: 0,
    alignItems: "flex-start",
  },
  linkTwoBottom: {
    borderRadius: 10,
    backgroundColor: "#E9F4FF",
    width: 350,
    textAlign: "left",
    padding: 20,
    top: 40,
    alignItems: "flex-start",
  },
  linkTwoDelete: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#E9F4FF",
    width: 350,
    textAlign: "left",
    padding: 20,
    bottom: -20,
    alignItems: "flex-start",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
  },
  textBold: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "bold",
  },
  smallTitle: {
    fontSize: 13,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  textButtonWhite: {
    color: "white",
  },
  textButtonBlack: {
    color: "black",
  },
  arrow: {
    fontSize: 22,
  },
  arrowButton: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
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
  clickableText: {
    color: "#56a0e8",
    fontWeight: "bold",
  },
  textSpacer: {
    display: "flex",
    gap: 8,
  },
  logoutButton: {
    backgroundColor: "#56a0e8",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 220,
    height: 55,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  logoutWrapper: {
    width: windowWidth,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileSettingsOne;
