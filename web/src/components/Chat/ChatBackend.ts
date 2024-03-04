import React, { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";




export function useChatBackend(user: any, signOut) {
  const [chats, setChats] = React.useState([]);
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
  console.log("Sending message to: ", members); // Debugging log
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
    if (typeof error === 'object' && error !== null) { // Checks if it's a non-null object
      // Assuming error is of GraphQL structure
      const graphQLError = error as { errors: Array<{ message: string }> };
      if (graphQLError.errors && graphQLError.errors.length > 0) {
        console.error("GraphQL errors:", graphQLError.errors.map(e => e.message).join(', '));
      } else {
        console.error("GraphQL Error without message", graphQLError);
      }
    } else if (error instanceof Error) {
      console.error("Error sending message:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
  }
  
  
   
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