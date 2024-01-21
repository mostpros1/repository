import React from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { Dimensions } from "react-native";

import { Dispatch, SetStateAction } from 'react';
// import facebook from '../../assets/facebook_.svg';
// import google from '../../assets/google_.svg';
// import instagram from '../../assets/instagram_.svg';
// import { Link } from 'react-router-dom';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type LoginData = {
  email: string
  password: string
}

type LoginFormProps = LoginData & {
  updateFields: (fields: Partial<LoginData>) => void
  setUserExists: Dispatch<SetStateAction<boolean>>
  handleLogin: () => void;
}

export function LoginForm({ email, password, updateFields, setUserExists, handleLogin }: LoginFormProps) {
  return (
    <>
      <View>
        <Text>Login om vakspecialist te vinden</Text>
        <View>
          <View>
            <Text>Email</Text>
            <TextInput
              type="email"
              placeholder='Bijv. joe@hotmail.com'
              value={email}
              onChange={e => updateFields({ email: e.target.value })}
            />
            <Text>Password</Text>
            <input
              required
              type="password"
              placeholder='Wachtwoord'
              value={password}
              onChange={e => updateFields({ password: e.target.value })}
            />
          </View>
          <p className='login-link'>Nog geen account? <a href="#" onClick={() => setUserExists(false)}>Account aanmaken</a></p>
          {/* <Link className='login-link' to="/wachtwoord-vergeten">Wachtwoord vergeten?</Link> */}
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </View>
        <View className='social-con'>
          <View>Of login met onderstaande opties</View>
          <View><img src={facebook} alt="" />Facebook</View>
          <View><img src={google} alt="" />Gmail</View>
          <View><img src={instagram} alt="" />Instagram</View>
        </View>
      </View>
    </>
  )
}