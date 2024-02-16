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
const HowItWorksOneSpecialist = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.topContainer}>
        <View style={styles.standardContainer}>
          <View style={[styles.button, styles.skipButton]}>
            <Pressable onPress={() => navigation.navigate('TestHome')}>
              <Text style={[styles.text]}>
                Overslaan
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <View>
            <Image
              style={styles.image}
              source={require("../../../assets/images/HowItWorksFour.png")}
            />
          </View>
        </View>
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.middleContainerFirstSection}>
          <Image source={require("../../../assets/images/one.png")} />
          <Text style={styles.title}>Zoek een klus</Text>
        </View>
        <View style={styles.middleContainerSecondSection}>
          <Text>
            Voer in de zoekbalk de type klus die je zoekt, noteer je postcode en
            krijg klussen van mensen in jouw omgeving. Let op: U dient aan het
            einde in te loggen om aanbod te ontvangen.
          </Text>
        </View>
      </View>
      <View style={styles.progressionBarContainer}>
        <View style={styles.progressionBarFull}></View>
        <View style={styles.progressionBarEmpty}></View>
        <View style={styles.progressionBarEmpty}></View>
      </View>
      <Pressable style={styles.link} onPress={() => navigation.navigate('HowItWorksTwoSpecialist')}>
        <Text style={[styles.text, styles.textNext]}>Volgende</Text>
      </Pressable>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  view: {
    height: windowHeight,
    width: windowWidth,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#E9F4FF",
  },
  standardContainer: {
    width: windowWidth,
    display: "flex",
    alignItems: "flex-end",
  },
  topContainer: {
    width: 700,
    height: 420,
    display: "flex",
    backgroundColor: "white",
    alignItems: "center",
    borderBottomEndRadius: 400,
    borderBottomStartRadius: 400,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "flex-end",
    height: 320,
  },
  middleContainer: {
    display: "flex",
    alignItems: "flex-start",
    width: "75%",
  },
  middleContainerFirstSection: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
    gap: 10,
  },
  middleContainerSecondSection: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
  },
  progressionBarContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    height: 100,
    alignItems: "flex-end",
  },
  progressionBarFull: {
    width: 90,
    height: 5,
    backgroundColor: "#308AE4",
  },
  progressionBarEmpty: {
    width: 90,
    height: 4,
    backgroundColor: "white",
  },
  image: {
    bottom: 0,
  },
  button: {
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  skipButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#308AE4",
    maxWidth: 90,
    maxHeight: 40,
    padding: 6,
    margin: 30,
  },
  link: {
    borderRadius: 10,
    backgroundColor: "#308AE4",
    width: 300,
    textAlign: "center",
    padding: 20,
    bottom: -60,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
  },
  textNext: {
    color: "white",
  },
  title: {
    fontSize: 20,
  },
  nextButtonText: {
    color: "white",
  },
});

export default HowItWorksOneSpecialist;
