import React, { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";

export function useChatBackend(user: any, signOut) {
  const [chats, setChats] = React.useState<any[]>([]);
  const [recipientEmail, setRecipientEmail] = React.useState("");
  const [recentMessageEmail, setRecentMessageEmail] = React.useState("");
  const [showJoinButton, setShowJoinButton] = React.useState(false);
  const [showConfirmedConnection, setShowConfirmedConnection] =
    React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");

// // sends messages ///
const handleSendMessage = async (text) => {
  const members = [user.attributes.email, recipientEmail];
  await API.graphql({
    query: mutations.createChat,
    variables: {
      input: {
        text: text, // Correct gebruik van de 'text' variabele
        email: user.attributes.email,
        members,
        sortKey: members.sort().join("#"), // Create a unique sortKey
      },
    },
  });
};

const handleReceivedMessage = (receivedChat) => {
  if (receivedChat.members.includes(user.attributes.email)) {
    setChats((prevChats) => [...prevChats, receivedChat]); // Voeg het ontvangen bericht toe aan de lijst met chats
    setRecentMessageEmail(receivedChat.email); // Update recentMessageEmail met de email van de afzender
    if (receivedChat.email !== user.attributes.email) { // Controleer of de ontvangen chat niet van de huidige gebruiker is
      setShowJoinButton(true);
    }
  }
};

// // Functions for make new Chat // //
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
      setShowConfirmedConnection(true); 
      setNotificationMessage(`${recentMessageEmail} joined the chat`);
    }
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
    setRecipientEmail("");
  };

// // for recipientEmail to make connection to chat // //
  const handleJoinChat = () => {
    console.log("Joining chat with email:", recentMessageEmail);
    const members = [user.attributes.email, recentMessageEmail];
    setRecipientEmail(recentMessageEmail);
    setRecentMessageEmail("");
    setShowJoinButton(false); 
    setShowConfirmedConnection(true); 
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