import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    ImageBackground,
    Pressable,
} from "react-native";
const WorkNavigation = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.view}>
            <ImageBackground
                source={require("../../../assets/images/welkomBackground.png")}
                style={styles.backgroundImage}
            >
                <View style={styles.standardContainer}>
                    <View style={styles.sectionContainer}>
                        <Pressable style={styles.link} onPress={() => navigation.navigate('MyWork')}>
                            <Text style={[styles.text]}>Mijn Klussen 1</Text>
                        </Pressable>
                        <Pressable style={styles.link} onPress={() => navigation.navigate('MyWorkTwo')}>
                            <Text style={[styles.text]}>Mijn Klussen 2</Text>
                        </Pressable>
                        <Pressable style={styles.link} onPress={() => navigation.navigate('MyWorkThree')}>
                            <Text style={[styles.text]}>Mijn Klussen 3</Text>
                        </Pressable>
                        <Pressable style={styles.link} onPress={() => navigation.navigate('Changedate')}>
                            <Text style={[styles.text]}>ChageDate</Text>
                        </Pressable>
                        <Pressable style={styles.link} onPress={() => navigation.navigate('ChangedateTwo')}>
                            <Text style={[styles.text]}>ChageDateTwo</Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
    },
    topTitleBox: {
        height: 50,
        width: "87%",
        marginBottom: 40,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",

    },

    h1Title: {
        fontSize: 15,
        fontWeight: "500",
    },

    standardContainer: {
        display: "flex",
        alignItems: "center",
        marginTop: "35%",
    },
    sectionContainer: {
        height: "32%",
        gap: 8,
    },
    welkom: {
        fontSize: 40,
    },
    img: {
        width: 380,
    },
    link: {
        borderRadius: 10,
        backgroundColor: "#308AE4",
        width: 300,
        textAlign: "center",
        padding: 20,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
});

export default WorkNavigation;
