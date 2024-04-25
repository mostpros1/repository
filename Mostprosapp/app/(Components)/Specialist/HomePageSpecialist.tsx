import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Dimensions } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { specialists } from "../../specialists.js";
import Icon from "@expo/vector-icons/MaterialIcons";
import { FontAwesome5 } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../Footer";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomePageSpecialist = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputText, setInputText] = useState("");
  const [isScannerVisible, setIsScannerVisible] = useState(false);

  const handleInputChange = useCallback((text) => {
    setInputText(text);
  }, []);

  const handleInputFocus = useCallback(() => {
    setShowOptions(true);
  }, []);

  const handleOptionPress = useCallback((option) => {
    setInputText(option.title);
    setSelectedOption(option);
    setShowOptions(false);
  }, []);

  const handleOutsidePress = useCallback(() => {
    Keyboard.dismiss();
    setShowOptions(false);
  }, []);

  const handleForwardButtonPress = useCallback(() => {
    if (!selectedOption) {
      setErrorMessage("Kies eerst een Professional");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }
    navigation.navigate("HomeOwnerPostalCode", { selectedOption });
  }, [navigation, selectedOption]);

  const handlePress = useCallback(
    (text) => {
      navigation.navigate("HomeOwnerPostalCode", { parameterName: text });
    },
    [navigation]
  );

  const handleScannerOpen = useCallback(() => {
    setIsScannerVisible(true);
  }, []);

  const handleScannerClose = useCallback(() => {
    setIsScannerVisible(false);
  }, []);

  const handleBarCodeScanned = useCallback(({ type, data }) => {
    alert(`Scanned data: ${data}`);
  }, []);

  const filteredOptions = useMemo(() => {
    return specialists.filter((option) =>
      option.title.toLowerCase().includes(inputText.toLowerCase())
    );
  }, [inputText]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleOutsidePress
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, [handleOutsidePress]);

  return (
    <PaperProvider>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <SafeAreaView>
          <ScrollView>
            <View style={[styles.view]}>
              <View style={[styles.headerSquare]}>
                <View style={[styles.logoNotificationWrapper]}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={require("../../../assets/images/logo.png")}
                    />
                  </View>
                  <View style={styles.iconContainer}>
                    <Icon name="notifications" size={45} color="white" />
                  </View>
                </View>
                <View style={[styles.textSearchWrapper]}>
                  <Pressable
                    style={styles.container}
                    onPress={handleForwardButtonPress}
                  >
                    <TextInput
                      placeholder="Zoeken:"
                      style={styles.input}
                      onChangeText={handleInputChange}
                      onFocus={handleInputFocus}
                      value={inputText}
                    />
                    <Icon name="forward" size={25} color="#318ae5" />
                  </Pressable>
                </View>
                <View style={[styles.iconsText]}>
                  <Pressable
                    style={[styles.iconsTextWrapper]}
                    onPress={handleScannerOpen}
                  >
                    <Icon name="qr-code" size={50} color="#f7fbff" />
                    <Text style={[styles.whiteIconText]}>Scan</Text>
                  </Pressable>
                  <Pressable style={[styles.iconsTextWrapper]}>
                  <Icon name="local-parking" size={50} color="#f7fbff" />
                  <Text style={[styles.whiteIconText]}>Parkeren</Text>
                </Pressable>
                  <Pressable style={[styles.iconsTextWrapper]}>
                    <Icon name="construction" size={50} color="#f7fbff" />
                    <Text style={[styles.whiteIconText]}>Klussen</Text>
                  </Pressable>
                  <Pressable style={[styles.iconsTextWrapper]}>
                    <FontAwesome5 name="wallet" size={50} color="#f7fbff" />
                    <Text style={[styles.whiteIconText]}>Wallet</Text>
                  </Pressable>
                </View>
                <Pressable
                  testID="klusVindBtn"
                  style={[styles.searchBar]}
                  onPress={() => navigation.navigate("Login")}
                >
                  <View style={styles.smallCircle}>
                    <Icon name="add" size={28} color="#308AE4" />
                  </View>
                  <Text style={[styles.whiteIconText]}>
                    Nieuwe klus vinden
                  </Text>
                </Pressable>
              </View>
              <View style={[styles.titleWrap]}>
                <Text style={[styles.blackTitle]}>Populaire Klussen</Text>
              </View>
              <View style={[styles.iconsText]}>
                <Pressable
                  style={[styles.iconsTextWrapper]}
                  onPress={() => handlePress("Hovenier")}
                >
                  <Icon name="grass" size={50} color="#4999e7" />
                  <Text style={[styles.blackIconText]}>Hovenier</Text>
                </Pressable>
                <Pressable
                  style={[styles.iconsTextWrapper]}
                  onPress={() => handlePress("Elektricien")}
                >
                  <Icon name="lightbulb" size={50} color="#4999e7" />
                  <Text style={[styles.blackIconText]}>Elektricien</Text>
                </Pressable>
                <Pressable
                  style={[styles.iconsTextWrapper]}
                  onPress={() => handlePress("Dakdekker")}
                >
                  <Icon name="house" size={50} color="#4999e7" />
                  <Text style={[styles.blackIconText]}>Dekker</Text>
                </Pressable>
                <Pressable
                  style={[styles.iconsTextWrapper]}
                  onPress={() => handlePress("Schoonmaker")}
                >
                  <Icon name="sanitizer" size={50} color="#4999e7" />
                  <Text style={[styles.blackIconText]}>Schoonmaker</Text>
                </Pressable>
              </View>
              <View style={[styles.cardWrapper]}>
                <View style={[styles.card]}>
                  <View style={[styles.cardFirstHalf]}>
                    <Image
                      style={styles.image}
                      source={require("../../../assets/images/howToStart.png")}
                    />
                  </View>
                  <View style={[styles.cardSecondHalf]}>
                    <Text style={[styles.cardTitle]}>
                      Hoe aan de slag {"\n"} gaan
                    </Text>
                    <Pressable>
                      <Text style={[styles.blueText]}>Meer info</Text>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.cardProffesional}>
                  <View style={styles.titleKmWrapper}>
                    <Text style={[styles.cardTitle]}>Mark van bomen</Text>
                    <View style={styles.kmWrapper}>
                      <Ionicons name="location" size={24} color="#308AE4" />
                      <Text>1.0 KM</Text>
                    </View>
                  </View>
                  <View style={styles.twoTextWrapper}>
                    <Text style={styles.textBold}>
                      Kapotte leiding maken en lekkage verhelpen.
                    </Text>
                    <Text style={styles.textLight}>
                      De leiding is niet meer in goede staat deze moet vervangen
                      worden en....
                    </Text>
                  </View>

                  <View style={styles.locationTimeInfoWrapper}>
                    <Pressable style={styles.kmWrapper}>
                      <Ionicons name="location" size={32} color="#308AE4" />
                      <Text>Locatie: Amsterdam</Text>
                    </Pressable>
                    <Pressable style={styles.kmWrapper}>
                      <Ionicons name="location" size={32} color="#308AE4" />
                      <Text>Binnen een maand</Text>
                    </Pressable>
                  </View>
                  <Pressable style={styles.moreInfo}>
                    <Text
                      style={styles.link}
                      onPress={() => navigation.navigate("MyWork")}
                    >
                      Meer info
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.cardProffesional}>
                  <View style={styles.titleKmWrapper}>
                    <Text style={[styles.cardTitle]}>Mark van bomen</Text>
                    <View style={styles.kmWrapper}>
                      <Ionicons name="location" size={24} color="#308AE4" />
                      <Text>1.0 KM</Text>
                    </View>
                  </View>
                  <View style={styles.twoTextWrapper}>
                    <Text style={styles.textBold}>
                      Kapotte leiding maken en lekkage verhelpen.
                    </Text>
                    <Text style={styles.textLight}>
                      De leiding is niet meer in goede staat deze moet vervangen
                      worden en....
                    </Text>
                  </View>

                  <View style={styles.locationTimeInfoWrapper}>
                    <Pressable style={styles.kmWrapper}>
                      <Ionicons name="location" size={32} color="#308AE4" />
                      <Text>Locatie: Amsterdam</Text>
                    </Pressable>
                    <Pressable style={styles.kmWrapper}>
                      <Ionicons name="location" size={32} color="#308AE4" />
                      <Text>Binnen een maand</Text>
                    </Pressable>
                  </View>
                  <Pressable style={styles.moreInfo}>
                    <Text
                      style={styles.link}
                      onPress={() => navigation.navigate("MyWork")}
                    >
                      Meer info
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.cardProffesional}>
                  <View style={styles.titleKmWrapper}>
                    <Text style={[styles.cardTitle]}>Mark van bomen</Text>
                    <View style={styles.kmWrapper}>
                      <Ionicons name="location" size={24} color="#308AE4" />
                      <Text>1.0 KM</Text>
                    </View>
                  </View>
                  <View style={styles.twoTextWrapper}>
                    <Text style={styles.textBold}>
                      Kapotte leiding maken en lekkage verhelpen.
                    </Text>
                    <Text style={styles.textLight}>
                      De leiding is niet meer in goede staat deze moet vervangen
                      worden en....
                    </Text>
                  </View>

                  <View style={styles.locationTimeInfoWrapper}>
                    <Pressable style={styles.kmWrapper}>
                      <Ionicons name="location" size={32} color="#308AE4" />
                      <Text>Locatie: Amsterdam</Text>
                    </Pressable>
                    <Pressable style={styles.kmWrapper}>
                      <Ionicons name="location" size={32} color="#308AE4" />
                      <Text>Binnen een maand</Text>
                    </Pressable>
                  </View>
                  <Pressable style={styles.moreInfo}>
                    <Text
                      style={styles.link}
                      onPress={() => navigation.navigate("MyWork")}
                    >
                      Meer info
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.cardProffesional}>
                  <View style={styles.titleKmWrapper}>
                    <Text style={[styles.cardTitle]}>Mark van bomen</Text>
                    <View style={styles.kmWrapper}>
                      <Ionicons name="location" size={24} color="#308AE4" />
                      <Text>1.0 KM</Text>
                    </View>
                  </View>
                  <View style={styles.twoTextWrapper}>
                    <Text style={styles.textBold}>
                      Kapotte leiding maken en lekkage verhelpen.
                    </Text>
                    <Text style={styles.textLight}>
                      De leiding is niet meer in goede staat deze moet vervangen
                      worden en....
                    </Text>
                  </View>

                  <View style={styles.locationTimeInfoWrapper}>
                    <Pressable style={styles.kmWrapper}>
                      <Ionicons name="location" size={32} color="#308AE4" />
                      <Text>Locatie: Amsterdam</Text>
                    </Pressable>
                    <Pressable style={styles.kmWrapper}>
                      <Ionicons name="location" size={32} color="#308AE4" />
                      <Text>Binnen een maand</Text>
                    </Pressable>
                  </View>
                  <Pressable style={styles.moreInfo}>
                    <Text
                      style={styles.link}
                      onPress={() => navigation.navigate("MyWork")}
                    >
                      Meer info
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.cardProffesional}>
                  <View style={styles.titleKmWrapper}>
                    <Text style={[styles.cardTitle]}>Mark van bomen</Text>
                    <View style={styles.kmWrapper}>
                      <Ionicons name="location" size={24} color="#308AE4" />
                      <Text>1.0 KM</Text>
                    </View>
                  </View>
                  <View style={styles.twoTextWrapper}>
                    <Text style={styles.textBold}>
                      Kapotte leiding maken en lekkage verhelpen.
                    </Text>
                    <Text style={styles.textLight}>
                      De leiding is niet meer in goede staat deze moet vervangen
                      worden en....
                    </Text>
                  </View>

                  <View style={styles.locationTimeInfoWrapper}>
                    <Pressable style={styles.kmWrapper}>
                      <Ionicons name="location" size={32} color="#308AE4" />
                      <Text>Locatie: Amsterdam</Text>
                    </Pressable>
                    <Pressable style={styles.kmWrapper}>
                      <Ionicons name="location" size={32} color="#308AE4" />
                      <Text>Binnen een maand</Text>
                    </Pressable>
                  </View>
                  <Pressable style={styles.moreInfo}>
                    <Text
                      style={styles.link}
                      onPress={() => navigation.navigate("MyWork")}
                    >
                      Meer info
                    </Text>
                  </Pressable>
                </View>
                <View style={[styles.footerfix]}></View>
              </View>
            </View>
          </ScrollView>
          {showOptions && (
            <ScrollView style={styles.optionsContainer}>
              {filteredOptions.map((option) => (
                <Pressable
                  key={option.id}
                  style={styles.option}
                  onPress={() => handleOptionPress(option)}
                >
                  <Text>{option.title}</Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
          {errorMessage ? (
            <View style={styles.errorMessageContainer}>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
          ) : null}

          {!isScannerVisible && (
            <Footer navigation={navigation} activePage="HomePageSpecialist" />
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
      {isScannerVisible && (
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <Pressable
            onPress={handleScannerClose}
            style={styles.closeScannerButton}
          >
            <Text style={styles.closeScannerButtonText}>Close Scanner</Text>
          </Pressable>
        </View>
      )}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    height: "100%",
    width: windowWidth,
    display: "flex",
    alignItems: "center",
  },

  locationTimeInfoWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: 20,
  },

  moreInfo: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  cardProffesional: {
    width: windowWidth - 30,
    borderRadius: 9,
    marginBottom: 12,
    paddingTop: 13,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    backgroundColor: "white",
  },

  link: {
    color: "#308AE4",
  },

  textBold: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },

  textLight: {
    fontSize: 15,
    textAlign: "center",
    color: "#8B8D96",
  },

  twoTextWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 20,
    gap: 10,
    paddingTop: 10,
  },

  kmWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  titleKmWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 20,
  },

  scannerContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    zIndex: 999,
  },

  closeScannerButton: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeScannerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  optionsContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 234 : 190,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    maxHeight: windowHeight * 0.3,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  footerfix: {
    height: 60,
    width: windowWidth,
  },
  option: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
  errorMessageContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
  },
  cardFirstHalf: {
    width: 170,
    height: 110,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b5dcff",
  },

  cardSecondHalf: {
    width: 170,
    height: 90,
    backgroundColor: "#fcfdfc",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  card: {
    width: 170,
    height: 200,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  cardWrapper: {
    width: windowWidth,
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 25,
  },

  titleWrap: {
    width: windowWidth,
    height: 65,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingLeft: 20,
  },

  searchBar: {
    width: "70%",
    height: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "#308be5",
    borderRadius: 28,
    paddingLeft: 20,
    gap: 30,
  },

  iconsText: {
    marginTop: 15,
    width: windowWidth,
    height: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  iconsTextWrapper: {
    width: 90,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  whiteIconText: {
    fontSize: 14,
    color: "#f7fbff",
  },

  cardTitle: {
    textAlign: "center",
    color: "#303030",
    fontSize: 13,
  },

  cardBigTitle: {
    textAlign: "center",
    color: "#303030",
    fontSize: 18,
    fontWeight: "bold",
  },

  blueText: {
    textAlign: "center",
    color: "#308be5",
    fontSize: 13,
    fontWeight: "bold",
  },

  blackTitle: {
    fontSize: 16,
    color: "#414140",
    fontWeight: "bold",
  },

  blackIconText: {
    fontSize: 13,
    color: "#303030",
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
    width: 250,
    textAlign: "center",
    padding: 10,
    bottom: -60,
    alignItems: "center",
  },

  returnButton: {
    backgroundColor: "transparent",
    width: 60,
    textAlign: "center",
  },

  whiteBoldText: {
    fontSize: 20,
    color: "#fffefe",
    fontWeight: "bold",
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#f5f5f9",
    backgroundColor: "#fffefe",
    height: 40,
    borderRadius: 10,
    padding: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },

  textSearchWrapper: {
    width: windowWidth,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingLeft: 30,
    paddingRight: 30,
    gap: 20,
  },

  headerSquare: {
    height: 350,
    width: windowWidth,
    backgroundColor: "#74bcfd",
    display: "flex",
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    gap: 4,
  },

  logoNotificationWrapper: {
    width: windowWidth,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 25,
  },

  imageContainer: {
    height: 100,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  image: {
    height: "90%",
    resizeMode: "contain",
  },

  iconContainer: {
    position: "absolute",
    right: 25,
    bottom: 56,
  },
});

export default HomePageSpecialist;
