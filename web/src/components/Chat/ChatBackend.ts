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
  const uuidEmailMap = React.useRef<{ [uuid: string]: string }>({});

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const getUUIDFromEmail = (email: string) => {
    for (let uuid in uuidEmailMap.current) {
      if (uuidEmailMap.current[uuid] === email) {
        return uuid;
      }
    }
    const newUUID = generateUUID();
    uuidEmailMap.current[newUUID] = email;
    return newUUID;
  };

  const handleSendMessage = async (text) => {
    const members = [user.attributes.email, recipientEmail];
    await API.graphql({
      query: mutations.createChat,
      variables: {
        input: {
          text: text,
          email: user.attributes.email,
          members,
          sortKey: members.sort().join("#"),
        },
      },
    });
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

  const handleStartNewChatWithEmail = async (recipientEmail) => {
    try {
      const uuid = getUUIDFromEmail(recipientEmail);
      const members = [user.attributes.email, recipientEmail];
      await API.graphql({
        query: mutations.createChat,
        variables: {
          input: {
            text: "",
            email: user.attributes.email,
            members,
            sortKey: members.sort().join("#"),
          },
        },
      });
      const url = `/chat?recipient=${uuid}`;
      window.history.pushState({}, "", url);
      setRecipientEmail(recipientEmail);
    } catch (error) {
      console.error("Error starting new chat:", error);
    }
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

  const handleJoinChat = (recentMessageEmail) => {
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
    handleStartNewChatWithEmail,
    handleSendMessage,
    handleAlertConfirm,
    handleAlertCancel,
    handleJoinChat,
    recentMessageEmail,
    handleReceivedMessage,
    signOut,
  };
}
