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
} from "react-native";
import { Dimensions } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons";
import Footer from "../Footer";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AboutUs = ({ navigation }) => {
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
                <Text style={[styles.name, styles.textBold]}>Over ons</Text>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={[styles.textBold]}>Over ons</Text>
            </View>
            <Image
              source={require("../../../assets/images/aboutus.png")}
            />
            <View style={styles.textContainerTwo}>
            <Text>
  MostPros is een community marktplaats voor huiseigenaren om een moderne lokale professional te vinden. Samen met ons groeiende netwerk bouwen we mee aan de huizen voor de toekomst.
  {'\n\n'}
  Samen helpen wij mensen groeien. Wij accepteren de home service industrie niet zoals die is, maar streven ernaar om het te veranderen terwijl we plezier hebben.
</Text>
            </View>
            <ImageBackground
          source={require("../../../assets/images/textbubble.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <Text style={styles.textOnImage}>Wij koppelen je aan de professional en de {'\n'} klus die perfect aansluit bij jouw{'\n'}vaardigheden en voorkeuren.</Text>
        </ImageBackground>
          </View>
        </ScrollView>
        <Footer navigation={navigation} activePage="Profile" />
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    height: windowHeight * 1.1,
    width: windowWidth,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },
  textInputWrapper: {
    width: "100%",
    paddingLeft: 25,
  },

  imageBackground: {
    width: 316, 
    height: 63,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  textOnImage: {
    fontSize: 12,
    textAlign: "center",
  },

  textContainer: {
    width: windowWidth,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 30,
  },

  textContainerTwo:{
    width: windowWidth,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 30,
    maxWidth: 320,
  },

  footerfix: {
    height: 40,
    width: windowWidth,
  },

  textAreaContainer: {
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
    display: "flex",
    alignItems: "center",
  },
  textArea: {
    height: 150,
    width: "90%",
    justifyContent: "flex-start",
    backgroundColor: "#f9f9f8",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#f5f5f9",
    backgroundColor: "#f9f9f8",
    height: 60,
    borderRadius: 10,
    padding: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 15,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  inputTextCover: {
    width: "80%",
  },
  image: {
    height: "65%",
    objectFit: "contain",
  },
  locationText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  locationWrapper: {
    marginTop: 20,
    width: "75%",
    height: 130,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },

  titleText: {
    fontSize: 17,
  },

  mainPage: {
    flex: 1,
    width: windowWidth,
    display: "flex",
    alignItems: "center",
    paddingTop: 60,
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
  linkOne: {
    borderRadius: 10,
    backgroundColor: "#308AE4",
    width: 250,
    textAlign: "center",
    padding: 10,
    bottom: -60,
    alignItems: "center",
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
    fontSize: 20,
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
  topRadius: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  bottomRadius: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  bottomButtonsContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
  },
  buttonsContainer: {
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
    width: 270,
    height: 65,
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

export default AboutUs;
