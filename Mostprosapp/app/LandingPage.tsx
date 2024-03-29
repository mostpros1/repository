import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
    Pressable,
    Image,
    ImageBackground,
  } from "react-native";
  
  const LandingPage = ({navigation}) => {
   
    return (
      <SafeAreaView style={styles.view}>
        <ImageBackground
          source={require("../assets/images/welkomBackground.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.standardContainer}>
            <View style={styles.sectionContainer}>
              <Image
                style={styles.img}
                source={require("../assets/images/logo.png")}
              />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.welkom}> Welkom</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Pressable style={styles.link} onPress={() => navigation.navigate('KeuzePage')}>
                <Text style={styles.text}>Start</Text>
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
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
  });
  
  export default LandingPage;
  