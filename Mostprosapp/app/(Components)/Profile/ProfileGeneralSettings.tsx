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
import { Provider as PaperProvider, Switch } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProfileGeneralSettings = ({ navigation }) => {
  const [isSwitchOn1, setIsSwitchOn1] = useState(false);
  const [isSwitchOn2, setIsSwitchOn2] = useState(false);

  const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);
  const onToggleSwitch2 = () => setIsSwitchOn2(!isSwitchOn2);

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
                                    General
                                </Text>
                            </View>
                        </View>

                        <View style={styles.firstMiddleContainerWrapper}>
                            <View style={styles.middleContainerFirstSection}>
                            <Pressable style={[styles.linkTwoTop, styles.topRadius, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Icon name="language" size={23} color="black"/>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Taal</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                            <Text style={[styles.arrow]}>&gt;</Text>
                                        </TouchableOpacity>
                                </Pressable>
                                <View style={[styles.linkTwo, styles.agendaButton]}>
                                     <Icon name="translate" size={23} color="black"/>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Tekst vertaler</Text>
                                    <View style={[styles.button, styles.arrowButton]}>
                                            <Switch value={isSwitchOn1} onValueChange={onToggleSwitch1} ios_backgroundColor="#606160" color="#308AE4" />

                                        </View>
                                </View>
                                <Pressable style={[styles.linkTwoTop, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Icon name="title" size={23} color="black"/>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Tekst grootte</Text>
                                    <TouchableOpacity style={[styles.button, styles.arrowButton]}>
                                            <Text style={[styles.arrow]}>&gt;</Text>
                                        </TouchableOpacity>
                                </Pressable>
                                <View style={[styles.linkTwoTop, styles.bottomRadius, styles.agendaButton]}>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Donker Modus</Text>
                                    <Switch value={isSwitchOn2} onValueChange={onToggleSwitch2} ios_backgroundColor="#606160" color="#308AE4" />
                                </View>

                            </View>
                        </View>

                        <View style={styles.secondMiddleContainerWrapper}>
                                <View style={styles.middleContainerFirstSection}>
                                <Pressable style={[styles.linkTwoDelete, styles.topRadius, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Opslag Beheren</Text>
                                    <View style={styles.textButtonWrapper}>
                                        <Text style={[styles.lightTitle]}>Beheer Cache</Text>
                                        <TouchableOpacity style={styles.button}>
                                            <Text style={[styles.arrow]}>&gt;</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Pressable>
                                <Pressable style={[styles.linkTwoBottom, styles.bottomRadius, styles.agendaButton]} onPress={() => navigation.navigate('')}>
                                    <Text style={[styles.text, styles.textButtonBlack]}>Chat berichten wissen</Text>
                                    <View style={styles.textButtonWrapper}>
                                        <TouchableOpacity style={styles.button}>
                                            <Text style={[styles.arrow]}>&gt;</Text>
                                        </TouchableOpacity>
                                    </View>
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
        height: "39%",
        padding: 10,
        paddingBottom: 0,
        paddingTop: 32,
        backgroundColor: "white",
    },
    secondMiddleContainerWrapper: {
        width: "100%",
        height: 100,
        padding: 10,
        backgroundColor: "white",
    },
    middleContainerFirstSection: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 0,
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
        width: 350,
        textAlign: "left",
        padding: 20,
        bottom: -20,
        alignItems: "flex-start",
    },
    linkTwoTop: {
        backgroundColor: "#E9F4FF",
        width: 350,
        textAlign: "left",
        padding: 20,
        bottom: -20,
        alignItems: "flex-start",
    },
    topRadius:{
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },

    bottomRadius:{
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    linkTwoBottom: {
        backgroundColor: "#E9F4FF",
        width: 350,
        textAlign: "left",
        padding: 20,
        bottom: -20,
        alignItems: "flex-start",
    },
    linkTwoDelete: {
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
    lightTitle: {
      fontSize: 13,
      color: "#B7BEC5",
      lineHeight: 24,
  },
  textButtonWrapper: {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
},
});

export default ProfileGeneralSettings;