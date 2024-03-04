import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Pressable,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CompanySituation4 = ({ navigation }) => {

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
                        <Text style={styles.title}>Hoeveel personen zijn er werkzaam in jouw bedrijf?</Text>
                    </View>

                    <Pressable style={[styles.pressableContainer]} onPress={() => toggleItemSelection(1)}>
                        <Text>Ik ben zelfstandig ondernemer,{'\n'}zonder medewerkers</Text>
                        <TouchableOpacity
                            style={[styles.checkbox, selectedItems.includes(1) && styles.checkboxSelected]}
                            onPress={() => toggleItemSelection(1)}
                        />
                    </Pressable>

                    <Pressable style={[styles.pressableContainer]} onPress={() => toggleItemSelection(2)}>
                        <Text>1 medewerker</Text>
                        <TouchableOpacity
                            style={[styles.checkbox, selectedItems.includes(2) && styles.checkboxSelected]}
                            onPress={() => toggleItemSelection(2)}
                        />
                    </Pressable>
                    <Pressable style={[styles.pressableContainer]} onPress={() => toggleItemSelection(3)}>
                        <Text>2 tot 10 medewerkers</Text>
                        <TouchableOpacity
                            style={[styles.checkbox, selectedItems.includes(3) && styles.checkboxSelected]}
                            onPress={() => toggleItemSelection(3)}
                        />
                    </Pressable>
                    <Pressable style={[styles.pressableContainer]} onPress={() => toggleItemSelection(4)}>
                        <Text>Meer dan 10 medewerkers</Text>
                        <TouchableOpacity
                            style={[styles.checkbox, selectedItems.includes(4) && styles.checkboxSelected]}
                            onPress={() => toggleItemSelection(4)}
                        />
                    </Pressable>

                    <View style={styles.buttonsContainer}>
                        <Pressable style={[styles.nextButton, styles.nextButtonColorOne]} onPress={() => navigation.goBack()}>
                            <Text style={styles.nextButtonText}>Vorige</Text>
                        </Pressable>
                        <Pressable style={[styles.nextButton]} onPress={() => navigation.navigate('CompanyKvk')}>
                            <Text style={[styles.nextButtonText, styles.whiteButtonText]}>Volgende</Text>
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
        paddingRight: 10,
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


export default CompanySituation4;
