import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, Pressable, ScrollView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Dimensions } from 'react-native'; 
import Icon from "@expo/vector-icons/MaterialIcons";
import {specialists} from '../../specialists.js';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeOwnerCreate = ({ navigation }) => {
    const [inputText, setInputText] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (text) => {
        setInputText(text);
    };

    const handleInputFocus = () => {
        setShowOptions(true);
    };

    const handleOptionPress = (specialists) => {
        setInputText(specialists.title);
        setSelectedOption(specialists);
        setShowOptions(false);
    };

    const handleOutsidePress = () => {
        Keyboard.dismiss();
        setShowOptions(false);
    };

    const handleForwardButtonPress = () => {
        if (!selectedOption) {
            setErrorMessage("Kies eerst een Specialist");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }
        navigation.navigate('HomeOwnerPostalCode', { selectedOption });
    };

    const filteredOptions = specialists.filter(option =>
      option.title.toLowerCase().includes(inputText.toLowerCase())
    );

    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <SafeAreaView style={styles.container}>
                <View style={styles.crossContainer}>
                    <Pressable style={styles.crossCircle} onPress={() => navigation.navigate('HomeOwnerNavigation')}>
                        <Text style={styles.crossTitle}>X</Text>
                    </Pressable>
                </View>

                <View style={styles.titleBox}>
                    <Text style={styles.title}>Vind Direct wat je nodig hebt: {'\n'} Kies een optie en ontdek!</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Bijvoorbeeld: Schilderwerk."
                        style={styles.input}
                        onChangeText={handleInputChange}
                        onFocus={handleInputFocus}
                        value={inputText}
                    />
                    <Pressable style={styles.forwardButton} onPress={handleForwardButtonPress}>
                        <Icon name="forward" size={25} color="white" />
                    </Pressable>
                </View>

                {showOptions && (
                    <ScrollView style={styles.optionsContainer}>
                        {filteredOptions.map(option => (
                            <Pressable key={option.id} style={styles.option} onPress={() => handleOptionPress(option)}>
                                <Text>{option.title}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                )}
                {errorMessage ? (
                    <View style={styles.errorMessageContainer}>
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                    </View>
                ) : null}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E9F4FF",
    },
    crossContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 40 : 10,
        right: 20,
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    input: {
        flex: 1,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        height: 70,
    },
    forwardButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#318ae5",
        alignItems: "center",
        justifyContent: "center",
    },
    optionsContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 249 : 190,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        maxHeight: windowHeight * 0.3,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {
                    width: 1,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    option: {
        paddingVertical: 10,
        paddingLeft: 20,
    },
    errorMessageContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    errorMessage: {
        color: 'red',
        fontSize: 16,
    },
});

export default HomeOwnerCreate;
