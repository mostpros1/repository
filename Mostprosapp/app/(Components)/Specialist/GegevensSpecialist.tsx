import React, { useState, useEffect } from "react";
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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'; // Import RouteProp
import { specialists } from '../../specialists.js';
import Icon from "@expo/vector-icons/MaterialIcons";

// Define the type of route.params
type RootStackParamList = {
  HomeOwnerCreate: { selectedOption: any }; // Change 'any' to the type of selectedOption
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GegevensSpecialist = ({ navigation }) => {
    const [progress, setProgress] = useState(3);
    const [selectedOption, setSelectedOption] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [inputText, setInputText] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [postalCode, setPostalCode] = useState({ part1: '', part2: '' });

    const route = useRoute<RouteProp<RootStackParamList, 'HomeOwnerCreate'>>(); // Specify the route type

    useEffect(() => {
        // Set selectedOption from the route parameters
        if (route.params && route.params.selectedOption) {
            setSelectedOption(route.params.selectedOption);
        }
    }, [route.params]);

    const handlePostalCodeChange = (text, part) => {
        if (part === 'part1' && text.length <= 4) {
            setPostalCode({ ...postalCode, part1: text });
        } else if (part === 'part2' && text.length <= 2) {
            setPostalCode({ ...postalCode, part2: text });
        }
    };

    const handlePhoneNumberChange = (text) => {
        const formattedPhoneNumber = text.replace(/[^\d]/g, '');
        if (formattedPhoneNumber.length <= 9) {
            setPhoneNumber(formattedPhoneNumber);
        }
    };
  
    const handleInputChange = (text) => {
        setInputText(text);
    };
  
    const handleInputFocus = () => {
        setShowOptions(true);
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
        // navigation.navigate('HomeOwnerCreate', { selectedOption: selectedOption });
        navigation.navigate('OmgevingSpecialist')
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
                    <Text style={styles.title}>Vul uw gegevens in</Text>
                </View>
                <View style={styles.beroepContainer}>
                        <Text style={styles.beroepTitle}>Voornaam:</Text>
                        <Pressable style={styles.containerInput}>
                    <TextInput
                            placeholder="Voornaam:"
                            style={styles.input}
                        />
                    </Pressable>
                    <Text style={styles.beroepTitle}>Achternaam:</Text>
                        <Pressable style={styles.containerInput}>
                    <TextInput
                            placeholder="Achternaam:"
                            style={styles.input}
                        />
                    </Pressable>
                    <Text style={styles.beroepTitle}>Telefoonnummer:</Text>
                        <Pressable style={styles.containerInput}>
                            <View style={styles.phoneContainer}>
                                <Text>+31</Text>
                                <Image source={require('../../../assets/images/nlflag.png')}/>
                            </View>
                            <TextInput
                                    placeholder="Telefoonnummer:"
                                    style={styles.input}
                                    keyboardType="phone-pad"
                                    onChangeText={handlePhoneNumberChange}
                                    value={phoneNumber}
                                />
                    </Pressable>
                    <Text style={styles.beroepTitle}>Wachtwoord:</Text>
                        <Pressable style={styles.containerInput}>
                    <TextInput
                            placeholder="Wachtwoord:"
                            style={styles.input}
                            secureTextEntry={true}
                        />
                    </Pressable>
                    <Text style={styles.beroepTitle}>Herhaal Wachtwoord:</Text>
                        <Pressable style={styles.containerInput}>
                        <TextInput
                            placeholder="Herhaal Wachtwoord:"
                            style={styles.input}
                            secureTextEntry={true}
                        />
                    </Pressable>
                </View>
                <View style={styles.buttonsContainer}>
                    <Pressable style={[styles.nextButton, styles.nextButtonColorOne]} onPress={() => navigation.goBack()}>
                        <Text style={styles.nextButtonText}>Vorige</Text>
                    </Pressable>
                    <Pressable style={[styles.nextButton]} onPress={handleForwardButtonPress}>
                        <Text style={[styles.nextButtonText, styles.whiteButtonText]}>Volgende</Text>
                    </Pressable>
                </View>
                
            </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        height: windowHeight - 100,
    },

    containerLogin:{
        flex: 1,
        width: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    phoneContainer:{
        width: 70,
        gap: 5,
        height: "150%",
        backgroundColor: "#fefeff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },

    beroepTitle:{
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

      inputPostal:{
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

      beroepContainer:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: windowHeight - 200,
        paddingTop: 50,
        paddingBottom: 30,
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
        marginTop: 10,
    },
    errorMessage: {
        color: 'red',
        fontSize: 16,
    },

      containerInput: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#f5f5f9",
        backgroundColor: "#f9f9f8",
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
    titleLight:{
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
    buttonsContainer:{
        paddingTop: 12,
        marginBottom: 12,
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

    nextButtonColorOne:{
        backgroundColor: "#fffefe",
        borderWidth: 3,
        borderColor: "#7db7ec",
    },

    nextButtonText: {
        fontSize: 13,
        fontWeight: "bold",
        textAlign: 'center',
    },

    whiteButtonText:{
        color: "#fff",
    },
});


export default GegevensSpecialist;
