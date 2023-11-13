import { Link } from "expo-router";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Pressable, Image, ImageBackground, } from "react-native";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const StartPage = () => {
    return (
        <SafeAreaView style={styles.view}>
            <View style={styles.topContainer}>
                <View style={styles.standardContainer}>
                    <View style={[styles.button, styles.skipButton]} >
                        <Link href="/home">
                            <Text style={[styles.text]}>Overslaan</Text>
                        </Link>
                    </View>
                </View>
                <View>
                    <Image style={styles.image} source={require("../../assets/images/howItWorksOne.png")} />
                </View>
            </View>
            
            <View style={styles.middleContainer}>
                <View style={styles.middleContainerFirstSection}>
                    <Image source={require("../../assets/images/one.png")} />
                    <Text style={styles.title}>Beschrijf je klus</Text>
                </View>
                <View style={styles.middleContainerSecondSection}>
                    <Text>Voer in de zoekbalk je klus in, noteer je postcode en geef een beschrijving van de gewenste werkzaamheden. Let op: U dient aan het einde in te loggen om aanbod te ontvangen.</Text>
                </View>
            </View>
            <Link style={styles.link} href="/howItWorksTwo">
                <Text style={[styles.text, styles.textNext]}>Volgende</Text>
            </Link>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    view: {
        height: windowHeight,
        width: windowWidth,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#E9F4FF",
    },
    standardContainer: {
        width: windowWidth,
        display: "flex",
        alignItems: "flex-end",
    },
    topContainer: {
        width: 700,
        height: 420,
        display: "flex",
        backgroundColor: "white",
        alignItems: "center",
        borderBottomEndRadius: 400,
        borderBottomStartRadius: 400,
    },
    middleContainer: {
        display: "flex",
        alignItems: "flex-start",
        width: "75%",
    },
    middleContainerFirstSection: {
        display: "flex",
        flexDirection: "row",
        marginTop: 30,
        gap: 10,
    },
    middleContainerSecondSection: {
        display: "flex",
        flexDirection: "row",
        marginTop: 30,
    },
    image: {
        marginBottom: 20,
    },
    button: {
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    skipButton: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#308AE4",
        maxWidth: 90,
        maxHeight: 40,
        padding: 6,
        margin: 30,
    },
    link: {
        borderRadius: 10,
        backgroundColor: "#308AE4",
        width: 300,
        textAlign: "center",
        padding: 20,
        bottom: -160,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
    },
    textNext: {
        color: "white"
    },
    title: {
        fontSize: 20,
    },
    nextButtonText: {
        color: "white"
    },
});

export default StartPage;