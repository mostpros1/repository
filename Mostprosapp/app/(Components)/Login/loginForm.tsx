import React from "react";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { Dimensions } from "react-native";
 
import { Dispatch, SetStateAction } from "react";
// import facebook from '../../../../assets/images/facebook_.svg';
// import google from '../../assets/google_.svg';
// import instagram from '../../assets/instagram_.svg';
// import { Link } from 'react-router-dom';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
 
type LoginData = {
  email: string;
  password: string;
};
 
type LoginFormProps = LoginData & {
  updateFields: (fields: Partial<LoginData>) => void;
  setUserExists: Dispatch<SetStateAction<boolean>>;
  handleLogin: () => void;
};
 
export function LoginForm({
  email,
  password,
  updateFields,
  setUserExists,
  handleLogin,
}: LoginFormProps) {
  const navigation = useNavigation();
  return (
    <>
      <View>
        <Text>Login om vakspecialist te vinden</Text>
        <View>
          <View>
            <Text>Email</Text>
            <TextInput
              placeholder="Bijv. joe@hotmail.com"
              value={email}
              onChangeText={(text) => updateFields({ email: text })}
            />
            <Text>Password</Text>
            <TextInput
              placeholder="Wachtwoord"
              value={password}
              onChangeText={(text) => updateFields({ password: text })}
            />
          </View>
          <Text>
            Nog geen account?{" "}
            <Pressable onPress={() => setUserExists(false)}>
              <Text>Account aanmaken</Text>
            </Pressable>
          </Text>
          {/* <Link className='login-link' to="/wachtwoord-vergeten">Wachtwoord vergeten?</Link> */}
          <Pressable onPress={handleLogin}>
            <Text>Login</Text>
          </Pressable>
        </View>
        <View>
          <View><Text>Of login met onderstaande opties</Text></View>
          {/* <View><img src={facebook} alt="" />Facebook</View>
          <View><img src={google} alt="" />Gmail</View>
          <View><img src={instagram} alt="" />Instagram</View> */}
        </View>
<<<<<<< HEAD

        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonTitle}>Inloggen</Text>
        </Pressable>
        <Pressable style={styles.loginButton} onPress={() => navigation.navigate("PostalCodeSpecialist")}>
  <Text style={styles.buttonTitle}>Tijdelijke Login Knop</Text>
</Pressable>
=======
>>>>>>> acceptance
      </View>
    </>
  );
}