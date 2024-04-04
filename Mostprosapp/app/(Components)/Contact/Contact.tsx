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

const Contact = ({ navigation }) => {
    const [additionalInfo, setAdditionalInfo] = useState('');
 
  const handleLocationPress = () => {
    const address = "2013 AS, Haarlem Kinderhuissingel 6-K";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    Linking.openURL(url);
  };

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
                <Text style={[styles.name, styles.textBold]}>Contact</Text>
              </View>
            </View>
            <View style={styles.mainPage}>
              <Text style={styles.titleText}>
                Heb je vragen? neem contact met ons op!
              </Text>
              <Pressable
                style={styles.locationWrapper}
                onPress={handleLocationPress}
              >
                <Image
                  style={styles.image}
                  source={require("../../../assets/images/location.png")}
                />
                <Text style={styles.locationText}>
                  Office{"\n"}2013 AS, Haarlem{"\n"}Kinderhuissingel 6-K
                </Text>
              </Pressable>

              <View style={styles.inputTextCover}>
                <View style={styles.textInputWrapper}>
                  <Text>Naam</Text>
                  <Pressable style={styles.containerInput}>
                    <TextInput
                      placeholder="Voer uw Voornaam in:"
                      style={styles.input}
                    />
                  </Pressable>
                </View>
              </View>
              <View style={styles.inputTextCover}>
                <View style={styles.textInputWrapper}>
                  <Text>Achternaam</Text>
                  <Pressable style={styles.containerInput}>
                    <TextInput
                      placeholder="Voer uw Achternaam in:"
                      style={styles.input}
                    />
                  </Pressable>
                </View>
              </View>
              <View style={styles.inputTextCover}>
                <View style={styles.textInputWrapper}>
                  <Text>Email</Text>
                  <Pressable style={styles.containerInput}>
                    <TextInput
                      placeholder="Voer uw Email in:"
                      style={styles.input}
                    />
                  </Pressable>
                </View>
                <View style={styles.textAreaContainer}>
                    <TextInput
                        style={styles.textArea}
                        onChangeText={setAdditionalInfo}
                        value={additionalInfo}
                        placeholder="Waarbij heeft u hulp nodig?"
                        placeholderTextColor="#b6b8bd"
                        multiline
                    />
                </View>
              </View>
              <View style={styles.buttonsContainer}>
            <Pressable style={[styles.nextButton]}>
              <Text style={[styles.nextButtonText, styles.whiteButtonText]}>
                Volgende
              </Text>
            </Pressable>
                </View>
            </View>
          </View>
          <View style={[styles.footerfix]}></View>

        </ScrollView>
        <Footer navigation={navigation} activePage="Profile" />
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    height: windowHeight * 1.3,
    width: windowWidth,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },
  textInputWrapper:{
    width: "100%",
    paddingLeft: 25,
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
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
},
buttonsContainer:{
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
    alignSelf: 'center',
    width: 270,
    height: 65,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
},
nextButtonColorOne:{
    backgroundColor: "#fffefe",
    borderWidth: 3,
    borderColor: "#7db7ec",
},
nextButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: 'center',
},
whiteButtonText:{
    color: "#fff",
},

});

export default Contact;
