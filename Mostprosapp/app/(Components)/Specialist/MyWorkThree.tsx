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
    TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons";
import Footer from "../Footer";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MyWorkThree = ({ navigation }) => {

    return (
        <PaperProvider>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.view}>
                        <View style={styles.topContainer}>
                            <View style={styles.topButtonsContainer}>
                                <Pressable
                                    style={[styles.linkOne, styles.returnButton]}
                                    onPress={() => navigation.navigate("")}
                                >
                                    <View style={styles.smallCircle}>
                                        <Icon name="arrow-back" size={28} color="#308AE4" />
                                    </View>
                                </Pressable>
                            </View>
                            <View style={styles.topContainerSecondSectionTwo}>
                                <Text style={[styles.name, styles.textBold]}>
                                    Klussen
                                </Text>
                            </View>
                        </View>

                        <View style={styles.topTitleBox}>
                            <Text style={styles.h1Title}>Uw huidige klus: Loodgieter werk</Text>
                        </View>

                        <View style={styles.bigCard}>
                            <View style={styles.textLine}>
                                <Text>Loodgieters werk: nieuwe leiding aanleggen</Text>
                                <View style={styles.line}></View>
                            </View>
                            <View style={styles.infoSubject}>
                                <Text style={styles.blackText}>Beschrijving</Text>
                                <View style={styles.textWrapper}>
                                    <Text style={styles.blackText}>Opdrachtnummer:</Text>
                                    <Text>234561</Text>
                                </View>
                                <Text style={styles.blackText}>Type klus:</Text>
                            </View>

                            <View style={styles.typeOfWorkWrapper}>
                                <View style={styles.typeOfWork}>
                                    <View style={styles.card}>
                                        <Image
                                            source={require("../../../assets/images/loodgieterone.png")}
                                            style={styles.cardImage}
                                        />
                                        <Text style={styles.cardTitle}>
                                            Nieuwe Leiding aanleggen
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.infoCard}>
                                <View style={styles.infoWrapper}>
                                    <Text>Aanvullende Informatie:</Text>
                                    <Text style={styles.locationText}>
                                        De leiding in de keuken, badkamer en in de tuin moeten
                                        aangelegd worden. Er is geen schade in de keuken en
                                        badkamer. Er is wel schade in de tuin waar de leiding
                                        momenteel is.
                                    </Text>
                                </View>
                            </View>
                            <Pressable style={styles.infoCard}>
                                <Text style={styles.linkTextBottom}>Klus bekijken</Text>
                            </Pressable>
                        </View>

                        <View style={styles.cardTwo}>
                            <View style={styles.underlineTitleBox}>
                                <Text>Datum uitvoering</Text>
                            </View>
                            <View style={styles.flexDirection}>
                                <View style={styles.dateInfoLeft}>
                                    <View style={styles.dateInfoTextWrapper}>
                                        <Text style={styles.dateTitle}>10</Text>
                                        <Text>Oktober</Text>
                                        <Text>2023</Text>
                                    </View>
                                </View>
                                <View style={styles.dateInfoRight}>
                                    <View style={styles.dateLocationInfoWrapper}>
                                        <View style={styles.locationInfo}>
                                            <Ionicons name="mail" size={20} color="#308AE4" />
                                            <Text style={styles.locationText}>
                                                Adres: iets straat 23
                                            </Text>
                                        </View>
                                        <View style={styles.locationInfo}>
                                            <Ionicons name="home" size={20} color="#308AE4" />
                                            <Text style={styles.locationText}>
                                            Postcode: 1320 DP
                                            </Text>
                                        </View>
                                        <View style={styles.locationInfo}>
                                            <Ionicons name="location" size={20} color="#308AE4" />
                                            <Text style={styles.locationText}>
                                            Locatie: Haarlem
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.linkTextBottom}>Meer Info</Text>
                                </View>
                            </View>

                        </View>
                        <Text style={styles.linkTextTop}>Klus beëindigen</Text>
                    </View>
                </ScrollView>
                <Footer navigation={navigation} activePage="ChatOverview" />
            </SafeAreaView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    view: {
        height: windowHeight * 1.3,
        width: windowWidth,
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
    },


    topTitleBox: {
        height: 50,
        width: "87%",
        marginBottom: 40,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",

    },

    h1Title: {
        fontSize: 15,
        fontWeight: "500",
    },

    dateTitle: {
        fontSize: 30,
        color: "#308AE4",
    },

    dateInfoTextWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 80,
        width: 70,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 3,
        backgroundColor: "white",
    },

    dateLocationInfoWrapper: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "100%",
        gap: 4,
    },


    dateInfoLeft: {
        width: "33%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    dateInfoRight: {
        width: "67%",
        height: 150,
    },

    profileImage: {
        width: 55,
        height: 55,
        borderRadius: 27,
    },

    profileWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 10,
    },

    flexDirection: {
        flexDirection: "row",
        display: "flex",
    },

    profileBox: {
        marginTop: 3,
        height: 60,
        paddingLeft: 15,
        paddingRight: 23,
        width: "85%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 3,
        backgroundColor: "white",
        flexDirection: "row",
    },

    underlineTitleBox: {
        marginTop: 10,
        height: 40,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1.5,
        borderColor: "#D9D9D9",
    },

    cardTwo: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
        backgroundColor: "white",
        width: windowWidth - 50,
        marginTop: 30,
        paddingBottom: 35,
        paddingLeft: 20,
        paddingRight: 20,
        gap: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },

    circleBlue: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#308AE4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },


    cardOne: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
        backgroundColor: "white",
        width: windowWidth - 50,
        height: 168,
        marginTop: 30,
        gap: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    linkTextBottom: {
        color: "#17A1FA",
        marginBottom: 15,
        paddingLeft: 24,

    },

    linkTextTop: {
        color: "#17A1FA",
        marginTop: 55,
        fontSize: 17,
    },

    linkText: {
        color: "#17A1FA",
    },

    whiteText: {
        fontSize: 12,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },

    nextButton: {
        borderRadius: 10,
        backgroundColor: "#308AE4",
        width: 160,
        height: 50,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },

    textTwo: {
        fontSize: 13,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "#308AE4",
    },

    buttonTwo: {
        borderWidth: 2,
        borderColor: "#308AE4",
        borderRadius: 10,
        backgroundColor: "white",
        width: 150,
        textAlign: "center",
        padding: 10,
        display: "flex",
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35,
    },

    contactInfo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 14,
        marginTop: 10,
    },

    smallCardTitle: {
        fontSize: 18,
        fontWeight: "500",
    },

    titleBox: {
        display: "flex",
        alignItems: "center",
        marginBottom: 8,
    },

    smallCardWrapper: {
        paddingTop: 20,
        height: 300,
        display: "flex",
        alignItems: "center",
    },

    smallCard: {
        paddingTop: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
        backgroundColor: "white",
        width: "70%",
        height: "80%",
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
    },

    infoCard: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
    },

    infoWrapper: {
        display: "flex",
        width: "80%",
        gap: 10,
    },

    cardImage: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        marginBottom: 10,
    },

    cardTitle: {
        fontSize: 8,
        fontWeight: "bold",
        textAlign: "center",
    },

    cardsContainer: {
        width: windowWidth,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingVertical: 20,
    },
    card: {
        height: 90,
        width: 90,
        backgroundColor: "white",
        borderRadius: 10,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    locationText: {
        fontSize: 12,
    },

    contactText: {
        flex: 1,
        fontSize: 12,
        maxWidth: "55%",
    },

    typeOfWork: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },

    locationInfoWrapper: {
        height: 100,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
    },

    locationInfo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 4,
    },

    typeOfWorkWrapper: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        paddingLeft: 20,
        gap: 30,
    },
    bigCard: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
        backgroundColor: "white",
        width: windowWidth - 50,
    },

    textLine: {
        marginTop: 10,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    textWrapper: {
        display: "flex",
        flexDirection: "row",
        gap: 3,
    },

    infoSubject: {
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        gap: 15,
        paddingLeft: 30,
    },

    blackText: {
        fontWeight: "500",
    },

    line: {
        height: 2,
        width: "90%",
        backgroundColor: "#D9D9D9",
    },
    topContainer: {
        width: 700,
        height: 100,
        display: "flex",
        backgroundColor: "#308AE4",
        alignItems: "center",
        flexDirection: "column",
        borderBottomEndRadius: 250,
        borderBottomStartRadius: 250,
    },
    topButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
        paddingHorizontal: 20,
        position: "absolute",
        top: -25,
    },
    returnButton: {
        backgroundColor: "transparent",
        width: 60,
        textAlign: "center",
    },
    circleContainer: {
        marginTop: 55,
        width: 170,
        height: 170,
        display: "flex",
        backgroundColor: "transparent",
        alignItems: "center",
        borderRadius: 400,
        borderWidth: 1,
        borderColor: "white",
        overflow: "hidden",
    },
    topContainerSecondSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 15,
        gap: 2,
    },
    topContainerSecondSectionTwo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 54,
        gap: 2,
    },
    name: {
        color: "white",
    },
    firstMiddleContainerWrapper: {
        width: "100%",
        backgroundColor: "white",
        paddingBottom: windowHeight * 0.02,
        paddingTop: windowHeight * 0.05,
    },
    secondMiddleContainerWrapper: {
        marginTop: 30,
        width: "100%",
        height: 120,
        padding: 10,
        backgroundColor: "white",
    },
    middleContainerFirstSection: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 0,
        marginTop: 5,
    },
    agendaButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
    },
    image: {
        flex: 1,
        width: "100%",
        height: undefined,
        aspectRatio: 1,
        transform: [{ scale: 1.6 }],
    },
    button: {
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    linkOne: {
        borderRadius: 10,
        backgroundColor: "#308AE4",
        width: 250,
        textAlign: "center",
        padding: 10,
        bottom: -60,
        alignItems: "center",
    },
    linkTwo: {
        backgroundColor: "#E9F4FF",
        width: 350,
        textAlign: "left",
        padding: 20,
        bottom: -20,
        alignItems: "flex-start",
    },
    linkTwoTop: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: "#E9F4FF",
        width: 350,
        textAlign: "left",
        padding: 20,
        bottom: -20,
        alignItems: "flex-start",
    },
    linkTwoBottom: {
        borderBottomRightRadius: 3.5,
        borderBottomLeftRadius: 3.5,
        backgroundColor: "#E9F4FF",
        width: 350,
        textAlign: "left",
        padding: 20,
        bottom: -12,
        alignItems: "flex-start",
    },
    linkTwoDelete: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: "#E9F4FF",
        width: 350,
        textAlign: "left",
        padding: 20,
        bottom: -20,
        alignItems: "flex-start",
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
    },
    textBold: {
        fontSize: 17,
        lineHeight: 21,
        fontWeight: "bold",
    },
    smallTitle: {
        fontSize: 13,
        fontWeight: "bold",
        paddingLeft: 10,
    },
    textButtonWhite: {
        color: "white",
    },
    textButtonBlack: {
        color: "black",
    },
    arrow: {
        fontSize: 22,
    },
    arrowButton: {
        flex: 1,
        display: "flex",
        alignItems: "flex-end",
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    smallCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    topRadius: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },

    bottomRadius: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
});

export default MyWorkThree;
