import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import API, { graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import { useNavigation } from '@react-navigation/native';
import { useChatBackend } from './ChatBackend'; // This should be adapted for React Native as in the previous example
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons";
import {launchImageLibrary} from 'react-native-image-picker';

function ChatMain({ user, signOut }) {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const {
    chats,
    handleSendMessage,
    handleAlertCancel,
    handleJoinChat,
    showJoinButton,
    recipientEmail,
  } = useChatBackend(user, signOut);

  const [messageText, setMessageText] = useState("");

  const sendMessage = () => {
    handleSendMessage(messageText);
    setMessageText("");
};

  return (
  <KeyboardAvoidingView 
    style={{ flex: 1 }} 
    behavior={Platform.OS === "ios" ? "padding" : "height"} 
    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
    <View style={styles.container}>
    <PaperProvider>
        <View style={styles.alert}>
          <Icon name="arrow-back-ios" size={35} color="#308ae4" onPress={sendMessage} />
          <Image style={styles.image} source={require("../../../assets/images/jan.png")}/>
          <Text style={styles.textchat}>{recipientEmail} Jan Schilder </Text>
        </View>
      <ScrollView style={styles.chatListContainer} ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
        {chats.sort((a, b) => a.createdAt.localeCompare(b.createdAt)).map((chat) => (
      <View key={chat.id} style={chat.email === (user?.attributes?.email || 'default@example.com') ? styles.selfMessage : styles.otherMessage}>
        <Text style={styles.username}>{chat.email}</Text>
        <Text style={styles.text}>{chat.text}</Text>
      </View>
      ))}

      </ScrollView>
      <View style={styles.inputForm}>
        <Icon name="add-circle" size={50} color="grey" onPress={sendMessage} />
        <TextInput
          style={styles.inputChat}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message..."
          multiline={true}
          />
        <Icon name="send" size={50} color="#308ae4" onPress={sendMessage} />
      </View>
      </PaperProvider>
    </View>
  </KeyboardAvoidingView>
);
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: '#f5f5f5',
  },
  chatListContainer: {
      flex: 1,
      paddingHorizontal: 10,
      marginVertical: 10,
  },
  alert: {
      marginBottom: 10,
      padding: 10,
      alignItems: 'center',
      marginTop: 50,
      height: 100,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      borderBottomWidth: 2,
      borderBottomColor: '#E0E0E0',
  },
  image: {
    width: 90,
    borderRadius: 50,
    height: undefined,
    aspectRatio: 1,
    marginRight: 30,
    marginBottom: 5,
  },
  textchat:{
    fontSize: 24,
    marginRight: 40,
  },
  inputForm: {
      flexDirection: 'row', // Align items in a row
      backgroundColor: '#fff', // White background for input area
      borderTopColor: '#E0E0E0', // Light border color
      borderTopWidth: 1, // Border thickness
      padding: 8, // Padding around the input area
  },
  inputChat: {
      flex: 1, // Take up as much space as possible
      marginRight: 10, // Space from the send button
      padding: 10, // Inner text padding
      backgroundColor: '#e9e9eb', // Slightly off-white background
      borderRadius: 20, // Fully rounded corners
      paddingTop: 15,
      fontSize: 18,
  },
  username: {
      fontWeight: 'bold', // Bold font for usernames
      color: '#4a5568', // Dark gray for text
      marginBottom: 2, // Space below the username
  },
  text: {
      fontSize: 16, // Slightly larger font for messages
      color: '#2d3748', // Even darker gray for better readability
  },
  selfMessage: {
      backgroundColor: '#dcf8c6', // Light green for self messages
      alignSelf: 'flex-end', // Align to the right
      borderRadius: 20, // Fully rounded corners
      marginBottom: 8, // Space below the message
      maxWidth: '80%', // Limit the max width
      padding: 12, // Inner padding
  },
  otherMessage: {
      backgroundColor: '#ffffff', // White for others' messages
      alignSelf: 'flex-start', // Align to the left
      borderRadius: 20, // Fully rounded corners
      marginBottom: 8, // Space below the message
      maxWidth: '80%', // Limit the max width
      padding: 12, // Inner padding
      borderWidth: 1, // Border thickness
      borderColor: '#E0E0E0', // Light border for distinction
  },
});


export default ChatMain;
