import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { Dimensions } from "react-native";

const Footer = ({ navigation, activePage }) => {

  return (
    
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerImage}
        onPress={() => navigation.navigate('TestHome')}
      >
        <View style={styles.iconContainer}>
          <Image
            source={activePage === 'HomePageSpecialist' ? require("../../assets/images/footerhouseblue.png") : require("../../assets/images/footerhouse.png")}
            style={styles.image}
          />
          <Text style={styles.footerText}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerImage}
        onPress={() => navigation.navigate('ChatOverview')}
      >
        <View style={styles.iconContainer}>
          <Image
            source={activePage === 'ChatOverview' ? require("../../assets/images/footerchatblue.png") : require("../../assets/images/footerchat.png")}
            style={styles.image}
          />
          <Text style={styles.footerText}>Chat</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerImage}
        onPress={() => navigation.navigate('ProfileSettingsOne')}
      >
        <View style={styles.iconContainer}>
          <Image
            source={activePage === 'Profile' ? require("../../assets/images/footericonblue.png") : require("../../assets/images/footericon.png")}
            style={styles.image}
          />
          <Text style={styles.footerText}>Profiel</Text>
        </View>
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
  iconContainer: {
    alignItems: "center",
  },
  image: {
    objectFit: "contain", 
    height: 30, 
  },
  footerText: {
    fontSize: 12,
    color: "black",
    marginTop: 3,
  },
});

export default Footer;
