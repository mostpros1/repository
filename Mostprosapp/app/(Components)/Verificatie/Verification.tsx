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
  TextInput,
} from "react-native";
import { FormEvent, useRef, useState } from "react";
import { Auth } from "aws-amplify";
import DigitInputs from "./DigitInputs";
function Verify({ route,navigation }) {
  const inputRef = useRef([]);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const userEmail = route === null ? "" : route.params.email;

  function onSubmit(e: GestureResponderEvent) {
    e.preventDefault();
    Alert.alert(inputValues.join(""))
    Auth.confirmSignUp(userEmail, inputValues.join(""))
      .catch((error) => console.error(error))
      .then((result) => {
        if (result == "SUCCESS") navigation.navigate("Home");
      });
  }
  const {itemID} = route.params;
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
          setInputValues={setInputValues}
          inputValues={inputValues}
          amount={6}
          inputRef={inputRef}
        />
        <Pressable onPress={onSubmit}><Text>Bevestigen</Text></Pressable>
       
        <Text onPress={() => Auth.resendSignUp(userEmail)}>
          Nieuwe code versturen
        </Text>
<Text>HE</Text>
<Text>HE</Text>
<Text>HE</Text>
<Text>HE</Text>

<Text>HE</Text>
<Text>HE</Text>

        <Pressable onPress={alert}><Text>Alert</Text></Pressable>
      </View>
    </View>
  );
}

export default Verify;
