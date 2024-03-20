import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Pressable, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeOwnerAppElektricien = ({ navigation }) => {
    const [progress, setProgress] = useState(2);
    const [selectedItems, setSelectedItems] = useState([]);

    const toggleItemSelection = (index) => {
        const updatedItems = [...selectedItems];
        if (updatedItems.includes(index)) {
            updatedItems.splice(updatedItems.indexOf(index), 1);
        } else {
            updatedItems.push(index);
        }
        setSelectedItems(updatedItems);
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
                    <Text style={styles.progressText}>Stap {progress} van de 5</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressIndicator, { width: `${(progress / 5) * 100}%` }]}></View>
                    </View>
                </View>

                <View style={styles.titleBox}>
                    <Text style={styles.title}>Wat moet er gedaan worden?</Text>
                </View>

                <View style={styles.cardsContainer}>
                    <View style={styles.card}>
                        <TouchableOpacity
                            style={[styles.checkbox, selectedItems.includes(0) && styles.checkboxSelected]}
                            onPress={() => toggleItemSelection(0)}
                        />
                        <Image source={require("../../../assets/images/elekone.png")} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>Stopcontacten installeren</Text>
                    </View>

                    <View style={styles.card}>
                        <TouchableOpacity
                            style={[styles.checkbox, selectedItems.includes(1) && styles.checkboxSelected]}
                            onPress={() => toggleItemSelection(1)}
                        />
                        <Image source={require("../../../assets/images/elektwo.png")} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>Groepenkast installeren of uitbreiden</Text>
                    </View>

                    <View style={styles.card}>
                        <TouchableOpacity
                            style={[styles.checkbox, selectedItems.includes(2) && styles.checkboxSelected]}
                            onPress={() => toggleItemSelection(2)}
                        />
                        <Image source={require("../../../assets/images/elekthree.png")} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>Deurbel of intercom installeren</Text>
                    </View>

                    <View style={styles.card}>
                        <TouchableOpacity
                            style={[styles.checkbox, selectedItems.includes(3) && styles.checkboxSelected]}
                            onPress={() => toggleItemSelection(3)}
                        />
                        <Image source={require("../../../assets/images/elekfour.png")} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>Zonnepaneel installeren of onderhouden</Text>
                    </View>

                    <View style={styles.card}>
                        <TouchableOpacity
                            style={[styles.checkbox, selectedItems.includes(4) && styles.checkboxSelected]}
                            onPress={() => toggleItemSelection(4)}
                        />
                        <Image source={require("../../../assets/images/elekfive.png")} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>Tuin of buitenverlichting installeren</Text>
                    </View>

                    <View style={styles.card}>
                        <TouchableOpacity
                            style={[styles.checkbox, selectedItems.includes(5) && styles.checkboxSelected]}
                            onPress={() => toggleItemSelection(5)}
                        />
                        <Image source={require("../../../assets/images/dots.png")} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>Anders</Text>
                    </View>
                </View>

                <View style={styles.buttonsContainer}>
                    <Pressable style={[styles.nextButton, styles.nextButtonColorOne]} onPress={() => navigation.goBack()}>
                        <Text style={styles.nextButtonText}>Vorige</Text>
                    </Pressable>
                    <Pressable style={[styles.nextButton]} onPress={() => navigation.navigate('HomeOwnerExtraInfo')}>
                        <Text style={[styles.nextButtonText, styles.whiteButtonText]}>Volgende</Text>
                    </Pressable>
                </View>

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
        height: windowHeight * 1.1,
    },
    cardsContainer: {
        width: windowWidth,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingVertical: 20,
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
    checkbox: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
    },
    checkboxSelected: {
        backgroundColor: '#308be5',
    },
    cardImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain', 
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
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

export default HomeOwnerAppElektricien;
