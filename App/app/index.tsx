import { Redirect } from "expo-router";
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
const StartPage = () => {
  const onPress = () => {
    return Alert.alert("Yay");
  };
  return (
    <SafeAreaView style={styles.view}>
      <ImageBackground
        source={require("./images/welkomBackground.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.viewContainer1}>
          <Image style={styles.img} source={require("./images/logo.png")} />
        </View>
        <View style={styles.viewContainer1}>
          <Text style={styles.welkom}> Welkom</Text>
        </View>
        <View style={styles.viewContainer1}>
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Start</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welkom: {
    fontSize: 40,
  },
  viewContainer1: {
    paddingTop: 150,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  img: {
    width: 400,
  },
  view: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#308AE4",
    width: 300,
    height: 60,
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
