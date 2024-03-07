import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import API, { graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import { useChatBackend } from './ChatBackend'; // This should be adapted for React Native as in the previous example

function ChatMain({ user, signOut }) {
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
    <View style={styles.container}>
      <View style={styles.chatWrapper}>
        <ScrollView style={styles.chatListContainer}>
          {/* Chat list should be rendered here */}
          {chats.sort((a, b) => a.createdAt.localeCompare(b.createdAt)).map((chat) => (
            <View key={chat.id} style={chat.email === user.attributes.email ? styles.selfEnd : styles.otherEnd}>
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
        <Button title="Start New Chat" onPress={handleStartNewChat} />
        {showJoinButton && <Button title="Join Chat" onPress={handleJoinChat} />}
        <Button title="Sign Out" onPress={signOut} />
        {recipientEmail && (
          <View style={styles.alert}>
            <Text>Chatting with: {recipientEmail}</Text>
            <Button title="Cancel Chat" onPress={handleAlertCancel} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatWrapper: {
        flex: 1,
        paddingVertical: 150,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatContainer: {
        maxWidth: 1200,
        width: '100%',
        flexDirection: 'row',
    },
    chatListContainer: { 
        width: '20%',
        borderColor: '#308AE4',
        borderWidth: 2,
    },
    chatButtonContainer: { 
        height: '30%',
        padding: 15,
    },
    alert: { // Add styles for alert if needed
        // Your alert style here
    },
    input: { // If this is for the alert input
        // Your input style here
    },
    chatBoxContainer: {
        width: '80%',
    },
    chatBox: {
        height: 500,
        padding: 15,
    },
    chatBoxUserInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    username: {
        fontSize: 18,
    },
    time: {
        fontSize: 14,
    },
    text: {
        fontSize: 16,
    },
    selfEnd: {
        backgroundColor: 'rgb(236, 236, 236)',
        alignSelf: 'flex-end',
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        maxWidth: '70%',
    },
    otherEnd: {
        backgroundColor: '#308AE4',
        alignSelf: 'flex-start',
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        maxWidth: '70%',
    },
    inputForm: {
        flexDirection: 'row',
        borderColor: '#C0C0C8',
        borderWidth: 2,
    },
    inputChat: {
        flex: 1,
        padding: 10,
    },
});


export default withAuthenticator(ChatMain);
