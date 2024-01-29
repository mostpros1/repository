import React, { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";




export function useChatBackend(user, signOut) {
  const [chats, setChats] = React.useState([]);
  const [recipientEmail, setRecipientEmail] = React.useState("");
  const [recentMessageEmail, setRecentMessageEmail] = React.useState("");
  const [showJoinButton, setShowJoinButton] = React.useState(false);
  const [showConfirmedConnection, setShowConfirmedConnection] =
    React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");


  const handleSendMessage = async (text) => {
    const members = [user.attributes.email, recipientEmail]; // Include both users in the chat
    await API.graphql({
      query: mutations.createChat,
      variables: {
        input: {
          text,
          email: user.attributes.email,
          members,
          sortKey: members.sort().join("#"), // Create a unique sortKey
        },
      },
    });
  };

  const handleReceivedMessage = (receivedChat) => {
    if (receivedChat.members.includes(user.attributes.email)) {
      // @ts-ignore
      setChats((prev) => [...prev, receivedChat]);
      setRecentMessageEmail(receivedChat.email); // Update recentMessageEmail with the email of the sender
      if (receivedChat.email) {
        setShowJoinButton(true);
      }
    }
  };

  const handleStartNewChat = () => {
    setRecipientEmail(
      // @ts-ignore
      prompt("Enter the email of the person you want to chat with:")
    );
    setShowAlert(true);
  };

  const handleAlertInputChange = (e) => {
    setRecipientEmail(e.target.value);
  };

  const handleAlertConfirm = () => {
    if (recipientEmail) {
      handleSendMessage("Hello, let's chat!");
      setShowAlert(false);
      setShowJoinButton(false);
      setShowConfirmedConnection(true); // Show the button to indicate that the user has joined the chat
      setNotificationMessage(`${recentMessageEmail} joined the chat`);
    }
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
    setRecipientEmail("");
  };

  const handleJoinChat = () => {
    console.log("Joining chat with email:", recentMessageEmail);
    const members = [user.attributes.email, recentMessageEmail];
    setRecipientEmail(recentMessageEmail);
    setRecentMessageEmail("");
    setShowJoinButton(false); // Hide the "Join Chat" button after clicking it
    setShowConfirmedConnection(true); // Show the button to indicate that the user has joined the chat
    setNotificationMessage(`${recentMessageEmail} joined the chat`);
  };

return {
    chats,
    setChats,
    recipientEmail, 
    showJoinButton, setShowJoinButton,
    showConfirmedConnection,
    showAlert,
    notificationMessage,
    handleStartNewChat,
    handleSendMessage,
    handleAlertInputChange,
    handleAlertConfirm,
    handleAlertCancel,
    handleJoinChat,
    recentMessageEmail,
    handleReceivedMessage,
    signOut,
  };
}