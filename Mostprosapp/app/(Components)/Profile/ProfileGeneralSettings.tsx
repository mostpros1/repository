import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Dimensions } from "react-native";
import { Provider as PaperProvider, Switch } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons";
import Footer from '../Footer'; 


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProfileGeneralSettings = ({ navigation }) => {
  const [isSwitchOn1, setIsSwitchOn1] = useState(false);
  const [isSwitchOn2, setIsSwitchOn2] = useState(false);

  const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);
  const onToggleSwitch2 = () => setIsSwitchOn2(!isSwitchOn2);

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
                <Text style={[styles.name, styles.textBold]}>General</Text>
              </View>
            </View>

            <View style={styles.firstMiddleContainerWrapper}>
              <View style={styles.middleContainerFirstSection}>
                <Pressable
                  style={[
                    styles.linkTwoTop,
                    styles.topRadius,
                    styles.agendaButton,
                  ]}
                  onPress={() => navigation.navigate("")}
                >
                  <Icon
                    name="language"
                    size={windowWidth * 0.05}
                    color="black"
                  />
                  <Text style={[styles.text, styles.textButtonBlack]}>
                    Taal
                  </Text>
                  <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                    <Text style={[styles.arrow]}>&gt;</Text>
                  </TouchableOpacity>
                </Pressable>
                <View style={[styles.linkTwo, styles.agendaButton]}>
                  <Icon
                    name="translate"
                    size={windowWidth * 0.05}
                    color="black"
                  />
                  <Text style={[styles.text, styles.textButtonBlack]}>
                    Tekstvertalen                  
                  </Text>
                  <View style={[styles.button, styles.arrowButton]}>
                    <Switch
                      value={isSwitchOn1}
                      onValueChange={onToggleSwitch1}
                      ios_backgroundColor="#606160"
                      color="#308AE4"
                    />
                  </View>
                </View>
                <Pressable
                  style={[styles.linkTwoTop, styles.agendaButton]}
                  onPress={() => navigation.navigate("")}
                >
                  <Icon name="title" size={windowWidth * 0.05} color="black" />
                  <Text style={[styles.text, styles.textButtonBlack]}>
                  Lettergrootte
                  </Text>
                  <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                    <Text style={[styles.arrow]}>&gt;</Text>
                  </TouchableOpacity>
                </Pressable>
                <View
                  style={[
                    styles.linkTwoTop,
                    styles.bottomRadius,
                    styles.agendaButton,
                  ]}
                >
                  <Text style={[styles.text, styles.textButtonBlack]}>
                  Donkere modus
                  </Text>
                  <Switch
                    value={isSwitchOn2}
                    onValueChange={onToggleSwitch2}
                    ios_backgroundColor="#606160"
                    color="#308AE4"
                  />
                </View>
              </View>
            </View>

            <View style={styles.secondMiddleContainerWrapper}>
              <View style={styles.middleContainerFirstSection}>
                <Pressable
                  style={[
                    styles.linkTwoDelete,
                    styles.topRadius,
                    styles.agendaButton,
                  ]}
                  onPress={() => navigation.navigate("")}
                >
                  <Text style={[styles.text, styles.textButtonBlack]}>
                  Opslagbeheer
                  </Text>
                  <View style={styles.textButtonWrapper}>
                    <Text style={[styles.lightTitle]}>Beheer Cache</Text>
                    <TouchableOpacity style={styles.button}>
                      <Text style={[styles.arrow]}>&gt;</Text>
                    </TouchableOpacity>
                  </View>
                </Pressable>
                <Pressable
                  style={[
                    styles.linkTwoBottom,
                    styles.bottomRadius,
                    styles.agendaButton,
                  ]}
                  onPress={() => navigation.navigate("")}
                >
                  <Text style={[styles.text, styles.textButtonBlack]}>
                  Chatberichten verwijderen
                  </Text>
                  <View style={styles.textButtonWrapper}>
                    <TouchableOpacity style={styles.button}>
                      <Text style={[styles.arrow]}>&gt;</Text>
                    </TouchableOpacity>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
        <Footer navigation={navigation} activePage="Profile" />
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    ...Platform.select({
      ios: {
        height: windowHeight, // Adjust height for iOS
      },
      android: {
        height: windowHeight * 1.1, // Adjust height for Android
      },
    }),
    width: windowWidth,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },

  textButtonBlack: {
    color: "black",
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        paddingHorizontal: 20,
        position: 'absolute',
        top: -25,
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

  returnButton: {
    backgroundColor: "transparent",
    width: 60,
    textAlign: "center",
  },

  smallCircle: {
    width: 40,
    height: 40,
    borderRadius: 25, 
    backgroundColor: 'white',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
},

topContainerSecondSectionTwo: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 54,
  gap: 2,
},
name: {
  color: 'white',
},

textBold: {
  fontSize: windowWidth * 0.042,
  lineHeight: windowHeight * 0.053,
  fontWeight: "bold",
},

  circleContainer: {
    marginTop: windowHeight * 0.07,
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    display: "flex",
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: windowWidth * 0.5,
    borderWidth: 1,
    borderColor: "white",
    overflow: "hidden",
  },
  topContainerSecondSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: windowHeight * 0.02,
    gap: 2,
  },

  firstMiddleContainerWrapper: {
    width: "100%",
    backgroundColor: "white",
    paddingBottom: windowHeight * 0.02,
    paddingTop: windowHeight * 0.05,
    paddingHorizontal: windowWidth * 0.05,
  },
  secondMiddleContainerWrapper: {
    width: "100%",
    backgroundColor: "white",
    paddingBottom: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.05,
  },
  middleContainerFirstSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 0,
  },
  agendaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
    paddingVertical: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.05,
    marginVertical: -windowHeight * 0.01, // Adjusted to remove the gap
  },

  text: {
    fontSize: windowWidth * 0.04,
    lineHeight: windowHeight * 0.053,
  },
  smallTitle: {
    fontSize: windowWidth * 0.034,
    fontWeight: "bold",
    paddingLeft: windowWidth * 0.02,
  },
  lightTitle: {
    fontSize: windowWidth * 0.032,
    color: "#B7BEC5",
    lineHeight: windowHeight * 0.024,
  },
  textButtonWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    borderRadius: 10,
    paddingVertical: windowHeight * 0.012,
    paddingHorizontal: windowWidth * 0.04,
  },
  arrow: {
    fontSize: windowWidth * 0.06,
  },
  arrowButton: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
  },
  topRadius: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  bottomRadius: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  linkTwoTop: {
    backgroundColor: "#E9F4FF",
    width: "100%",
    textAlign: "left",
    paddingVertical: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.05,
    marginBottom: windowHeight * 0.01,
  },
  linkTwo: {
    backgroundColor: "#E9F4FF",
    width: "100%",
    textAlign: "left",
    paddingVertical: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.05,
    marginBottom: windowHeight * 0.01,
  },
  linkTwoBottom: {
    backgroundColor: "#E9F4FF",
    width: "100%",
    textAlign: "left",
    paddingVertical: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.05,
  },
  linkTwoDelete: {
    backgroundColor: "#E9F4FF",
    width: "100%",
    textAlign: "left",
    paddingVertical: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.05,
    marginTop: windowHeight * 0.01,
  },
});

export default ProfileGeneralSettings;
