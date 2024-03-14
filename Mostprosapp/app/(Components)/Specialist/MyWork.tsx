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

const MyWork = ({ navigation }) => {
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
                                    Loodgieters Werk
                                </Text>
                            </View>
                        </View>

                        <View style={styles.bigCard}>
                            <View style={styles.textLine}>
                                <Text>Loodgieters werk: nieuwe leiding aanleggen</Text>
                                <View style={styles.line}></View>
                            </View>
                            <View style={styles.infoSubject}>
                                <Text style={styles.blackText}>Beschrijving</Text>
                                <View style={styles.textWrapper}>
                                    <Text style={styles.blackText}>Opdrachtgever:</Text>
                                    <Text>Lisa Zoetlief</Text>
                                </View>
                            </View>
                        </View> 
                                    
                    </View>
                </ScrollView>
                <Footer navigation={navigation} activePage="ChatOverview" />
            </SafeAreaView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    view: {
        height: windowHeight * 1.2,
        width: windowWidth,
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",

    },

    bigCard:{
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4, 
        },
        shadowOpacity: 0.3, 
        shadowRadius: 6, 
        elevation: 6,
        backgroundColor: "white",

        height: windowHeight - 180,
        width: windowWidth - 50,
    },

    textLine:{
        marginTop: 10,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    textWrapper:{
        display: "flex",
        flexDirection:"row",
        gap: 3,
    },

    infoSubject:{
        height: 60,
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        gap: 15,
        paddingLeft: 30,


    },

    blackText:{
        fontWeight: "500"
    },

    line:{
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
        marginBottom: 40,
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

export default MyWork;