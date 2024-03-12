import React, { useState } from "react";
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
  Linking,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons";
import Footer from '../Footer'; 

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const handlePhonePress = () => {
  Linking.openURL('tel:+31(Remove brackets and insert phone number. No spaces.)');
};

const Profile = ({ navigation }) => {

  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleImagePress = (image) => {
    setEnlargedImage(image);
  };

  const handleCloseModal = () => {
    setEnlargedImage(null);
  };

  const portfolioImages = [
    require("../../../assets/images/contractor.png"),
    require("../../../assets/images/dronepilot.png"),
    require("../../../assets/images/plasterer.png"),
    require("../../../assets/images/windowframespecialist.png"),
    require("../../../assets/images/bathroomspecialist.png"),
  ];

  return (
    <PaperProvider>
      <SafeAreaView style={styles.scrollViewContainer}>

        <ScrollView style={styles.scrollContainer}>
          <View style={styles.view}>
            <View style={styles.topContainer}>
              <View style={styles.topButtonsContainer}>
                <Pressable style={[styles.linkOne, styles.returnButton]} onPress={() => navigation.navigate('')}>
                  <Icon name="arrow-back" size={35} color="white" />
                </Pressable>
                <Pressable style={[styles.linkOne, styles.favouriteButton]} onPress={() => navigation.navigate('')}>
                  <Icon name="favorite-border" size={35} color="white" />
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
                  <Icon name="location-on" size={20} color="white" />
                  Amsterdam, Noord-Holland
                </Text>
                <View style={styles.starWrapper}>
                  <Icon name="star" size={20} color="#f9c339" />
                  <Icon name="star" size={20} color="#f9c339" />
                  <Icon name="star" size={20} color="#f9c339" />
                  <Icon name="star" size={20} color="#f9c339" />
                  <Icon name="star-half" size={20} color="#f9c339" />
                  <Text style={[styles.rating]}>(4,6)</Text>
                </View>
              </View>
            </View>

            <View style={styles.middleContainer}>
              <View style={styles.middleContainerFirstSection}>
                <Pressable style={[styles.linkTwo, styles.agendaButton]} onPress={() => navigation.navigate('ProfileSettingsTwo')}>
                  <Icon name="calendar-today" size={25} color="white" />
                  <Text style={[styles.text, styles.textButtonWhite]}>Beschikbaarheid</Text>
                </Pressable>
              </View>
              <View style={styles.middleContainerSecondSection}>
                <Text style={styles.title}>Over</Text>
                <Text>
                  Hallo, ik ben Jan.

                  Ik werk al meer dan 10 jaar als loodgieter en heb aan diverse projecten gewerkt. Met ruime ervaring in allerlei loodgietersklussen sta ik klaar om je te helpen. Als je hulp nodig hebt, neem dan gerust direct contact met me op.
                </Text>
              </View>
            </View>

            <View style={styles.bottomContainer}>
              <Text style={styles.title}>Portfolio</Text>
              <View style={styles.bottomContainerFirstSection}>
                <ScrollView horizontal>
                  {portfolioImages.map((image, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.portfolioContainer}
                      onPress={() => handleImagePress(image)}
                    >
                      <Image
                        style={styles.image}
                        source={image}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.bottomContainerSecondSection}>
                <Pressable style={[styles.linkOne, styles.callButton]} onPress={handlePhonePress}>
                  <Icon name="call" size={30} color="green" />
                  <Text style={[styles.text, styles.textButtonBlack]}>Bellen</Text>
                </Pressable>
                <Pressable style={[styles.linkOne, styles.messageButton]} onPress={() => navigation.navigate('')}>
                  <Icon name="message" size={30} color="#308AE4" />
                  <Text style={[styles.text, styles.textButtonBlack]}>Bericht sturen</Text>
                </Pressable>
              </View>
              <View style={[styles.footerfix]}></View>
            </View>
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={enlargedImage !== null}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={handleCloseModal}
            >
              <Icon name="close" size={30} color="white" />
            </TouchableOpacity>
            <Image
              style={styles.enlargedImage}
              source={enlargedImage}
            />
          </View>
        </Modal>
        <Footer navigation={navigation} activePage="Profile" />

      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({

  container: {
    backgroundColor: "orange",
    flex: 1,
  },

    scrollContainer: {
    flexGrow: 1,
    paddingBottom: 120, // Adjust this value based on your footer height
  },

  scrollViewContainer: {
    flexGrow: 1,
    height: "100%",
  },

  view: {
    alignItems: "center",
    backgroundColor: "white",
  },

  footerfix: {
    marginTop: 50,
    height: 90,
    width: windowWidth,
  },
  
  topContainer: {
    width: 700,
    height: 400,
    display: "flex",
    backgroundColor: "#308AE4",
    alignItems: "center",
    flexDirection: "column",
    borderBottomEndRadius: 250,
    borderBottomStartRadius: 250,
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
    backgroundColor: "transparent",
    width: 60,
    textAlign: "center",
  },
  favouriteButton: {
    backgroundColor: "transparent",
    width: 60,
    textAlign: "center",
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
    marginTop: 15,
    gap: 2,
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
  starWrapper: {
    flexDirection: "row",
  },
  rating: {
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
  agendaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  middleContainerSecondSection: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: 120,
    gap: 20,
  },
  bottomContainer: {
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
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
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
    borderRadius: 10,
    backgroundColor: "#308AE4",
    width: 250,
    textAlign: "center",
    padding: 10,
    bottom: -60,
    alignItems: "center",
  },
  linkTwo: {
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
    height: 70,
    textAlign: "center",
    padding: 20,
    bottom: -60,
    borderWidth: 2,
    borderColor: '#308AE4',
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
  messageButton: {
    borderRadius: 10,
    backgroundColor: "transparent",
    width: 150,
    height: 70,
    textAlign: "center",
    padding: 20,
    bottom: -60,
    borderWidth: 2,
    borderColor: '#308AE4',
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
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

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  modalCloseButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  enlargedImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default Profile;