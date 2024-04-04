import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../Footer";

const professionals = {
  professional: [
    {
      name: "Jan Schilder",
      title: "Loodgieter",
      description:
        "Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.",
      image: require("../../../assets/images/jan.png"),
    },
    {
      name: "Jan Schilder",
      title: "Loodgieter",
      description:
        "Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.",
      image: require("../../../assets/images/jan.png"),
    },
    {
      name: "Jan Schilder",
      title: "Loodgieter",
      description:
        "Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.",
      image: require("../../../assets/images/jan.png"),
    },
    {
      name: "Jan Schilder",
      title: "Loodgieter",
      description:
        "Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.",
      image: require("../../../assets/images/jan.png"),
    },
    {
      name: "Jan Schilder",
      title: "Loodgieter",
      description:
        "Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.",
      image: require("../../../assets/images/jan.png"),
    },
  ],
};

const windowWidth = Dimensions.get("window").width;

const HomeOwnerResults = ({ navigation }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    Array(5).fill(false)
  );

  const selectedCount = selectedCheckboxes.filter(
    (checkbox) => checkbox
  ).length;

  const toggleCheckbox = (index) => {
    const updatedCheckboxes = [...selectedCheckboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setSelectedCheckboxes(updatedCheckboxes);
  };

  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.view}>
            <View style={styles.topContainer}>
              <Text style={[styles.bigTitle]}>
                Maak een selectie uit de beste{"\n"}professionals in uw omgeving
              </Text>
            </View>
            <View style={styles.container}>
              <Icon name="tune" size={55} color="black" />
              <View style={styles.blueBox}>
                <Text style={styles.textButtonBlack}>
                  Selecteer meerdere professionals om sneller een reactie op uw
                  klus te krijgen.
                </Text>
              </View>
            </View>

            <View style={styles.middleContainer}>
              {professionals.professional.map((professional, index) => (
                <View style={styles.middleContainerFirstSection} key={index}>
                  <Image style={styles.image} source={professional.image} />
                  <View style={styles.orange}>
                    <View style={styles.green}>
                      <Text style={styles.text}>{professional.name}</Text>
                      <Text style={styles.title}>{professional.title}</Text>
                      <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={20} color="#FFD700" />
                        <Ionicons name="star" size={20} color="#FFD700" />
                        <Ionicons name="star" size={20} color="#FFD700" />
                        <Ionicons name="star" size={20} color="#FFD700" />
                        <Ionicons
                          name="star-outline"
                          size={20}
                          color="#FFD700"
                        />
                      </View>
                    </View>
                    <View style={styles.yellow}>
                      <TouchableOpacity
                        onPress={() => toggleCheckbox(index)}
                        activeOpacity={1}
                        style={[
                          styles.checkbox,
                          selectedCheckboxes[index] ? styles.selected : null,
                        ]}
                      ></TouchableOpacity>
                    </View>
                    <Text
                      style={styles.lightTitle}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {professional.description}
                    </Text>
                  </View>
                </View>
              ))}
              <Pressable
                style={[
                  styles.nextButton,
                  selectedCount >= 1 ? styles.nextButtonColorOne : null,
                ]}
                onPress={() => {
                  if (selectedCount >= 1) {
                    navigation.goBack();
                  } else if (selectedCount === 0) {
                    Alert.alert("Selecteer minimaal één vakspecialist.");
                  }
                }}
              >
                <Text style={styles.whiteButtonText}>Bevestigen</Text>
              </Pressable>
              <View style={styles.footerfix}></View>
            </View>
          </View>
        </ScrollView>
        <Footer navigation={navigation} activePage="ChatOverview" />
      </SafeAreaView>
    </PaperProvider>
  );
};
const styles = StyleSheet.create({
  orange: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 10,
  },

  nextButton: {
    backgroundColor: "#B3B3B3",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: "center",
    width: 170,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  nextButtonColorOne: {
    backgroundColor: "#318ae5",
  },

  nextButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },

  whiteButtonText: {
    color: "#fff",
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "transparent",
  },

  selected: {
    backgroundColor: "#308AE4",
  },

  footerfix: {
    height: 80,
    width: windowWidth,
  },

  green: {
    height: "60%",
    width: "70%",
    display: "flex",
    justifyContent: "center",
  },

  yellow: {
    height: "60%",
    width: "30%",
    display: "flex",
    alignItems: "center",
    padding: 10,
  },

  middleContainerFirstSection: {
    width: windowWidth,
    height: 150,
    display: "flex",
    borderBottomWidth: 3,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    borderColor: "#f1f1f0",
  },

  view: {
    height: "100%",
    width: windowWidth,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },

  bigTitle: {
    color: "#303030",
    textAlign: "center",
    fontWeight: "bold",
  },

  notification: {
    width: 25,
    aspectRatio: 1 / 1,
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
    backgroundColor: "orange",
  },

  size: {
    flex: 1,
  },

  lightTitle: {
    fontSize: 13,
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 15,
    flexDirection: "column",
    borderBottomWidth: 6,
    borderBottomColor: "#f4f4f5",
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
    color: "#303030",
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

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 90,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  blueBox: {
    width: "75%",
    backgroundColor: "#e9f2fe",
    height: "70%",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
});

export default HomeOwnerResults;
