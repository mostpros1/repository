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
  ImageBackground,
} from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const StartPage = () => {
  return (
    <SafeAreaView style={styles.view}>
      <ImageBackground
        source={require("../../assets/images/welkomBackground.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.standardContainer}>
          <View style={styles.sectionContainer}>
            <Link style={styles.link} href="/forms/login">
              <Text style={styles.text}>login</Text>
            </Link>
            <Link style={styles.link} href="/forms/register">
              <Text style={styles.text}>Register</Text>
            </Link>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  standardContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "35%",
  },
  sectionContainer: {
    height: "32%",
  },
  welkom: {
    fontSize: 40,
  },
  img: {
    width: 380,
  },
  link: {
    borderRadius: 10,
    backgroundColor: "#308AE4",
    width: 300,
    textAlign: "center",
    padding: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default StartPage;
