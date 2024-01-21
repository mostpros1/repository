import { FormEvent, useState } from "react";
import { useAppForm } from "../../hooks/useAppForm";
import { PostcodeForm } from "./steps/postcode";
import { InfoFormTwo } from "./steps/step2";
import { InfoFormThree } from "./steps/aanvullendeInformatie";
import { LoginForm } from "./steps/loginForm";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { MailForm } from "./steps/mail";
import { Dimensions } from "react-native";
import { Auth } from "aws-amplify";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type AppFormData = {
  email: string;
  password: string;
};
const INITIAL_DATA: AppFormData = {
  email: "",
  password: "",
};

function AppForm({navigation}) {
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<AppFormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useAppForm([<LoginForm {...data} updateFields={updateFields} />]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) {
      return next();
    } else {
      await Auth.signIn(data.email, data.password)
      .then(() => navigation.navigate("Home"))
        .catch((err) => {
          console.error(err)
        })
    }
  }
  return (
    <View style={styles.loginContainer}>

      <Text>Hi OwO :3</Text>
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
