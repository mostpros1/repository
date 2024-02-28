import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, Pressable, ScrollView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from "@expo/vector-icons/MaterialIcons";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeOwnerCreate = ({ navigation }) => {
    const [inputText, setInputText] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [options, setOptions] = useState([
        { id: 1, title: 'Loodgieter' },
        { id: 2, title: 'Hovenier' },
        { id: 3, title: 'Dakdekker' },
        { id: 4, title: 'Schoonmaker' },
        { id: 5, title: 'Aannemer' },
        { id: 6, title: 'Elektricien' },
    ]);

    const handleInputChange = (text) => {
        setInputText(text);
    };

    const handleInputFocus = () => {
        setShowOptions(true);
    };

    const handleOptionPress = (option) => {
        setInputText(option.title);
        setSelectedOption(option);
        setShowOptions(false);
    };

    const handleOutsidePress = () => {
        Keyboard.dismiss();
        setShowOptions(false);
    };

    const handleForwardButtonPress = () => {
        navigation.navigate('HomeOwnerPostalCode', { selectedOption });
    };

    const filteredOptions = options.filter(option =>
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
                    <Text style={styles.title}>Vind Direct wat je nodig hebt: {'\n'} Type hieronder in en ontdek!</Text>
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
});

export default HomeOwnerCreate;
