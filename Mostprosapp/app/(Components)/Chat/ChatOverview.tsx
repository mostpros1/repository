import React from "react";
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
  TextInput,
  Platform,
} from "react-native";
import { Dimensions } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons";
import { KeyboardAvoidingView } from 'react-native';
import Footer from '../Footer'; 

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ChatOverview = ({ navigation }) => {
  const CustomIcon = (props) => {
    return (
      <View>
        <Icon
          name={props.name}
          size={props.size}
          style={{
            backgroundColor: `${props.bcolor}`,
            color: `${props.color}`,
            paddingLeft: props.pLeft,
            borderRadius: props.rad,
            padding: props.pad,
          }}
        />
      </View>
    );
  };
  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.view}>
            <View style={styles.topContainer}>
              <View style={styles.topButtonsContainer}>
                <Pressable
                  style={[styles.backWrapper, styles.returnButton]}
                  onPress={() => navigation.navigate("")}>
                  <View style={styles.smallCircle}>
                    <Icon name="arrow-back" size={28} color="#308AE4" />
                  </View>
                </Pressable>
              </View>
              <Text style={[styles.title, styles.text]}>Messaging</Text>
            </View>
            <View style={styles.topContainerSecondSection}>
              <Pressable
                style={styles.linkOne}
                onPress={() => navigation.navigate("")}
              >
                <Text style={[styles.text, styles.textButtonBlack]}>
                  Notificaties
                </Text>
              </Pressable>
              <Pressable
                style={[styles.linkOne, styles.selected]}
                onPress={() => navigation.navigate("")}
              >
                <Text style={[styles.text, styles.textButtonBlack]}>
                  Berichten
                </Text>
              </Pressable>
              <Pressable
                style={styles.linkOne}
                onPress={() => navigation.navigate("")}
              >
                <Text style={[styles.text, styles.textButtonBlack]}>
                  Community
                </Text>
              </Pressable>
            </View>
            <View style={styles.container}>
              <Icon name="search" size={28} color="gray" />
              <TextInput
                placeholder="Zoeken"
                style={styles.input}
                onChangeText={(text) => {
                  // hier invullen wat er moet gebeuren met de input
                }}
              />
            </View>

            <View style={styles.middleContainer}>
              <View style={[styles.middleContainerFirstSection]}>
                <Image style={styles.image} source={require("../../../assets/images/jan.png")}/>
                <View style={styles.size}>
                  <View style={styles.textWrapperTop}>
                    <Text style={[styles.text, styles.textButtonBlack,]}>Jan Schilder</Text>
                    <Text style={styles.lightTitle}>13:40pm</Text>
                  </View>
                  <View style={styles.textWrapperBottom}>
                  <Text style={styles.lightTitle}>
                    Ja, ik ben beschikbaar volgende week {'\n'}
                    woensdag.
                  </Text>
                  <View style={styles.notification}>
                    <Text style={styles.textButtonWhite}>1</Text>
                  </View>
                  </View>
                </View>
              </View>
              
              
              <View style={[styles.middleContainerFirstSection]}>
              <Image style={styles.image} source={require("../../../assets/images/jan.png")}/>
                <View style={styles.size}>
                  <View style={styles.textWrapperTop}>
                    <Text style={[styles.text, styles.textButtonBlack,]}>Beste klussers B.V</Text>
                    <Text style={styles.lightTitle}>13:40pm</Text>
                  </View>
                  <View style={styles.textWrapperBottom}>
                  <Text style={styles.lightTitle}>
                    Ja, ik ben beschikbaar volgende week {'\n'}
                    woensdag.
                  </Text>
                  <View style={styles.notification}>
                    <Text style={styles.textButtonWhite}>1</Text>
                  </View>
                  </View>
                </View>
              </View>
              <View style={[styles.middleContainerFirstSection]}>
                <Image style={styles.image} source={require("../../../assets/images/jan.png")}/>
                  <View style={styles.size}>
                    <View style={styles.textWrapperTop}>
                      <Text style={[styles.text, styles.textButtonBlack,]}>Lina</Text>
                      <Text style={styles.lightTitle}>13:40pm</Text>
                    </View>
                    <View style={styles.textWrapperBottom}>
                    <Text style={styles.lightTitle}>
                      Ja, ik ben beschikbaar volgende week {'\n'}
                      woensdag.
                    </Text>
                    <View style={styles.notification}>
                      <Text style={styles.textButtonWhite}>1</Text>
                    </View>
                    </View>
                  </View>
              </View>
              <View style={[styles.middleContainerFirstSection]}>
                <Image style={styles.image} source={require("../../../assets/images/jan.png")}/>
                  <View style={styles.size}>
                    <View style={styles.textWrapperTop}>
                      <Text style={[styles.text, styles.textButtonBlack,]}>Tim Klus</Text>
                      <Text style={styles.lightTitle}>13:40pm</Text>
                    </View>
                    <View style={styles.textWrapperBottom}>
                    <Text style={styles.lightTitle}>
                      Ja, ik ben beschikbaar volgende week {'\n'}
                      woensdag.
                    </Text>
                    <View style={styles.notification}>
                      <Text style={styles.textButtonWhite}>1</Text>
                    </View>
                    </View>
                  </View>
              </View>
              <View style={[styles.middleContainerFirstSection]}>
                <Image style={styles.image} source={require("../../../assets/images/jan.png")}/>
                  <View style={styles.size}>
                    <View style={styles.textWrapperTop}>
                      <Text style={[styles.text, styles.textButtonBlack,]}>Ricardo van Dorp</Text>
                      <Text style={styles.lightTitle}>13:40pm</Text>
                    </View>
                    <View style={styles.textWrapperBottom}>
                    <Text style={styles.lightTitle}>
                      Ja, ik ben beschikbaar volgende week {'\n'}
                      woensdag.
                    </Text>
                    <View style={styles.notification}>
                      <Text style={styles.textButtonWhite}>1</Text>
                    </View>
                    </View>
                  </View>
              </View>
              <View style={[styles.middleContainerFirstSection]}>
                <Image style={styles.image} source={require("../../../assets/images/jan.png")}/>
                  <View style={styles.size}>
                    <View style={styles.textWrapperTop}>
                      <Text style={[styles.text, styles.textButtonBlack,]}>Nora Kikker</Text>
                      <Text style={styles.lightTitle}>13:40pm</Text>
                    </View>
                    <View style={styles.textWrapperBottom}>
                    <Text style={styles.lightTitle}>
                      Ja, ik ben beschikbaar volgende week {'\n'}
                      woensdag.
                    </Text>
                    <View style={styles.notification}>
                      <Text style={styles.textButtonWhite}>1</Text>
                    </View>
                    </View>
                  </View>
              </View>
              <View style={[styles.footerfix]}></View>
            </View>
          </View>
        </ScrollView>
        <Footer navigation={navigation} activePage="ChatOverview" />
      </SafeAreaView>
    </PaperProvider>
  );
};
const styles = StyleSheet.create({
  view: {
    ...Platform.select({
      ios: {
        height: windowHeight * 1.2, // Adjust height for iOS
      },
      android: {
        height: windowHeight * 1.31, // Adjust height for Android
      },
    }),
    width: windowWidth,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },

  footerfix: {
    height: 35,
    width: windowWidth,
  },

  notification:{
    width: 25,
    aspectRatio: 1/1,
    borderRadius: 50,
    backgroundColor: "#318ae5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 90,
    borderRadius: 45,
    height: undefined,
    aspectRatio: 1,
  },

  size: {
    flex: 1,
  },

  middleContainerFirstSection: {
    width: 380,
    height: 105,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#E9F4FF",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    padding: 13,
  },

  lightTitle: {
    fontSize: 12,
    color: "#B7BEC5",
},

  textWrapperTop: {
    flex: 1, 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingLeft: 10,

  },

  textWrapperBottom: {
    flex: 1, 
    padding: 10, 
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },

  topContainer: {
    width: windowWidth,
    height: 110,
    display: "flex",
    backgroundColor: "#308AE4",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
    paddingBottom: 30,
  },
  topButtonsContainer: {
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
  topContainerFirstSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  topContainerSecondSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  title: {
    color: "white",
  },
  name: {
    marginLeft: 10,
    color: "black",
    fontWeight: "bold",
  },
  message: {
    marginLeft: 10,
    color: "black",
    fontStyle: "italic",
  },
  middleContainer: {
    padding: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },


  middleContainerSecondSection: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: 120,
    gap: 20,
  },

  personContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  circleContainer: {
    width: 85,
    height: 85,
    display: "flex",
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: 400,
    borderWidth: 1,
    borderColor: "white",
    overflow: "hidden",
  },
  button: {
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  skipButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "black",
    maxWidth: 90,
    maxHeight: 40,
    padding: 6,
    margin: 30,
  },
  linkOne: {
    backgroundColor: "white",
    width: 131,
    height: 60,
    textAlign: "center",
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  linkTwo: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    width: 140,
    textAlign: "center",
    padding: 20,
    bottom: -60,
    alignItems: "center",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  callButton: {
    borderRadius: 10,
    backgroundColor: "transparent",
    width: 150,
    textAlign: "center",
    padding: 20,
    bottom: -60,
    borderWidth: 2,
    borderColor: "#308AE4",
  },
  messageButton: {
    borderRadius: 10,
    backgroundColor: "transparent",
    width: 150,
    textAlign: "center",
    padding: 20,
    bottom: -60,
    borderWidth: 2,
    borderColor: "#308AE4",
  },
  text: {
    fontSize: 16,
  },
  textButtonWhite: {
    color: "white",
  },
  textButtonBlack: {
    color: "black",
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
  backWrapper: {
    borderRadius: 10,
    backgroundColor: "#308AE4",
    width: 250,
    textAlign: "center",
    padding: 10,
    bottom: -60,
    alignItems: "center",
  },

  selected: {
    borderWidth: 2,
    borderColor: "#308AE4",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#f5f5f9",
    backgroundColor: "#fffefe",
    height: 50,
    padding: 10,
    borderRadius: 5,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 15,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
});

export default ChatOverview;
