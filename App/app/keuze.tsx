import { Redirect, Link } from "expo-router";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Pressable, Image, ImageBackground, } from "react-native";
const StartPage = () => {
  const onPress = () => {

    return <Redirect href="/home" />;
  };
  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        <View style={styles.viewContainer1}>
          <Image style={styles.img} source={require("../assets/images/logo.png")} />
        </View>
        <View style={styles.viewContainer1}>
          <Text style={styles.welkom}>Maak een keuze om verder te gaan</Text>
        </View>
        <View style={styles.viewContainer1}>
          <Link style={styles.button} href="/howItWorksOne">
            <Text style={styles.text}>Verder als huiseigenaar</Text>
          </Link>
          <Link style={styles.buttonTwo} href="/home">
            <Text style={styles.textTwo}>Verder als vakspecialist</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welkom: {
    fontSize: 20,
  },
  viewContainer1: {
    paddingTop: 100,
  },
  container: {
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
  buttonTwo: {
    marginTop: 30,
    borderWidth: 2,
    borderColor:"#308AE4",
    borderRadius: 4,
    backgroundColor: "white",
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
  textTwo: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#308AE4",
  },
});

export default StartPage;
