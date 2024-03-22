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
import Footer from '../Footer'; 

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProfileSettingsTwo = ({ navigation }) => {
    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.view}>
                    <View style={styles.topContainer}>
                            <View style={styles.topButtonsContainer}>
                                <Pressable style={[styles.linkOne, styles.returnButton]} onPress={() => navigation.navigate('')}>
                                    <View style={styles.smallCircle}>
                                    <Icon name="arrow-back" size={28} color="#308AE4" />
                                    </View>
                                </Pressable>
                            </View>
                            <View style={styles.topContainerSecondSectionTwo}>
                                <Text style={[styles.name, styles.textBold]}>
                                Instellingen
                                </Text>
                            </View>
                        </View>

                        <View style={styles.firstMiddleContainerWrapper}>
                            <Text style={[styles.textButtonBlack, styles.smallTitle]}>
                            Profieloverzicht
                            </Text>

                            <View style={styles.middleContainerFirstSection}>
                                <Pressable style={[styles.linkTwoTop, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Icon name="settings" size={23} color="black"/>
                                    <Text style={[styles.text, styles.textButtonBlack, styles.pressableText]}>Mijn klussen</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                        <Text style={[styles.arrow]}>&gt;</Text>
                                    </TouchableOpacity>
                                </Pressable>
                                <Pressable style={[styles.linkTwo, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Icon name="notifications" size={23} color="black"/>
                                    <Text style={[styles.text, styles.textButtonBlack, styles.pressableText]}>Notificaties</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                        <Text style={[styles.arrow]}>&gt;</Text>
                                    </TouchableOpacity>
                                </Pressable>
                                <Pressable style={[styles.linkTwo, styles.agendaButton]} onPress={() => navigation.navigate('ProfilePrivacy')}>
                                    <Icon name="lock" size={23} color="black"/>
                                    <Text style={[styles.text, styles.textButtonBlack, styles.pressableText]}>Privacy</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                        <Text style={[styles.arrow]}>&gt;</Text>
                                    </TouchableOpacity>
                                </Pressable>
                                <Pressable style={[styles.linkTwoBottom, styles.agendaButton]} onPress={() => navigation.navigate('ProfileGeneralSettings')}>
                                    <Icon name="settings" size={23} color="black"/>
                                    <Text style={[styles.text, styles.textButtonBlack, styles.pressableText]}>Algemeen</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                        <Text style={[styles.arrow]}>&gt;</Text>
                                    </TouchableOpacity>
                                </Pressable>
                                <Pressable style={[styles.linkTwoBottom, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Icon name="payments" size={23} color="black"/>
                                    <Text style={[styles.text, styles.textButtonBlack, styles.pressableText]}>Betalingen</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                        <Text style={[styles.arrow]}>&gt;</Text>
                                    </TouchableOpacity>
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.secondMiddleContainerWrapper}>
                            <Text style={[styles.textButtonBlack, styles.smallTitle]}>
                            Applicatie-instellingen
                            </Text>

                            <View style={styles.middleContainerFirstSection}>
                                <Pressable style={[styles.linkTwoDelete, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Icon name="help" size={23} color="gray"/>
                                    <Text style={[styles.text, styles.textButtonBlack, styles.pressableText]}>Hulp en feedback</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                        <Text style={[styles.arrow]}>&gt;</Text>
                                    </TouchableOpacity>
                                </Pressable>
                                <Pressable style={[styles.linkTwoBottom, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Icon name="info" size={23} color="#308AE4"/>
                                    <Text style={[styles.text, styles.textButtonBlack, styles.pressableText]}>Info</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                        <Text style={[styles.arrow]}>&gt;</Text>
                                    </TouchableOpacity>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
        <Footer navigation={navigation} activePage="Profile" />
            </SafeAreaView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    view: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
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
        marginTop: windowHeight * 0.07,
        width: windowWidth * 0.4,
        height: windowWidth * 0.4,
        display: "flex",
        backgroundColor: "transparent",
        alignItems: "center",
        borderRadius: windowWidth * 0.5,
        borderWidth: 1,
        borderColor: "white",
        overflow: 'hidden',
    },
    topContainerSecondSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: windowHeight * 0.02,
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
        color: 'white',
    },
    firstMiddleContainerWrapper: {
        width: "100%",
        backgroundColor: "white",
        paddingBottom: windowHeight * 0.02,
        paddingTop: windowHeight * 0.05,
    },
    secondMiddleContainerWrapper: {
        width: "100%",
        backgroundColor: "white",
        paddingBottom: windowHeight * 0.01,
    },
    middleContainerFirstSection: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 0,
        paddingTop: 10,
    },
    agendaButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 16,
        paddingRight: 16,
    },
    pressableText: {
        paddingLeft: 10,
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
        width: windowWidth * 0.9,
        textAlign: "left",
        paddingVertical: 10,
        alignItems: "flex-start",
    },
    linkTwoTop: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: "#E9F4FF",
        width: windowWidth * 0.9,
        textAlign: "left",
        paddingVertical: 10,
        alignItems: "flex-start",
    },
    linkTwoBottom: {
        borderBottomRightRadius: 3.5,
        borderBottomLeftRadius: 3.5,
        backgroundColor: "#E9F4FF",
        width: windowWidth * 0.9,
        textAlign: "left",
        paddingVertical: 10,
        alignItems: "flex-start",
    },
    linkTwoDelete: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: "#E9F4FF",
        width: windowWidth * 0.9,
        textAlign: "left",
        paddingVertical: 10,
        alignItems: "flex-start",
        marginTop: windowHeight * 0.01,
    },
    text: {
        fontSize: windowWidth * 0.04,
        lineHeight: windowHeight * 0.053,
    },
    textBold: {
        fontSize: windowWidth * 0.042,
        lineHeight: windowHeight * 0.053,
        fontWeight: "bold",
    },
    smallTitle: {
        fontSize: windowWidth * 0.034,
        fontWeight: "bold",
        paddingLeft: windowWidth * 0.02,
    },
    textButtonWhite: {
        color: "white",
    },
    textButtonBlack: {
        color: "black",
    },
    arrow: {
        fontSize: windowWidth * 0.05,
    },
    arrowButton: {
        flex: 1,
        display: "flex",
        alignItems: "flex-end",
    },
    title: {
        fontSize: windowWidth * 0.05,
        fontWeight: "bold",
    },
    smallCircle: {
        width: 40,
        height: 40,
        borderRadius: 25, 
        backgroundColor: 'white',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ProfileSettingsTwo;
