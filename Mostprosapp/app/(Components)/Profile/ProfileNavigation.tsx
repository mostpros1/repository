import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    ImageBackground,
    Pressable,
  } from "react-native";
  const ProfileNavigation = ({navigation}) => {
    return (
      <SafeAreaView style={styles.view}>
        <ImageBackground
          source={require("../../../assets/images/welkomBackground.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.standardContainer}>
            <View style={styles.sectionContainer}>
              <Pressable style={styles.link} onPress={() => navigation.navigate('Profile')}>
                  <Text style={[styles.text]}>Profile</Text>
              </Pressable>
              <Pressable style={styles.link} onPress={() => navigation.navigate('ProfileAbout')}>
                  <Text style={[styles.text]}>About</Text>
              </Pressable>
              <Pressable style={styles.link} onPress={() => navigation.navigate('ProfileGeneralSettings')}>
                  <Text style={[styles.text]}>Settings</Text>
              </Pressable>
              <Pressable style={styles.link} onPress={() => navigation.navigate('ProfileNotifications')}>
                  <Text style={[styles.text]}>Notifications</Text>
              </Pressable>
              <Pressable style={styles.link} onPress={() => navigation.navigate('ProfilePrivacy')}>
                  <Text style={[styles.text]}>Privacy</Text>
              </Pressable>
              <Pressable style={styles.link} onPress={() => navigation.navigate('ProfileSecurity')}>
                  <Text style={[styles.text]}>Security</Text>
              </Pressable>
              <Pressable style={styles.link} onPress={() => navigation.navigate('ProfileSettingsOne')}>
                  <Text style={[styles.text]}>ProfileSettingsOne</Text>
              </Pressable>
              <Pressable style={styles.link} onPress={() => navigation.navigate('ProfileSettingsTwo')}>
                  <Text style={[styles.text]}>ProfileSettingsTwo</Text>
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
      gap: 8,
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
  
  export default ProfileNavigation;
  