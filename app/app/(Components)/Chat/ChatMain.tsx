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
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Enter') {
                  handleSendMessage(nativeEvent.text);
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
    chatWrapper: {
      flex: 1,
      paddingVertical: 150,
      paddingHorizontal: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chatCon: {
      maxWidth: 1200,
      width: '100%',
      flexDirection: 'row',
    },
    chatLeftSide: {
      borderColor: '#308AE4',
      borderWidth: 2,
      width: '20%',
    },
    chatBtnCon: {
      height: '30%',
      flexDirection: 'column',
      padding: 15,
      gap: 10,
    },
    buttonc: {
      backgroundColor: '#308AE4',
      borderRadius: 10,
      padding: 15,
      width: '100%',
      borderColor: 'transparent',
      color: 'white',
      fontSize: 15,
      alignSelf: 'center',
    },
    username: {
      fontSize: 18,
    },
    contactList: {
      height: '70%',
      borderBottomColor: '#308AE4',
      borderBottomWidth: 2,
    },
    chatBoxCon: {
      width: '80%',
    },
    chatBox: {
      flexDirection: 'column',
      width: '100%',
      height: 500,
      gap: 40,
      overflow: 'scroll',
      padding: 15,
    },
    chatBoxUserInfo: {
      flexDirection: 'column',
    },
    otherEnd: {
      backgroundColor: '#308AE4',
      alignSelf: 'flex-start',
      padding: 5,
      paddingHorizontal: 15,
      borderRadius: 10,
      maxWidth: '70%',
    },
    otherEndText: {
      color: 'white',
      wordWrap: 'break-word',
      fontSize: 18,
    },
    selfEnd: {
      alignSelf: 'flex-end',
      backgroundColor: 'rgb(236, 236, 236)',
      padding: 5,
      paddingHorizontal: 15,
      borderRadius: 10,
      maxWidth: '70%',
    },
    selfEndText: {
      wordWrap: 'break-word',
      fontSize: 18,
    },
    inputForm: {
      flexDirection: 'row',
      borderColor: '#C0C0C8',
      borderWidth: 2,
      width: '100%',
    },
    inputChat: {
      flex: 1,
      borderWidth: 0,
    },
    chatEnter: {
      justifyContent: 'center',
      alignItems: 'center',
      borderLeftColor: '#C0C0C8',
      borderLeftWidth: 2,
      padding: 15,
    },
  });

export default withAuthenticator(ChatMain);