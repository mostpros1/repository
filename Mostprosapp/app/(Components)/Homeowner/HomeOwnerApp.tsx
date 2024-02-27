import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, Pressable, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, Image, KeyboardAvoidingView } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from "@expo/vector-icons/MaterialIcons";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeOwnerApp = ({ navigation }) => {
    const [progress, setProgress] = useState(2);


    return (
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <SafeAreaView style={styles.container}>
                        <View style={styles.header}>
                            <View style={{ flex: 1 }}></View>
                            <Pressable style={styles.crossCircle} onPress={() => navigation.navigate('HomeOwnerNavigation')}>
                                <Text style={styles.crossTitle}>X</Text>
                            </Pressable>
                        </View>

                        <View style={styles.progressContainer}>
                            <Text style={styles.progressText}>Stap {progress} van de 4</Text>
                            <View style={styles.progressBar}>
                                <View style={[styles.progressIndicator, { width: `${(progress / 4) * 100}%` }]}></View>
                            </View>
                        </View>

                        <View style={styles.titleBox}>
                            <Text style={styles.title}>Wat moet er gedaan worden?</Text>
                        </View>

                        <View style={styles.cardsContainer}>
                            <View style={styles.card}></View>
                            <View style={styles.card}></View>
                            <View style={styles.card}></View>
                            <View style={styles.card}></View>
                            <View style={styles.card}></View>
                            <View style={styles.card}></View>
                        </View>

                        <Pressable style={styles.nextButton} onPress={() => console.log("Next button pressed")}>
                            <Text style={styles.nextButtonText}>Volgende</Text>
                        </Pressable>
                    </SafeAreaView>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E9F4FF",
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
    },

    cardsContainer:{
        width: windowWidth,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 20,
    },

    card: {
        width: 150,
        height: 150,
        backgroundColor: "white",
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
        height: 100
    },
    title: {
        fontWeight: "bold",
        color: "#010100",
        textAlign: 'center',
        fontSize: 16,
    },
    progressContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    progressText: {
        marginBottom: 5,
    },
    progressBar: {
        width: '80%',
        height: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
    progressIndicator: {
        height: '100%',
        backgroundColor: '#318ae5',
        borderRadius: 5,
    },

    nextButton: {
        backgroundColor: "#318ae5",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignSelf: 'center',
        marginTop: 65,
        width: 200,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    nextButtonText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold",
        textAlign: 'center',
    },
});

export default HomeOwnerApp;
