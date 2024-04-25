import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Pressable,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Dimensions } from "react-native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CompanySituation3 = ({ navigation }) => {

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

    const handleNext = () => {
        if (selectedItems.length === 0) {
            Alert.alert("Fout Melding", "Kies minimaal 1 situatie.", [
                { text: "Begrepen" },
            ]);
        } else {
            navigation.navigate("CompanySituation4");
        }
    };

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <View style={{ flex: 1 }}></View>
                        <Pressable style={styles.crossCircle} onPress={() => navigation.navigate('SpecialistNavigation')}>
                            <Text style={styles.crossTitle}>X</Text>
                        </Pressable>
                    </View>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>Bedrijf-situatie</Text>
                    </View>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>Wat is u huidige professionele situatie?</Text>
                    </View>

                    <Pressable testID="situatie-3 Keuze-1" style={[styles.pressableContainer]} onPress={() => toggleItemSelection(1)}>
                        <Text>Ik heb mijn bedrijf ingeschreven{'\n'}en wacht op mijn KVK-nummer</Text>
                        <TouchableOpacity
                            style={[styles.checkbox, selectedItems.includes(1) && styles.checkboxSelected]}
                            onPress={() => toggleItemSelection(1)}
                        />
                    </Pressable>
                    <Pressable testID="situatie-3 Keuze-2" style={[styles.pressableContainer]} onPress={() => toggleItemSelection(2)}>
                        <Text>Mijn bedrijf bestaat minder dan 3 maanden</Text>
                        <TouchableOpacity
                            style={[styles.checkbox, selectedItems.includes(2) && styles.checkboxSelected]}
                            onPress={() => toggleItemSelection(2)}
                        />
                    </Pressable>
                    <Pressable testID="situatie-3 Keuze-3" style={[styles.pressableContainer]} onPress={() => toggleItemSelection(3)}>
                        <Text>Mijn bedrijf bestaat 3 maanden tot 1 jaar</Text>
                        <TouchableOpacity
                            style={[styles.checkbox, selectedItems.includes(3) && styles.checkboxSelected]}
                            onPress={() => toggleItemSelection(3)}
                        />
                    </Pressable>
                    <Pressable testID="situatie-3 Keuze-4" style={[styles.pressableContainer]} onPress={() => toggleItemSelection(4)}>
                        <Text>Mijn bedrijf bestaat al langer dan 1 jaar</Text>
                        <TouchableOpacity
                            style={[styles.checkbox, selectedItems.includes(4) && styles.checkboxSelected]}
                            onPress={() => toggleItemSelection(4)}
                        />
                    </Pressable>
                    <Pressable testID="situatie-3 Keuze-5" style={[styles.pressableContainer]} onPress={() => toggleItemSelection(5)}>
                        <Text>Ik heb geen bedrijf</Text>
                        <TouchableOpacity
                            style={[styles.checkbox, selectedItems.includes(5) && styles.checkboxSelected]}
                            onPress={() => toggleItemSelection(5)}
                        />
                    </Pressable>

                    <View style={styles.buttonsContainer}>
                        <Pressable testID="vorigeBtn-5" style={[styles.nextButton, styles.nextButtonColorOne]} onPress={() => navigation.goBack()}>
                            <Text style={styles.nextButtonText}>Vorige</Text>
                        </Pressable>
                        <Pressable testID="volgendeBtn-6" style={[styles.nextButton]} onPress={handleNext}>
                            <Text style={[styles.nextButtonText, styles.whiteButtonText]}>
                                Volgende
                            </Text>
                        </Pressable>
                    </View>

                </SafeAreaView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: windowHeight - 100,
        display: "flex",
        alignItems: "center",
        gap: 10,
    },

    pressableContainer: {
        width: windowWidth - 20,
        height: 60,
        // paddingRight: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E9F4FF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    checkbox: {
        position: 'absolute',
        top: 20,
        right: 10,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
    },
    checkboxSelected: {
        backgroundColor: '#308be5',
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
        marginBottom: 20,
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
        marginTop: 50,
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


export default CompanySituation3;
