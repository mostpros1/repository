import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import API, { graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import { useNavigation } from '@react-navigation/native';
import { useChatBackend } from './ChatBackend'; // This should be adapted for React Native as in the previous example

function ChatMain({ user, signOut }) {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const {
    chats,
    handleStartNewChat,
    handleSendMessage,
    handleAlertCancel,
    handleJoinChat,
    handleReceivedMessage,
    showJoinButton,
    recipientEmail,
  } = useChatBackend(user, signOut);

  const [messageText, setMessageText] = useState("");

  const sendMessage = () => {
    handleSendMessage(messageText);
    setMessageText(""); // Clear the input field after sending the message
  };

  

  return (
  <KeyboardAvoidingView 
    style={{ flex: 1 }} 
    behavior={Platform.OS === "ios" ? "padding" : "height"} 
    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
    <View style={styles.container}>
      <View style={styles.alert}>
        <Text>Chatting with: {recipientEmail}</Text>
      </View>
      <ScrollView style={styles.chatListContainer} ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
        {chats.sort((a, b) => a.createdAt.localeCompare(b.createdAt)).map((chat) => (
          <View key={chat.id} style={chat.email === user.attributes.email ? styles.selfMessage : styles.otherMessage}>
            <Text style={styles.username}>{chat.email}</Text>
            <Text style={styles.text}>{chat.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputForm}>
        <TextInput
          style={styles.inputChat}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message..."
          multiline={true}
          />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  </KeyboardAvoidingView>
);
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-end', // Ensure the chat input is always visible
      backgroundColor: '#f5f5f5', // Light grey background for contrast
  },
  chatListContainer: {
      flex: 1, // Take up all available space
      paddingHorizontal: 10, // Spacing from sides
      marginVertical: 10, // Spacing from top & bottom
  },
  alert: {
      marginBottom: 10,
      backgroundColor: '#f8d7da', // Light red for alerts
      borderRadius: 18, // Smoothed corners
      padding: 10, // Inner spacing
      borderWidth: 1, // Border thickness
      borderColor: '#f5c6cb', // Border color slightly darker than the background
      alignItems: 'center', // Center the text and button
      marginTop: 50,
  },
  inputForm: {
      flexDirection: 'row', // Align items in a row
      backgroundColor: '#fff', // White background for input area
      borderTopColor: '#E0E0E0', // Light border color
      borderTopWidth: 1, // Border thickness
      padding: 8, // Padding around the input area
      marginBottom: 20,
  },
  inputChat: {
      flex: 1, // Take up as much space as possible
      marginRight: 10, // Space from the send button
      padding: 10, // Inner text padding
      backgroundColor: '#e9e9eb', // Slightly off-white background
      borderRadius: 20, // Fully rounded corners
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
