import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";
const StartPage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.view}>
      <ImageBackground
        source={require("../../../assets/images/welkomBackground.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.standardContainer}>
          <View style={styles.sectionContainer}>
            <Pressable style={styles.link} onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.text]}>Login </Text>
            </Pressable>
            <Pressable style={styles.link} onPress={() => navigation.navigate('Register')}>
                <Text style={[styles.text]}>Register</Text>
            </Pressable>
            <Pressable style={styles.link} onPress={() => navigation.navigate('Profile')}>
                <Text style={[styles.text]}>Profile</Text>
            </Pressable>
            <Pressable style={styles.link} onPress={() => navigation.navigate('ProfileSettingsOne')}>
                <Text style={[styles.text]}>ProfileSettingsOne</Text>
            </Pressable>
            <Pressable style={styles.link} onPress={() => navigation.navigate('ProfileSettingsTwo')}>
                <Text style={[styles.text]}>ProfileSettingsTwo</Text>
            </Pressable>
            <Pressable style={styles.link} onPress={() => navigation.navigate('ProfileSecurity')}>
                <Text style={[styles.text]}>ProfileSecurity</Text>
            </Pressable>
            <Pressable style={styles.link} onPress={() => navigation.navigate('ProfileNotifications')}>
                <Text style={[styles.text]}>ProfileNotifications</Text>
            </Pressable>
            <Pressable style={styles.link} onPress={() => navigation.navigate('ProfileGeneralSettings')}>
                <Text style={[styles.text]}>ProfileGeneralSettings</Text>
            </Pressable>
            <Pressable style={styles.link} onPress={() => navigation.navigate('ChatOverview')}>
                <Text style={[styles.text]}>ChatOverview</Text>
            </Pressable>
            <Pressable style={styles.link} onPress={() => navigation.navigate('HomePageSpecialist')}>
                <Text style={[styles.text]}>HomePageSpecialist</Text>
            </Pressable>
            <Pressable style={styles.link} onPress={() => navigation.navigate('ProfilePrivacy')}>
                <Text style={[styles.text]}>ProfilePrivacy</Text>
            </Pressable>
            <Pressable style={styles.link} onPress={() => navigation.navigate('ProfileAbout')}>
                <Text style={[styles.text]}>ProfileAbout</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  standardContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "35%",
  },
  sectionContainer: {
    height: "32%",
  },
  welkom: {
    fontSize: 40,
  },
  img: {
    width: 380,
  },
  link: {
    borderRadius: 10,
    backgroundColor: "#308AE4",
    width: 300,
    textAlign: "center",
    padding: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default StartPage;
