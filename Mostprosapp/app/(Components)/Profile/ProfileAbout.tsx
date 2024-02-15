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

const ProfileAbout = ({ navigation }) => {
    return (
        <PaperProvider>
            <SafeAreaView>

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
                                    Over
                                </Text>
                            </View>
                        </View>

                        <View style={styles.secondMiddleContainerWrapper}>
                            <Text style={[styles.textButtonBlack, styles.smallTitle]}>
                                    Over de app
                                </Text>

                                <View style={styles.middleContainerFirstSection}>
                                <Pressable style={[styles.linkTwoBottom, styles.bottomRadius, styles.topRadius, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Icon name="info" size={23} color="#308AE4"/>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Over</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                            <Text style={[styles.arrow]}>&gt;</Text>
                                        </TouchableOpacity>
                                </Pressable>
                            </View>
                        </View>      

                        <View style={styles.firstMiddleContainerWrapper}>
                                <Text style={[styles.textButtonBlack, styles.smallTitle]}>
                                    Algemene informatie
                                </Text>

                            <View style={styles.middleContainerFirstSection}>
                                <Pressable style={[styles.linkTwoTop, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Over Ons</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                            <Text style={[styles.arrow]}>&gt;</Text>
                                        </TouchableOpacity>
                                </Pressable>
                                <Pressable style={[styles.linkTwo, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Privacy beleid</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                            <Text style={[styles.arrow]}>&gt;</Text>
                                        </TouchableOpacity>
                                </Pressable>
                                <Pressable style={[styles.linkTwo, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Algemene voorwaarden</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                            <Text style={[styles.arrow]}>&gt;</Text>
                                        </TouchableOpacity>
                                </Pressable>
                                <Pressable style={[styles.linkTwoBottom, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Disclaimer</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                            <Text style={[styles.arrow]}>&gt;</Text>
                                        </TouchableOpacity>
                                </Pressable>
                                <Pressable style={[styles.linkTwoBottom, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Kwaliteitseisen</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                            <Text style={[styles.arrow]}>&gt;</Text>
                                        </TouchableOpacity>
                                </Pressable>
                                <Pressable style={[styles.linkTwoBottom, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Waarom Mostpros</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                            <Text style={[styles.arrow]}>&gt;</Text>
                                        </TouchableOpacity>
                                </Pressable>
                                <Pressable style={[styles.linkTwoBottom, styles.bottomRadius, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Veel gestelde vragen</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                            <Text style={[styles.arrow]}>&gt;</Text>
                                        </TouchableOpacity>
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
        marginTop: 54,
        gap: 2,
    },
    name: {
        color: 'white',
    },
    firstMiddleContainerWrapper: {
        width: "100%",
        height: "50%",
        padding: 10,
        paddingBottom: 0,
        paddingTop: 32,
        backgroundColor: "white",
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
        borderRadius: 25, 
        backgroundColor: 'white',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    topRadius:{
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      },
  
      bottomRadius:{
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
      },
});

export default ProfileAbout;