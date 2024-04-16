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
  try {
    await API.graphql({
      query: mutations.createChat,
      variables: {
        input: {
          text: text,
          email: user.attributes.email,
          members: [user.attributes.email, recipientEmail],
          sortKey: [user.attributes.email, recipientEmail].sort().join("#"),
        },
      },
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

const handleReceivedMessage = (receivedChat) => {
  if (receivedChat.members.includes(user.attributes.email)) {
    setChats((prevChats) => [...prevChats, receivedChat]);
    setRecentMessageEmail(receivedChat.email);
    if (receivedChat.email !== user.attributes.email) {
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
      setShowAlert(false);
      setShowJoinButton(false);
      setShowConfirmedConnection(true); 
    }
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
    setRecipientEmail("");
  };

  const handleJoinChat = (email) => {
    console.log("Joining chat with email:", email);
    setRecipientEmail(email);
    setRecentMessageEmail(email);
    setShowJoinButton(false);
    setShowConfirmedConnection(true);
    setNotificationMessage(`${email} joined the chat`);
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
