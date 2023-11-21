import { FormEvent, useState } from "react";
import { useAppForm } from "../hooks/useAppForm";
import { PostcodeForm } from "./steps/postcode";
import { InfoFormTwo } from "./steps/step2";
import { InfoFormThree } from "./steps/aanvullendeInformatie";
import { RegisterForm } from "./steps/registerForm";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { MailForm } from "./steps/mail";
import { Dimensions } from "react-native";

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

function AppForm() {
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<AppFormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useAppForm([<RegisterForm {...data} updateFields={updateFields} />]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) {
      return next();
    } else {
      //doe late hier de navigatie naar waar je moet zijn
    }
  }
  return (
    <View style={styles.loginContainer}>
      <View style={styles.topContainer}>
        <View style={styles.sectionContainer}>
          <Image
            style={styles.img}
            source={require("../../assets/images/logo2.png")}
          />
        </View>
      </View>
      <View style={styles.middleContainer}>{step}</View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          {isFirstStep && (
            <Pressable style={[styles.press, styles.pressBig]} onPress={next}>
              <Text style={styles.text}>
                {isLastStep ? "Verstuur" : "Volgende"}
              </Text>
            </Pressable>
          )}
          {!isFirstStep && (
            <View style={styles.buttonContainerTwo}>
              <Pressable style={styles.press} onPress={back}>
                <Text style={styles.text}>Back</Text>
              </Pressable>
              <Pressable style={[styles.press]} onPress={next}>
                <Text style={styles.text}>
                  {isLastStep ? "Verstuur" : "Volgende"}
                </Text>
              </Pressable>
            </View>
          )}
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
    height: windowHeight * 0.4,
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
export default AppForm;
