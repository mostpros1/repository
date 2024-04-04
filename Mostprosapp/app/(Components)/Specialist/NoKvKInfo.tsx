import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Pressable,
    ScrollView,
    Image,

} from "react-native";
import { Dimensions } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NoKvKInfo = ({ navigation }) => {

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <View style={{ flex: 1 }}></View>
                        <Pressable style={styles.crossCircle} onPress={() => navigation.navigate('SpecialistNavigation')}>
                            <Text style={styles.crossTitle}>X</Text>
                        </Pressable>
                    </View>
                    <View style={styles.imgTextWrapper}>
                        <Image source={require("../../../assets/images/gaterug.png")} style={styles.cardImage} />
                        <Text style={styles.textInfo}>Helaas, indien je geen KVK-nummer hebt, kun je geen account aanmaken. We verzoeken je vriendelijk om een KVK-nummer aan te vragen en het op een later moment opnieuw te proberen.</Text>
                        <View style={styles.buttonsContainer}>
                        <Pressable style={[styles.nextButton, styles.nextButtonColorOne]} onPress={() => navigation.goBack()}>
                            <Text style={styles.nextButtonText}>Vorige</Text>
                        </Pressable>

                    </View>
                    </View>

                </SafeAreaView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: windowHeight - 100,
        display: "flex",
        alignItems: "center",
        gap: 30,
    },

    textInfo: {
        width: 300,
    },
    
    imgTextWrapper: {
        height: "90%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 30,
    },
    cardImage: {
        width: "80%",
        height: "50%",
        resizeMode: 'contain', 
    },
    containerInput: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 0.3,
        backgroundColor: "lightgray",
        height: 60,
        borderRadius: 10,
        padding: 10,
        width: "75%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginTop: 15,
        marginBottom: 15,
    },

    beroepContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 200,
        paddingTop: 50,
        paddingBottom: 30,
    },

    beroepTitle: {
        textAlign: "left",
    },

    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        display: "flex",

    },

    blueTitleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#63A7EB",
    },
    blueTitle: {
        color: "#63A7EB",
    },


    input: {
        flex: 1,
        fontSize: 16,
    },

    pressableContainer: {
        width: windowWidth - 20,
        height: 60,
        paddingRight: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E9F4FF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    checkbox: {
        position: 'absolute',
        top: 20,
        right: 10,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
    },
    checkboxSelected: {
        backgroundColor: '#308be5',
    },

    scrollViewContainer: {
        flexGrow: 1,
        height: windowHeight,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10,
    },
    crossCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#318ae5",
        alignItems: "center",
        justifyContent: "center",
    },
    crossTitle: {
        color: "#fefffe",
        fontSize: 20,
        fontWeight: "bold",
    },
    titleBox: {
        alignItems: "center",
        paddingTop: 40,
        marginBottom: 20,
    },
    title: {
        fontWeight: "bold",
        color: "#010100",
        textAlign: 'center',
        fontSize: 16,
    },
    titleLight: {
        color: "#202121",
        textAlign: 'center',
        fontSize: 15,
        width: 300,
    },

    bottomButtonsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    buttonsContainer: {
        marginTop: 50,
        display: "flex",
        flexDirection: "row",
        gap: 15,
        justifyContent: "center",

    },

    nextButton: {
        backgroundColor: "#318ae5",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignSelf: 'center',
        width: 170,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    nextButtonColorOne: {
        backgroundColor: "#fffefe",
        borderWidth: 3,
        borderColor: "#7db7ec",
    },

    nextButtonText: {
        fontSize: 13,
        fontWeight: "bold",
        textAlign: 'center',
    },

    whiteButtonText: {
        color: "#fff",
    },
});


export default NoKvKInfo;
