import React, { useState } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Pressable,
    ScrollView,
    Dimensions,
    TextInput,
    Platform,
    Keyboard,
} from "react-native";
import { specialists } from '../../specialists.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RevenueTool = ({ navigation }) => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobsPerMonth, setJobsPerMonth] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [inputText, setInputText] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const calculateRevenue = () => {
        if (selectedJob) {
            const selectedJobRate = selectedJob.value || 0;
            setRevenue(selectedJobRate * jobsPerMonth);
        } else {
            setRevenue(0);
        }
    };

    const handleInputChange = (text) => {
        setInputText(text);
    };

    const handleInputFocus = () => {
        setShowOptions(true);
    };

    const handleOptionPress = (specialist) => {
        setInputText(specialist.title);
        setSelectedJob(specialist);
        setShowOptions(false);
    };

    const handleOutsidePress = () => {
        Keyboard.dismiss();
        setShowOptions(false);
    };

    const handleForwardButtonPress = () => {
        if (!selectedJob) {
            setErrorMessage("Select a specialist first");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }
        calculateRevenue();
        // Additional logic can be added here if needed
    };

    const filteredOptions = specialists.filter(option =>
        option.title.toLowerCase().includes(inputText.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.revenueContainer}>
                    <Text style={styles.label}>Vul uw beroep in:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Bijvoorbeeld: Aanmener."
                            style={styles.input}
                            onChangeText={handleInputChange}
                            onFocus={handleInputFocus}
                            value={inputText}
                        />
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
                    <Text style={styles.label}>Jobs Per Month:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={jobsPerMonth.toString()}
                        onChangeText={(text) => setJobsPerMonth(parseInt(text) || 0)}
                    />
                    <Pressable style={styles.button} onPress={handleForwardButtonPress}>
                        <Text style={styles.buttonText}>Calculate Revenue</Text>
                    </Pressable>
                    <Text style={styles.label}>Revenue: €{revenue}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    revenueContainer: {
        width: windowWidth,
        padding: 20,
        backgroundColor: "#f0f8ff",
        alignItems: 'center',
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#318ae5",
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    input: {
        height: 40,
        width: '80%',
        borderWidth: 1,
        borderColor: "#318ae5",
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: "gray",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: 'center',
    },
    errorMessageContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    errorMessage: {
        color: 'red',
        fontSize: 16,
    },
    optionsContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 249 : 190,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        maxHeight: windowHeight * 0.3,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
});

export default RevenueTool;
