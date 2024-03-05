import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import API, { graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';
import { useChatBackend } from './ChatBackend'; // Ensure this is adapted for React Native

function ChatMain({ user, signOut }) {
  const {
    chats,
    setChats,
    recipientEmail,
    recentMessageEmail,
    showJoinButton,
    setShowJoinButton,
    showConfirmedConnection,
    showAlert,
    notificationMessage,
    handleStartNewChat,
    handleSendMessage,
    handleAlertInputChange,
    handleAlertConfirm,
    handleAlertCancel,
    handleJoinChat,
    handleReceivedMessage,
  } = useChatBackend(user, signOut);

  const [subtotalInput, setSubtotalInput] = useState("");

  const handleSubtotalChange = (text) => {
    const sanitizedValue = text.replace(/[^0-9.]/g, '');
    const isValidValue = sanitizedValue.split('.').length <= 2;

    if (isValidValue) {
      setSubtotalInput(sanitizedValue);
    }
  };

  useEffect(() => {
    async function fetchChats() {
        const allChats = await API.graphql(graphqlOperation(queries.listChats, {
        filter: {
          members: { contains: user.attributes.email },
        },
      }));
      setChats(allChats.data.listChats.items);
    }
    fetchChats();
  }, [user.attributes.email]);

  useEffect(() => {
    const sub = API.graphql(graphqlOperation(subscriptions.onCreateChat)).subscribe({
      next: ({ value }) => {
        handleReceivedMessage(value.data.onCreateChat);
      },
      error: (err) => console.log(err),
    });
    return () => sub.unsubscribe();
  }, [user.attributes.email]);

  const [messageText, setMessageText] = useState("");
  let PaymentLinkComponent = null;
  const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
  if (groups && groups.includes('Professional')) {
    PaymentLinkComponent = (
      <View>
        <TextInput
          style={styles.input}
          value={subtotalInput}
          onChangeText={handleSubtotalChange}
          placeholder="Enter subtotal"
          keyboardType="numeric"
        />
        {/* PaymentLink component adaptation needed */}
      </View>
    );
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.chatWrapper}>
        <View style={styles.chatContainer}>
          <View style={styles.chatListContainer}>
            {/* Contacts list adaptation needed */}
          </View>
          <View style={styles.chatButtonContainer}>
            <Button title="Start New Chat" onPress={handleStartNewChat} />
            {PaymentLinkComponent}
            <Button title="Sign Out" onPress={signOut} />
            {showAlert && (
              <View style={styles.alert}>
                <TextInput
                  style={styles.input}
                  value={recipientEmail}
                  onChangeText={handleAlertInputChange}
                  placeholder="Enter recipient's email"
                />
                <Button title="Confirm" onPress={() => {
                  handleAlertConfirm();
                  setShowJoinButton(true);
                }} />
                <Button title="Cancel" onPress={handleAlertCancel} />
              </View>
            )}
          </View>
        </View>

        <View style={styles.chatBoxContainer}>
          <ScrollView style={styles.chatBox}>
            {chats.sort((a, b) => a.createdAt.localeCompare(b.createdAt)).map((chat) => (
              <View key={chat.id} style={chat.email === user.attributes.email ? styles.selfEnd : styles.otherEnd}>
                <View style={styles.chatBoxUserInfo}>
                  <Text style={styles.username}>{chat.email}</Text>
                  <Text style={styles.time}>
                    {/* Format date distance */}
                  </Text>
                </View>
                <Text style={styles.text}>
                  {chat.text}
                </Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.inputForm}>
            
          <TextInput
            style={styles.inputChat}
            onChangeText={setMessageText} // Update this line
            onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Enter') {
                handleSendMessage(messageText); // Use the state variable here
                setMessageText(""); // Clear the message text after sending
            }
            }}
                placeholder="Type a message..."
            />
            {/* Button to send a message or use TouchableOpacity with custom styling */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Assuming you want the main container to fill the screen
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
    chatContainer: { // Assuming chatContainer styles here
        maxWidth: 1200,
        width: '100%',
        flexDirection: 'row',
    },
    chatListContainer: { // Assuming styles for chatListContainer
        width: '20%',
        borderColor: '#308AE4',
        borderWidth: 2,
    },
    chatButtonContainer: { // Assuming styles for chatButtonContainer
        height: '30%',
        padding: 15,
    },
    alert: { // Add styles for alert if needed
        // Your alert style here
    },
    input: { // If this is for the alert input
        // Your input style here
    },
    chatBoxContainer: { // Assuming this is the correct name for the chat box's container
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
    time: { // Add your time text styles here
        fontSize: 14,
    },
    text: { // Style for the text inside chat bubbles
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
