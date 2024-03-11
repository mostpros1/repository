import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Pressable, ScrollView, TextInput, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeOwnerEmail = ({ navigation }) => {
    const [progress, setProgress] = useState(4);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [email, setEmail] = useState('');

    
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleNext = () => {
        if (!email.trim()) {
            Alert.alert('Email Ontbreekt', 'Vul uw email in voor u doorgaat.');
        } else if (!validateEmail(email)) {
            Alert.alert('Ongeldige Email', 'Vul een geldig emailadres in.');
        } else {
            navigation.navigate('TestHome');
        }
    };

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
                    <Text style={styles.title}>Ontvang reacties van de specialist in jouw omgeving.</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.titleLight}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E-mailadres"
                        onChangeText={setEmail}
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
            </SafeAreaView>
            
            <View style={styles.bottomButtonsContainer}>
                <View style={styles.buttonsContainer}>
                    <Pressable style={[styles.nextButton, styles.nextButtonColorOne]} onPress={() => navigation.goBack()}>
                        <Text style={styles.nextButtonText}>Vorige</Text>
                    </Pressable>
                    <Pressable style={[styles.nextButton]} onPress={handleNext}>
                        <Text style={[styles.nextButtonText, styles.whiteButtonText]}>Volgende</Text>
                    </Pressable>
                </View>
            </View>
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
        fontWeight: "bold",
        color: "black",
        textAlign: 'left',
        fontSize: 15,
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
    inputContainer: {
        alignItems: 'center',
        marginTop: 20,
        display: "flex",
        height: "50%",
        justifyContent: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        width: '80%',
        marginTop: 10,
    },
    bottomButtonsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    buttonsContainer:{
        display: "flex",
        flexDirection: "row",
        gap: 15,
        justifyContent: "center",
        marginBottom: 60,
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


export default HomeOwnerEmail;
