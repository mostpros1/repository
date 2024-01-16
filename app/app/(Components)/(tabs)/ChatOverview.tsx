import React from 'react';
import { Link } from "expo-router";
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
} from "react-native";
import { Dimensions } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



const Profile = ({ navigation }) => {
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
                <Pressable style={[styles.linkTwo, styles.returnButton]} onPress={() => navigation.navigate('')}>
                  <Text style={[styles.text, styles.textButtonWhite]}>&lt;</Text>
                </Pressable>
              </View>
              <View style={styles.topContainerFirstSection}>
                <Text style={[styles.title, styles.text]}>
                  Messaging
                </Text>
              </View>
              <View style={styles.topContainerSecondSection}>
                <Pressable style={styles.linkOne} onPress={() => navigation.navigate('')}>
                  <Text style={[styles.text, styles.textButtonBlack]}>Notificaties</Text>
                </Pressable>
                <Pressable style={styles.linkOne} onPress={() => navigation.navigate('')}>
                  <Text style={[styles.text, styles.textButtonBlack]}>Berichten</Text>
                </Pressable>
                <Pressable style={styles.linkOne} onPress={() => navigation.navigate('')}>
                  <Text style={[styles.text, styles.textButtonBlack]}>Community</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.middleContainer}>
              <View style={[styles.middleContainerFirstSection]}>
                <View style={styles.personContainer}>
                  <Text style={[styles.name, styles.text]}>
                    Jan Schilder
                  </Text>
                  <Text style={[styles.message, styles.text]}>
                    Ik ben volgende week woensdag beschikbaar.
                  </Text>
                </View>
                <View style={styles.circleContainer}>
                  <View>
                    <Image
                      style={styles.image}
                      source={require("../../../assets/images/jan.png")}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.middleContainerSecondSection}>
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
  topContainer: {
    width: 700,
    height: 110,
    display: "flex",
    backgroundColor: "#308AE4",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  topButtonsContainer: {
    width: '60%',
    paddingHorizontal: 20,
    position: 'absolute',
    top: -25,
  },

  returnButton: {
    borderRadius: 10,
    backgroundColor: "transparent",
    width: 60,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  topContainerFirstSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  topContainerSecondSection: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  title: {
    top: 50,
    color: 'white',
  },
  name: {
    marginLeft: 10,
    color: 'black',
    fontWeight: "bold",
  },
  message: {
    marginLeft: 10,
    color: 'black',
    fontStyle: "italic",
  },
  middleContainer: {
    top: 0,
    padding: 140,
  },
  middleContainerFirstSection: {
    width: 380,
    height: 105,
    display: "flex",
    backgroundColor: "#E9F4FF",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    paddingRight: 250,
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
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    transform: [{ scale: 1.6 }]
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
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    width: 140,
    textAlign: "center",
    padding: 10,
    bottom: -65,
    alignItems: "center",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
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
    borderColor: '#308AE4',
  },
  messageButton: {
    borderRadius: 10,
    backgroundColor: "transparent",
    width: 150,
    textAlign: "center",
    padding: 20,
    bottom: -60,
    borderWidth: 2,
    borderColor: '#308AE4',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
  },
  textButtonWhite: {
    color: "white",
  },
  textButtonBlack: {
    color: "black",
  },
});

export default Profile;