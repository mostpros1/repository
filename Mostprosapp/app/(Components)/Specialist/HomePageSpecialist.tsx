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
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
    view: {
        height: windowHeight,
        width: windowWidth,
        display: "flex",
        alignItems: "center",
    },

    smallCircle: {
        width: 25,
        height: 25,
        borderRadius: 25,
        backgroundColor: "#308AE4",
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

    whiteBoldText:{
        fontSize: 20,
        color: "#fffefe",
        fontFamily: "bold",
    },

    container: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#f5f5f9",
        backgroundColor: "#fffefe",
        height: 40,
        borderRadius: 10,
        padding: 10,
        width: "75%",
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

    textSearchWrapper:{
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

    headerSquare:{
        height: 350,
        width: windowWidth,
        backgroundColor: "#74bcfd",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },

    logoNotificationWrapper:{
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
        width: 170, 
        height: 100,
        resizeMode: "contain", 
    },

    iconContainer: {
        position: "absolute",
        right: 25, 
        bottom: 56, 
    },
});

export default HomePageSpecialist;
