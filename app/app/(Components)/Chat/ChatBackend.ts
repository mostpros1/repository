import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import { Alert } from 'react-native'; // React Native way to show alerts
import React, { useState } from 'react'; 

export function useChatBackend(user: any, signOut) {
  const [chats, setChats] = React.useState([]);
  const [recipientEmail, setRecipientEmail] = React.useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [recentMessageEmail, setRecentMessageEmail] = React.useState('');
  const [showJoinButton, setShowJoinButton] = React.useState(false);
  const [showConfirmedConnection, setShowConfirmedConnection] =
    React.useState(false);

  // Function to handle sending messages
  const handleSendMessage = async (text) => {
    const members = [user.attributes.email, recipientEmail];
    console.log('Sending message to: ', members); // Debugging log
    try {
      await API.graphql(graphqlOperation(mutations.createChat, {
        input: {
          text,
          email: user.attributes.email,
          members,
          sortKey: members.sort().join("#"), // Create a unique sortKey
        },
      }));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleReceivedMessage = (receivedChat) => {
    if (receivedChat.members.includes(user.attributes.email)) {
      setChats((prev) => [...prev, receivedChat]);
      setRecentMessageEmail(receivedChat.email); // Update with the email of the sender
      if (receivedChat.email) {
        setShowJoinButton(true);
      }
    }
  };

  // Functions for starting new chats
  const handleStartNewChat = () => {
    Alert.prompt(
      'Start new chat',
      'Enter the email of the person you want to chat with:',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (email) => setRecipientEmail(email),
        },
      ],
      'plain-text',
    );
  };

  const handleAlertConfirm = () => {
    if (recipientEmail) {
      handleSendMessage("Hello, let's chat!");
      setShowConfirmedConnection(true); 
    }
  };

  const handleAlertCancel = () => {
    setShowAlert(false); // Assuming there's a state called `showAlert`
    setRecipientEmail(""); // Reset recipient email
};


  const handleJoinChat = () => {
    const members = [user.attributes.email, recentMessageEmail];
    setRecipientEmail(recentMessageEmail);
    setShowJoinButton(false); 
    setShowConfirmedConnection(true); 
  };

  const handleAlertInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientEmail(event.target.value); // Update the state to the input's current value
};


  return {
    chats,
    setChats,
    recipientEmail,
    showJoinButton,
    setShowJoinButton,
    showConfirmedConnection,
    handleStartNewChat,
    handleSendMessage,
    handleAlertConfirm,
    handleJoinChat,
    recentMessageEmail,
    handleReceivedMessage,
    signOut,
    handleAlertCancel,
    handleAlertInputChange,
    showAlert,
  };
}
