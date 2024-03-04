import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, Pressable, ScrollView, TouchableOpacity, Image, } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Footer = ({ navigation }) => {
  const [isSwitchOn1, setIsSwitchOn1] = useState(false);
  const [isSwitchOn2, setIsSwitchOn2] = useState(false);

  const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);
  const onToggleSwitch2 = () => setIsSwitchOn2(!isSwitchOn2);

  return (
    
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerImage}
            onPress={() => navigation.navigate('Page1')}
          >
            <Image
              source={require("../../assets/images/footerhouse.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerImage}
            onPress={() => navigation.navigate('ChatNavigation')}
          >
            <Image
              source={require("../../assets/images/footerchat.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerImage}
            onPress={() => navigation.navigate("../../assets/images/footerchat.png")}
          >
            <Image
              source={require("../../assets/images/footericonblue.png")}
              style={styles.image}
            />
          </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
        alignItems: "flex-start",
    paddingTop: 12,
    height: 81,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#308AE4",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  footerImage: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    objectFit: "contain", 
    height: 30, 
    },
  
    footerImage2: {
        objectFit: "contain",
        height: 50,
      },

  footerText: {
    fontSize: 16,
    color: "black",
  },

});

export default Footer;
