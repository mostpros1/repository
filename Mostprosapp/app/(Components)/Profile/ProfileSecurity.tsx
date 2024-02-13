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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProfileSecurity = ({ navigation }) => {
    return (
        <PaperProvider>
            <SafeAreaView>

                <ScrollView>
                    <View style={styles.view}>
                        <View style={styles.topContainer}>
                            <View style={styles.topButtonsContainer}>
                                <Pressable style={[styles.linkOne, styles.returnButton]} onPress={() => navigation.navigate('')}>
                                    <Icon name="arrow-back" size={35} color="white" />
                                </Pressable>
                            </View>
                            <View style={styles.topContainerSecondSectionTwo}>
                                <Text style={[styles.name, styles.textBold]}>
                                    Profiel en beveiliging
                                </Text>
                            </View>
                            <View style={styles.circleContainer}>
                                <View>
                                    <Image
                                        style={styles.image}
                                        source={require("../../../assets/images/jan.png")}
                                    />
                                </View>
                            </View>
                            <View style={styles.topContainerSecondSection}>
                                <Text style={[styles.name, styles.textBold]}>
                                    Jan Schilder
                                </Text>
                            </View>
                        </View>

                        <View style={styles.middleContainer}>
                            <View style={styles.middleContainerFirstSection}>
                                <Pressable style={[styles.linkTwoTop, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Mobiele nummer</Text>
                                    <Text style={[styles.lightTitle]}>+31 01234***89</Text>
                                </Pressable>
                                <Pressable style={[styles.linkTwo, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Text style={[styles.text, styles.textButtonBlack]}>E-mailadres</Text>
                                    <Text style={[styles.lightTitle]}>Lisa@gmail.com</Text>
                                </Pressable>
                                <Pressable style={[styles.linkTwo, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Inloggegevens</Text>
                                </Pressable>
                                <Pressable style={[styles.linkTwoBottom, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Loginmethode</Text>
                                </Pressable>
                                <Pressable style={[styles.linkTwoDelete, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Account verwijderen</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    view: {
        height: windowHeight,
        width: windowWidth,
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
    },
    topContainer: {
        width: 700,
        height: 400,
        display: "flex",
        backgroundColor: "#308AE4",
        alignItems: "center",
        flexDirection: "column",
        borderBottomEndRadius: 250,
        borderBottomStartRadius: 250,
    },
    topButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        paddingHorizontal: 20,
        position: 'absolute',
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
        overflow: 'hidden',
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
        marginTop: 50,
        gap: 2,
    },
    name: {
        color: 'white',
    },
    middleContainer: {
        width: "75%",
    },
    middleContainerFirstSection: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    agendaButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    image: {
        flex: 1,
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        transform: [{ scale: 1.6 }]
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
        width: 380,
        textAlign: "left",
        padding: 20,
        bottom: -20,
        alignItems: "flex-start",
    },
    linkTwoTop: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: "#E9F4FF",
        width: 380,
        textAlign: "left",
        padding: 20,
        bottom: -20,
        alignItems: "flex-start",
    },
    linkTwoBottom: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: "#E9F4FF",
        width: 380,
        textAlign: "left",
        padding: 20,
        bottom: -20,
        alignItems: "flex-start",
    },
    linkTwoDelete: {
        borderRadius: 10,
        backgroundColor: "#E9F4FF",
        width: 380,
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
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
    },
    textButtonWhite: {
        color: "white",
    },
    textButtonBlack: {
        color: "black",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    lightTitle: {
        fontSize: 13,
        color: "#B7BEC5",
    },
});

export default ProfileSecurity;