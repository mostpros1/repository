// import {
//   StyleSheet,
//   View,
//   Text,
//   Pressable,
//   Image,
//   Button,
//   Alert,
//   KeyboardAvoidingView,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// import { FormEvent, useRef } from "react";
// import { Auth } from "aws-amplify";
// import DigitInputs from "../DigiInputs";

// function Verify({ navigation }) {
//   // const location = useLocation();
//   const inputRef = useRef<any>([]);

//   const userEmail = location.state === null ? "" : location.state.email;

//   function onSubmit(e: FormEvent) {
//     e.preventDefault();
//     let code: string = "";
//     inputRef.current.forEach((input: HTMLInputElement) => {
//       code += input.value;
//     });

//     Auth.confirmSignUp(userEmail, code)
//       .catch((error) => console.error(error))
//       .then((result) => {
//         if (result == "SUCCESS") navigation.navigate("Login" as never);
//       });
//   }

//   return (
//     <View>
//       <View>
//         <View>
//           <Text>Bevestig uw e-mailadres</Text>
//         </View>
//         <Text>Er is een verificatiecode verzonden naar uw e-mailadres.</Text>
//         <Text>
//           Zoek in uw inbox naar een code, en voer die hieronder in. Let op: de
//           mail kan mogelijk in uw spamfolder beland zijn.
//         </Text>
//         <DigitInputs
//           className="bevestigemail_digits"
//           amount={6}
//           inputRef={inputRef}
//         />
//         <Pressable>Bevestigen</Pressable>
//         <Text onPress={() => Auth.resendSignUp(userEmail)}>
//           Nieuwe code versturen
//         </Text>
//       </View>
//     </View>
//   );
// }

// export default Verify;
