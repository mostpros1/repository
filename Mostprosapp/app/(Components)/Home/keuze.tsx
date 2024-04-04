import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Pressable, Image, ImageBackground, } from "react-native";
const KeuzePage = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        <View style={styles.viewContainer1}>
          <Image style={styles.img} source={require("../../../assets/images/logo2.png")} />
        </View>
        <View style={styles.viewContainer1}>
          <Text style={styles.welkom}>Maak alstublieft uw keuze:</Text>
        </View>
        <View style={styles.viewContainer1}>
          <Pressable style={styles.button} onPress={() => navigation.navigate('HowItWorksOneHomeowner')}>
            <Text style={styles.text}>Ik ben een huiseigenaar</Text>
          </Pressable>
          <Pressable style={styles.buttonTwo} onPress={() => navigation.navigate('HowItWorksOneSpecialist')}>
            <Text style={styles.textTwo}>Ik ben een professional</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welkom: {
    fontSize: 20,
  },
  viewContainer1: {
    paddingTop: 100,
  },
  container: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  img: {
    width: 400,
  },
  view: {
    flex: 1,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#308AE4",
    width: 300,
    textAlign: "center",
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTwo: {
    marginTop: 30,
    borderWidth: 2,
    borderColor: "#308AE4",
    borderRadius: 10,
    backgroundColor: "white",
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
  textTwo: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#308AE4",
  },
});

export default KeuzePage;
