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
} from "react-native";
import { Dimensions } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomePageSpecialist = ({ navigation }) => {
  return (
    <PaperProvider>
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
                <Text style={[styles.whiteBoldText]}>Stad \/</Text>
                <View style={styles.container}>
                  <TextInput
                    placeholder="Zoeken"
                    style={styles.input}
                    onChangeText={(text) => {
                      // hier invullen wat er moet gebeuren met de input
                    }}
                  />
                  <Icon name="forward" size={25} color="#318ae5" />
                </View>
              </View>
              <View style={[styles.iconsText]}>
                <Pressable style={[styles.iconsTextWrapper]}>
                  <Icon name="scanner" size={50} color="#f7fbff" />
                  <Text style={[styles.whiteIconText]}>Scannen</Text>
                </Pressable>
                <Pressable style={[styles.iconsTextWrapper]}>
                  <Icon name="payment" size={50} color="#f7fbff" />
                  <Text style={[styles.whiteIconText]}>Betalingen</Text>
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
              <Pressable style={[styles.searchBar]}>
                <View style={styles.smallCircle}>
                  <Icon name="add" size={28} color="#308AE4" />
                </View>
                <Text style={[styles.whiteIconText]}>Klussen vinden</Text>
              </Pressable>
            </View>
            <View style={[styles.titleWrap]}>
              <Text style={[styles.blackTitle]}>Populaire Klussen</Text>
            </View>
            <View style={[styles.iconsText]}>
              <Pressable style={[styles.iconsTextWrapper]}>
                <Icon name="grass" size={50} color="#4999e7" />
                <Text style={[styles.blackIconText]}>Hovenier</Text>
              </Pressable>
              <Pressable style={[styles.iconsTextWrapper]}>
                <Icon name="lightbulb" size={50} color="#4999e7" />
                <Text style={[styles.blackIconText]}>Elektricien</Text>
              </Pressable>
              <Pressable style={[styles.iconsTextWrapper]}>
                <Icon name="house" size={50} color="#4999e7" />
                <Text style={[styles.blackIconText]}>Dekker</Text>
              </Pressable>
              <Pressable style={[styles.iconsTextWrapper]}>
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
                    <Text style={[styles.blueText]}>
                     Meer info
                    </Text>
                  </Pressable>
                </View>
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
              </View>
              <View style={[styles.card]}>
                <View style={[styles.cardFirstHalf]}>
                    <Text style={[styles.cardBigTitle]}>Badkamer</Text>
                </View>
                <View style={[styles.cardSecondHalf]}>
                  <Text style={[styles.cardTitle]}>
                    Hoe aan de slag {"\n"} gaan
                  </Text>
                  <Pressable>
                    <Text style={[styles.blueText]}>
                     Meer info
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View style={[styles.card]}>
                <View style={[styles.cardFirstHalf]}>
                    <Text style={[styles.cardBigTitle]}>Tuin</Text>
                </View>
                <View style={[styles.cardSecondHalf]}>
                  <Text style={[styles.cardTitle]}>
                    Hoe aan de slag {"\n"} gaan
                  </Text>
                  <Pressable>
                    <Text style={[styles.blueText]}>
                     Meer info
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View style={[styles.card]}>
                <View style={[styles.cardFirstHalf]}>
                    <Text style={[styles.cardBigTitle]}>Schuur</Text>
                </View>
                <View style={[styles.cardSecondHalf]}>
                  <Text style={[styles.cardTitle]}>
                    Hoe aan de slag {"\n"} gaan
                  </Text>
                  <Pressable>
                    <Text style={[styles.blueText]}>
                     Meer info
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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
  cardFirstHalf: {
    width: 170,
    height: 110,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
