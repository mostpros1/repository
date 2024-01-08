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


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Profile = ({ navigation }) => {
  return (
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
              <Text style={[styles.name, styles.text]}>
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
            <View style={styles.circleContainer}>
              <View>
                <Image
                  style={styles.image}
                  source={require("../../../assets/images/jan.png")}
                />
              </View>
            </View>
            <View>
              
            </View>
            <View style={styles.middleContainerSecondSection}>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
  view: {
    // height: windowHeight,
    // width: windowWidth,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },
  topContainer: {
    width: 700,
    height: 140,
    display: "flex",
    backgroundColor: "#308AE4",
    alignItems: "center",
    flexDirection: "column",
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  favouriteButton: {
    borderRadius: 10,
    backgroundColor: "transparent",
    width: 60,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  circleContainer: {
    marginTop: 110,
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
  topContainerFirstSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
  },
  topContainerSecondSection: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  name: {
    color: 'white',
  },
  profession: {
    fontSize: 12,
    lineHeight: 21,
    color: 'white',
  },
  location: {
    fontSize: 14,
    lineHeight: 21,
    color: 'white',
  },
  middleContainer: {
    width: "75%",
  },
  middleContainerSecondSection: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: 120,
    gap: 20,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Profile;