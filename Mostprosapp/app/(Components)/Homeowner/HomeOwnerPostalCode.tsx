import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, Pressable, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, Image, KeyboardAvoidingView } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from "@expo/vector-icons/MaterialIcons";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeOwnerPostalCode = ({ navigation, route }) => {
    const { selectedOption } = route.params; // Get the selected option from navigation params
    const [progress, setProgress] = useState(1); // Progress state
    const [postalCode, setPostalCode] = useState({ part1: '', part2: '' });

    const handlePostalCodeChange = (text, part) => {
        if (part === 'part1' && text.length <= 4) {
            setPostalCode({ ...postalCode, part1: text });
        } else if (part === 'part2' && text.length <= 2) {
            setPostalCode({ ...postalCode, part2: text });
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <KeyboardAvoidingView style={styles.contentContainer} behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <TouchableWithoutFeedback onPress={dismissKeyboard}>
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
                            <Text style={styles.title}>Voer je postcode in om vakspecialisten in{'\n'} jouw omgeving te vinden.</Text>
                        </View>

                        <View style={styles.imageContainer}>
                            <Image source={require("../../../assets/images/HowItWorksSix.png")} style={styles.image} resizeMode="contain" />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="1234"
                                onChangeText={(text) => handlePostalCodeChange(text, 'part1')}
                                value={postalCode.part1}
                                maxLength={4}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="AB"
                                onChangeText={(text) => handlePostalCodeChange(text.toUpperCase(), 'part2')}
                                value={postalCode.part2}
                                maxLength={2}
                            />
                        </View>
                        <Pressable style={styles.nextButton} onPress={() => navigation.navigate(`HomeOwnerApp${selectedOption.title}`)}>
                            <Text style={styles.nextButtonText}>Volgende</Text>
                        </Pressable>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
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
    imageContainer: {
        alignItems: 'center',
        paddingTop: 40,
    },
    image: {
        width: '80%',
        height: 250,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 5,
        width: 70,
        textAlign: 'center',
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

export default HomeOwnerPostalCode
