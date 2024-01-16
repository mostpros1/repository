import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Button,
  Alert,
  KeyboardAvoidingView,
  GestureResponderEvent,
} from "react-native";
import { FormEvent, useRef } from "react";
import { Auth } from "aws-amplify";
import DigitInputs from "../DigiInputs";

function Verify({ route,navigation }) {
  const inputRef = useRef<any>([]);

  const userEmail = route === null ? "" : route.email;

  function onSubmit(e: GestureResponderEvent) {
    e.preventDefault();
    let code: string = "";
    inputRef.current.forEach((input: HTMLInputElement) => {
      code += input.value;
    });

    Auth.confirmSignUp(userEmail, code)
      .catch((error) => console.error(error))
      .then((result) => {
        if (result == "SUCCESS") navigation.navigate("Login");
      });
  }
  const {itemID} = route.params;
  function alert (){
    Alert.alert(itemID)
  }
  return (
    <View>
      <View>
        <View>
          <Text>Bevestig uw e-mailadres</Text>
        </View>
        <Text>Er is een verificatiecode verzonden naar uw e-mailadres.</Text>
        <Text>
          Zoek in uw inbox naar een code, en voer die hieronder in. Let op: de
          mail kan mogelijk in uw spamfolder beland zijn.
        </Text>
        <DigitInputs
          className="bevestigemail_digits"
          amount={6}
          inputRef={inputRef}
        />
        <Pressable onPress={onSubmit}><Text>Bevestigen</Text></Pressable>
        <Text onPress={() => Auth.resendSignUp(userEmail)}>
          Nieuwe code versturen
        </Text>
      </View>
    </View>
  );
}

export default Verify;
