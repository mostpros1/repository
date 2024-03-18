import { useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";
import { API } from "aws-amplify";
import * as mutations from "../../graphql/mutations";

export function useChatBackend(user: any, signOut) {
  // // saved value's or booleans // //
  const [chats, setChats] = React.useState([]);
  const [recipientEmail, setRecipientEmail] = React.useState("");
  const [recentMessageEmail, setRecentMessageEmail] = React.useState("");
  const [showJoinButton, setShowJoinButton] = React.useState(false);
  const [showConfirmedConnection, setShowConfirmedConnection] =
    React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");

  const navigate = useNavigate();

// // makes messages ///
  const handleSendMessage = async (text: any) => {
    const members = [user.attributes.email, recipientEmail];
    console.log(members)// Include both users in the chat
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

  const handleReceivedMessage = (receivedChat: any) => {
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
      navigate(`/chat`);
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

// import React, { useEffect, useState } from "react";
// import { API, graphqlOperation } from "aws-amplify";
// import * as mutations from "../../graphql/mutations";
// import * as queries from "../../graphql/queries";
// import * as subscriptions from "../../graphql/subscriptions";
// import { v4 as uuidv4 } from 'uuid';
// import { useNavigate } from 'react-router-dom';

// export function useChatBackend(user: any, signOut) {
//   const [chats, setChats] = React.useState([]);
//   const [recipientEmail, setRecipientEmail] = React.useState("");
//   const [recentMessageEmail, setRecentMessageEmail] = React.useState("");
//   const [showJoinButton, setShowJoinButton] = React.useState(false);
//   const [showConfirmedConnection, setShowConfirmedConnection] =
//     React.useState(false);
//   const [showAlert, setShowAlert] = React.useState(false);
//   const [notificationMessage, setNotificationMessage] = React.useState("");
//   const [currentChannelId, setCurrentChannelId] = useState("");
//   const navigate = useNavigate();

// const generateUniqueId = () => {
//   return uuidv4();
// };    
// const channelId = generateUniqueId();
// // // sends messages ///
//   const handleSendMessage = async (text) => {
//     const members = [user.attributes.email, recipientEmail];
//     console.log(members)// Include both users in the chat
//     await API.graphql({
//       query: mutations.createChat,
//       variables: {
//         input: {
//           text,
//           email: user.attributes.email,
//           members,
//           sortKey: members.sort().join("#"), // Create a unique sortKey
//           channelId,
//         },
//       },
//     });
//   };

//   const handleReceivedMessage = (receivedChat) => {
//     if (receivedChat.members.includes(user.attributes.email)) {
//       // @ts-ignore
//       setChats((prev) => [...prev, receivedChat]);
//       setRecentMessageEmail(receivedChat.email); // Update recentMessageEmail with the email of the sender
//       if (receivedChat.email) {
//         setShowJoinButton(true);
//       }
//     }
//   };
// // // Functions for make new Chat // //
//   const handleStartNewChat = () => {
//     setRecipientEmail(
//       // @ts-ignore
//       prompt("Enter the email of the person you want to chat with:")
//     );
//     setShowAlert(true);
//   };

//   const handleAlertInputChange = (e) => {
//     setRecipientEmail(e.target.value);
//   };

//   const handleAlertConfirm = () => {
//     if (recipientEmail) {
//       // @ts-ignore
//     handleSendMessage("Hello, let's chat!", channelId);
//     setShowAlert(false);
//     setShowJoinButton(false);
//     setShowConfirmedConnection(true);
//       setNotificationMessage(`${recentMessageEmail} joined the chat`);
//       // @ts-ignore
//       setCurrentChannelId(channelId);
//       navigate(`/channel/${channelId}`);
//     }
//   };

//   const handleAlertCancel = () => {
//     setShowAlert(false);
//     setRecipientEmail("");
//   };

// // // for recipientEmail to make connection to chat // //
// const handleJoinChat = () => {
//   console.log("Joining chat with email:", recentMessageEmail);
//   const members = [user.attributes.email, recentMessageEmail];
//   // @ts-ignore
//   setRecipientEmail(recentMessageEmail);
//   setRecentMessageEmail("");
//   setShowJoinButton(false);
//   setShowConfirmedConnection(true);
//   setNotificationMessage(`${recentMessageEmail} joined the chat`);

//   // Create a new chat with the same channelId
//   // @ts-ignore
//   handleSendMessage("Hello, let's chat!", channelId);
// };
   

//   return {
    
//     chats,
//     setChats,
//     recipientEmail, 
//     showJoinButton, setShowJoinButton,
//     currentChannelId, setCurrentChannelId,
//     showConfirmedConnection,
//     showAlert,
//     generateUniqueId,
//     notificationMessage,
//     handleStartNewChat,
//     handleSendMessage,
//     handleAlertInputChange,
//     handleAlertConfirm,
//     handleAlertCancel,
//     handleJoinChat,
//     recentMessageEmail,
//     handleReceivedMessage,
//     signOut,
//   };
// }