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
    TextInput,
    TouchableOpacity,
    Keyboard,
    Platform,
    TouchableWithoutFeedback,
} from "react-native";
import { Dimensions } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { specialists } from '../../specialists.js';
import Icon from "@expo/vector-icons/MaterialIcons";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PostalCodeSpecialist = ({ navigation }) => {
    const [progress, setProgress] = useState(3);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [inputText, setInputText] = useState('');
    const [email, setEmail] = useState('');
    const [postalCode, setPostalCode] = useState({ part1: '', part2: '' });

    const handlePostalCodeChange = (text, part) => {
        if (part === 'part1' && text.length <= 4) {
            setPostalCode({ ...postalCode, part1: text });
        } else if (part === 'part2' && text.length <= 2) {
            setPostalCode({ ...postalCode, part2: text });
        }
    };

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
        if (!email) {
            Alert.alert('Fout Melding', 'Vul je email in.');
        } else if (!validateEmail(email)) {
            Alert.alert('Fout Melding', 'Voer een geldig emailadres in.');
        } else if (!postalCode.part1 || !postalCode.part2) {
            Alert.alert('Fout Melding', 'Voer een Postcode in.');
        } else if (!selectedOption) {
            Alert.alert('Fout Melding', 'Kies een professional.');
        } else {
            navigation.navigate('GegevensSpecialist', { selectedOption });
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };


    const filteredOptions = specialists.filter(option =>
        option.title.toLowerCase().includes(inputText.toLowerCase())
    );

    const handlePress = (text) => {
        navigation.navigate('HomeOwnerPostalCode', { parameterName: text });
    };

    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <SafeAreaView>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <SafeAreaView style={styles.container}>
                        <View style={styles.header}>
                            <View style={{ flex: 1 }}></View>
                            <Pressable style={styles.crossCircle} onPress={() => navigation.navigate('HomeOwnerNavigation')}>
                                <Text style={styles.crossTitle}>X</Text>
                            </Pressable>
                        </View>

                        <View style={styles.titleBox}>
                            <Text style={styles.title}>Zoek uw klus</Text>
                        </View>
                        <View style={styles.titleBox}>
                            <Text style={styles.titleLight}>Klussen worden gezocht in alle sectoren en door heel Nederland. Laat ons weten waar je wilt werken, en we assisteren je bij het vinden van passende klussen.</Text>
                        </View>

                        <View style={styles.beroepContainer}>
                            <Text style={styles.beroepTitle}>Uw hoofdberoep</Text>
                            <Pressable testID="beroepInput" style={styles.containerInput}>
                                <TextInput
                                    placeholder="Zoeken:"
                                    style={styles.input}
                                    onChangeText={handleInputChange}
                                    onFocus={handleInputFocus}
                                    value={inputText}
                                />
                            </Pressable>
                            <Text style={styles.beroepTitle}>Email</Text>
                            <Pressable testID="emailInput" style={styles.containerInput}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    onChangeText={setEmail}
                                    value={email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </Pressable>
                            <Text style={styles.beroepTitle}>Postcode</Text>
                            <View style={styles.inputContainer}>
                                <TextInput testID="nummerInput"
                                    style={styles.inputPostal}
                                    placeholder="1234"
                                    onChangeText={(text) => handlePostalCodeChange(text, 'part1')}
                                    value={postalCode.part1}
                                    maxLength={4}
                                    keyboardType="numeric"
                                />
                                <TextInput testID="letterInput"
                                    style={styles.inputPostal}
                                    placeholder="AB"
                                    onChangeText={(text) => handlePostalCodeChange(text.toUpperCase(), 'part2')}
                                    value={postalCode.part2}
                                    maxLength={2}
                                />
                            </View>
                            <Pressable style={styles.containerLogin} onPress={() => navigation.navigate('Login')}>
                                <Text style={{ color: '#000', fontSize: 16, }}>Al een account? <Text style={{ color: '#308BE5', fontSize: 16, }}>Inloggen</Text></Text>

                            </Pressable>
                        </View>
                        <View style={styles.bottomButtonsContainer}>
                            <View style={styles.buttonsContainer}>
                                <Pressable testID="volgendeBtn" style={[styles.nextButton]} onPress={handleForwardButtonPress}>
                                    <Text style={[styles.nextButtonText, styles.whiteButtonText]}>Volgende</Text>
                                </Pressable>
                            </View>

                        </View>
                    </SafeAreaView>
                </ScrollView>
                {showOptions && (
                    <ScrollView testID="optionsID" style={styles.optionsContainer}>
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
        height: windowHeight - 100,
    },

    containerLogin: {
        flex: 1,
        width: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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

    input: {
        flex: 1,
        fontSize: 16,
    },

    inputPostal: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 5,
        width: 143,
        textAlign: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderColor: "#f5f5f9",
        backgroundColor: "#fffefe",
    },

    beroepContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: windowHeight - 400,
        paddingTop: 60,
    },

    optionsContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 425 : 390,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
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
        marginTop: -20,
    },
    errorMessage: {
        color: 'red',
        fontSize: 16,
    },

    containerInput: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#f5f5f9",
        backgroundColor: "#fffefe",
        height: 40,
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

    textSearchWrapper: {
        width: windowWidth,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingLeft: 30,
        paddingRight: 30,
        gap: 20,
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
        width: 270,
        height: 65,
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


export default PostalCodeSpecialist;
