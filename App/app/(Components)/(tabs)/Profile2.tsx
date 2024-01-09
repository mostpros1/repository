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
              <Pressable style={[styles.link, styles.returnButton]} onPress={() => navigation.navigate('')}>
                <Text style={[styles.text, styles.textButtonWhite]}>&lt;</Text>
              </Pressable>
              <Pressable style={[styles.link, styles.favouriteButton]} onPress={() => navigation.navigate('')}>
                <Text style={[styles.text, styles.textButtonWhite]}>&lt;3</Text>
              </Pressable>
            </View>
            <View style={styles.circleContainer}>
              <View>
              <Image
                      style={styles.image}
                      source={require("../../../assets/images/jan.png")}
                    />
              </View>
            </View>
            <View style={styles.topContainerSecondSection}>
              <Text style={[styles.name, styles.text]}>
                Jan Schilder
              </Text>
              <Text style={[styles.profession]}>
                Loodgieter
              </Text>
              <Text style={[styles.location]}>
                Amsterdam, Noord-Holland
              </Text>
            </View>
          </View>

          <View style={styles.middleContainer}>
            <View style={styles.middleContainerFirstSection}>
              <Pressable style={styles.link} onPress={() => navigation.navigate('')}>
                <Text style={[styles.text, styles.textButtonWhite]}>Beschikbaarheid</Text>
              </Pressable>
            </View>
            <View style={styles.middleContainerSecondSection}>
              <Text style={styles.title}>Over</Text>
              <Text>
                Hallo, ik ben Jan.

                Ik ben een Loodgieter voor meer dan 10 jaar. Ik heb aan veel projecten gewerkt en heb veel ervaring met alle klussen die te maken hebben met loodgieterswerk dus als je mij nodig heb neem meteen contact op met mij.

              </Text>
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.title}>Portfolio</Text>
            <View style={styles.bottomContainerFirstSection}>
              <ScrollView horizontal>
              <View style={styles.portfolioContainer}>
                  <View>
                    <Image
                      style={styles.image}
                      source={require("../../../assets/images/contractor.png")}
                    />
                  </View>
                </View>
                <View style={styles.portfolioContainer}>
                  <View>
                    <Image
                      style={styles.image}
                      source={require("../../../assets/images/dronepilot.png")}
                    />
                  </View>
                </View>
                <View style={styles.portfolioContainer}>
                  <View>
                  <Image
                      style={styles.image}
                      source={require("../../../assets/images/plasterer.png")}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
            <View style={styles.bottomContainerSecondSection}>
              <Pressable style={[styles.link, styles.callButton]} onPress={() => navigation.navigate('')}>
                <Text style={[styles.text, styles.textButtonBlack]}>Bellen</Text>
              </Pressable>
              <Pressable style={[styles.link, styles.messageButton]} onPress={() => navigation.navigate('')}>
                <Text style={[styles.text, styles.textButtonBlack]}>Bericht sturen</Text>
              </Pressable>
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
    height: 420,
    display: "flex",
    backgroundColor: "#308AE4",
    alignItems: "center",
    flexDirection: "column",
    borderBottomEndRadius: 400,
    borderBottomStartRadius: 400,
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
    width: 170,
    height: 170,
    display: "flex",
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: 400,
    borderWidth: 1,
    borderColor: "white",
    overflow: 'hidden',
  },
  topContainerSecondSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
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
  middleContainerFirstSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  middleContainerSecondSection: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: 120,
    gap: 20,
  },
  bottomContainer: {
    display: "flex",
    alignItems: "flex-start",
    width: "75%",
    marginTop: 40,
  },
  bottomContainerFirstSection: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    margin: 10,
    paddingHorizontal: 5,
  },
  portfolioContainer: {
    width: 300,
    height: 200,
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "transparent",
    marginHorizontal: 5,
    flex: 1,
    overflow: 'hidden',
  },
  bottomContainerSecondSection: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 100,
    gap: 20,
    justifyContent: "space-evenly",
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
  link: {
    borderRadius: 10,
    backgroundColor: "#308AE4",
    width: 250,
    textAlign: "center",
    padding: 20,
    bottom: -60,
    alignItems: "center",
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