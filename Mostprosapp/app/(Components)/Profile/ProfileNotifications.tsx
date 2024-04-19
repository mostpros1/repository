import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, Pressable, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { Provider as PaperProvider, Switch } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProfileNotifications = ({ navigation }) => {
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
            <Pressable style={[styles.linkOne, styles.returnButton]} onPress={() => navigation.navigate('')}>
                     <View style={styles.smallCircle}>
                        <Icon name="arrow-back" size={28} color="#308AE4" />
                    </View>
                </Pressable>
            </View>
                            <View style={styles.topContainerSecondSectionTwo}>
                                <Text style={[styles.name, styles.textBold]}>
                                    Settings
                                </Text>
                            </View>
                        </View>

            <View style={styles.firstMiddleContainerWrapper}>
              <Text style={[styles.textButtonBlack, styles.smallTitle]}>
                Push Notificaties
              </Text>

              <View style={styles.middleContainerFirstSection}>
                <Pressable style={[styles.agendaButton, styles.blockColorTop,]} onPress={() => navigation.navigate('')}>
                  <Text style={[styles.text, styles.textButtonBlack]}>Nieuwe berichten</Text>
                  <Switch value={isSwitchOn1} onValueChange={onToggleSwitch1} ios_backgroundColor="#606160" color="#308AE4" />
                </Pressable>
                <Pressable style={[styles.agendaButton, styles.blockColorBottom,]} onPress={() => navigation.navigate('')}>
                  <Text style={[styles.text, styles.textButtonBlack]}>Notificaties</Text>
                  <Switch value={isSwitchOn2} onValueChange={onToggleSwitch2} ios_backgroundColor="#606160" color="#308AE4" />
                </Pressable>
              </View>
            </View>

            <View style={styles.secondMiddleContainerWrapper}>
              <Text style={[styles.textButtonBlack, styles.smallTitle]}>
                Geluid
              </Text>

              <View style={styles.middleContainerFirstSection}>
              <Pressable style={[styles.agendaButton, styles.blockColorTop,]} onPress={() => navigation.navigate('')}>
                  <Text style={[styles.text, styles.textButtonBlack]}>Vibratie</Text>
                  <View style={styles.textButtonWrapper}>
                    <Text style={[styles.lightTitle]}>Set</Text>
                    <Pressable style={styles.button}>
                      <Text style={[styles.arrow]}>&gt;</Text>
                    </Pressable>
                  </View>
                </Pressable>
                <Pressable style={[styles.agendaButton, styles.blockColorBottom,]} onPress={() => navigation.navigate('')}>
                  <Text style={[styles.text, styles.textButtonBlack]}>Beltoon</Text>
                  <View style={styles.textButtonWrapper}>
                    <Text style={[styles.lightTitle]}>Set</Text>
                    <Pressable style={styles.button}>
                      <Text style={[styles.arrow]}>&gt;</Text>
                    </Pressable>
                  </View>
                </Pressable>
              </View>
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

  textButtonBlack: {
    color: "black",
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

blockColorTop:{
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: "#E9F4FF",
},

blockColorBottom:{
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#E9F4FF",
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

  returnButton: {
    backgroundColor: "transparent",
    width: 60,
    textAlign: "center",
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
    overflow: 'hidden',
  },
  topContainerSecondSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: windowHeight * 0.02,
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
    color: 'white',
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
    paddingTop: windowHeight * 0.01,
  },
  agendaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.05,
  },
  text: {
    fontSize: windowWidth * 0.04,
    lineHeight: windowHeight * 0.053,
  },

  textBold: {
    fontSize: windowWidth * 0.042,
    lineHeight: windowHeight * 0.053,
    fontWeight: "bold",
},
  smallTitle: {
    fontSize: windowWidth * 0.034,
    fontWeight: "bold",
    paddingLeft: windowWidth * 0.02,
  },
  lightTitle: {
    fontSize: windowWidth * 0.032,
    color: "#B7BEC5",
    lineHeight: 24,
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
smallCircle: {
    width: 40,
    height: 40,
    borderRadius: 25, 
    backgroundColor: 'white',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
},
});

export default ProfileNotifications;
