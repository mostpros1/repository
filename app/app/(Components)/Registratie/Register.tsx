import { useState } from "react";
import { useAppForm } from "../../hooks/useAppForm";
import { RegisterForm } from "./registerForm";
import { useNavigation } from "@react-navigation/native";
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Image,
    Button,
    Alert,
    KeyboardAvoidingView,
} from "react-native";
import { Dimensions } from "react-native";
import { Auth } from "aws-amplify";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type AppFormData = {
    voornaam: string;
    achternaam: string;
    email: string;
    telefoonNummer: string;
    password: string;
};
const INITIAL_DATA: AppFormData = {
    voornaam: "",
    achternaam: "",
    email: "",
    telefoonNummer: "",
    password: "",
};

function Register( ) {
    const navigation = useNavigation();
    const [data, setData] = useState(INITIAL_DATA);
    function updateFields(fields: Partial<AppFormData>) {
        setData((prev) => {
            return { ...prev, ...fields };
        });
    }

    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
        useAppForm([<RegisterForm {...data} updateFields={updateFields} />]);

    function onSubmit({}) {
        
        if (!isLastStep) {
            return next();
        } else {
            Auth.signUp({
                username: data.email.trim(),
                password: data.password.trim(),
                attributes: {
                    name: data.voornaam.trim(),
                    family_name: data.achternaam.trim(),
                    email: data.email.trim(),
                    phone_number: data.telefoonNummer.trim(),
                },
                autoSignIn: { enabled: true },
            })
                .then(() => navigation.navigate("Verify", {
                    email: data.email as string,
                }))
                .catch((error) => {
                    console.error(error);
                    console.log(error.code);

                    switch (error.code) {
                        case "InvalidParameterException":
                            // logic for if wrong info was entered
                            break;
                        case "UsernameExistsException":
                            // logic for if user already exists
                            break;
                    }
                });
        }
    }
    return (
        <View style={styles.loginContainer}>
            <View style={styles.topContainer}>
                <View style={styles.sectionContainer}>
                    <Image
                        style={styles.img}
                        source={require("../../../assets/images/logo2.png")}
                    />
                </View>
            </View>
            <View style={styles.middleContainer}>{step}</View>
            <View style={styles.bottomContainer}>
                <View style={styles.buttonContainer}>
                    <Pressable onPress={() => onSubmit('Verify')}>
                        <Text style={[styles.text]}>
                            Register
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    loginContainer: {
        display: "flex",
        alignItems: "center",
        height: windowHeight,
    },
    topContainer: {
        height: windowHeight * 0.3,
        justifyContent: "center",
    },
    middleContainer: {
        height: windowHeight * 0.3,
    },
    bottomContainer: {
        height: windowHeight * 0.2,
        display: "flex",
        justifyContent: "flex-end",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
    },
    buttonContainerTwo: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
    },
    sectionContainer: {
        height: "32%",
    },
    img: {
        width: 380,
    },
    press: {
        width: 180,
        height: 70,
        backgroundColor: "#308AE4",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    pressBig: {
        width: windowWidth * 0.8,
    },
    text: {
        color: "white",
    },
});
export default Register;
