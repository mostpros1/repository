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
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

const PageTwo = () => {
  return (
    <SafeAreaView>
      {/* <ImageBackground
        source={require("../assets/images/welkomBackground.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.standardContainer}>
          <View style={styles.sectionContainer}>
            <Image
              style={styles.img}
              source={require("../assets/images/logo.png")}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.welkom}> Welkom</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Link style={styles.link} href="/keuze">
              <Text style={styles.text}>Start</Text>
            </Link>
          </View>
        </View>
      </ImageBackground> */}
      <Text>Hi</Text>
    </SafeAreaView>
  );
};

export default PageTwo;
