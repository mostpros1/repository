import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, } from "react-native";
import { Dimensions } from "react-native";

const Footer = ({ navigation, activePage }) => {

  return (

    <View style={styles.footer}>
      <TouchableOpacity testID="footer homeBtn"
        style={styles.footerImage}
        onPress={() => navigation.navigate('HomePageSpecialist')}
      >
        {activePage === 'HomePageSpecialist' ? (
          <Image
            source={require("../../assets/images/footerhouseblue.png")}
            style={styles.image}
          />
        ) : (
          <Image
            source={require("../../assets/images/footerhouse.png")}
            style={styles.image}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity testID="footer chatOverviewBtn"
        style={styles.footerImage}
        onPress={() => navigation.navigate('ChatOverview')}
      >
        {activePage === 'ChatOverview' ? (
          <Image
            source={require("../../assets/images/footerchatblue.png")}
            style={styles.image}
          />
        ) : (
          <Image
            source={require("../../assets/images/footerchat.png")}
            style={styles.image}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity testID="footer profileBtn"
        style={styles.footerImage}
        onPress={() => navigation.navigate('ProfileSettingsOne')}
      >
        {activePage === 'Profile' ? (
          <Image
            source={require("../../assets/images/footericonblue.png")}
            style={styles.image}
          />
        ) : (
          <Image
            source={require("../../assets/images/footericon.png")}
            style={styles.image}
          />
        )}
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
  footerText: {
    fontSize: 16,
    color: "black",
  },
});

export default Footer;
