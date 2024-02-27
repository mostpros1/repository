import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, Pressable, ScrollView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'; // Import Platform from 'react-native'
import { Dimensions } from 'react-native';
import Icon from "@expo/vector-icons/MaterialIcons";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeOwnerPostalCode = ({ navigation }) => {
    const [inputText, setInputText] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [options, setOptions] = useState([
        { id: 1, title: 'Loodgieter' },
        { id: 2, title: 'Hovenier' },
        { id: 3, title: 'Dakdekker' },
        { id: 4, title: 'Schoonmaken' },
        { id: 5, title: 'Aannemer' },
        { id: 6, title: 'Electricien' },
    ]);

    const handleInputChange = (text) => {
        setInputText(text);
        // Perform any necessary logic based on the input text
    };

    const handleInputFocus = () => {
        setShowOptions(true);
    };

    const handleOptionPress = (option) => {
        // Handle what happens when an option is pressed
        console.log('Option pressed:', option.title);
    };

    const handleOutsidePress = () => {
        Keyboard.dismiss();
        setShowOptions(false);
    };

    return (
            <SafeAreaView style={styles.container}>
                <View style={styles.crossContainer}>
                    <Pressable style={styles.crossCircle} onPress={() => navigation.navigate('HomeOwnerNavigation')}>
                        <Text style={styles.crossTitle}>X</Text>
                    </Pressable>
                </View>

                <View style={styles.titleBox}>
                    <Text style={styles.title}>Vind Direct wat je nodig hebt: {'\n'} Type hieronder in en ontdek!</Text>
                </View>
            </SafeAreaView>
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
});

export default HomeOwnerPostalCode;
