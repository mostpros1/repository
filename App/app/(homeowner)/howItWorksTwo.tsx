import { Link } from "expo-router";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Pressable, Image, ImageBackground, } from "react-native";
const StartPage = () => {
    return (
        <SafeAreaView style={styles.view}>
            <Link style={styles.button} href="/home">
                <Text style={styles.text}>Overslaan</Text>
            </Link>
            <View style={styles.viewContainer1}>
                <Image style={styles.img} source={require("../../assets/images/howItWorksOne.png")} />
            </View>
            <Text style={styles.example}>TWO</Text>
            <View style={styles.viewContainer1}>
                <View>
                
                </View>
                <View>

                </View>
                <View>

                </View>
                <View>
                    <Link style={styles.buttonNext} href="/howItWorksThree">
                        <Text style={styles.textButton}>Volgende</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    welkom: {
        fontSize: 40,
    },
    example: {
        fontSize: 40,
    },
    viewContainer1: {
        paddingTop: 150,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
    },
    img: {
        width: 400,
        height: 200,
        resizeMode: "cover",
        alignItems: "center",
    },
    view: {
        flex: 1,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "#308AE4",
        width: 90,
        height: 40,
    },
    buttonNext: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        backgroundColor: "#308AE4",
        width: 300,
        height: 60,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "black",
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
});

export default StartPage;