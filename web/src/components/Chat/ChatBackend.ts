import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";
import { dynamo } from "../../../declarations";
import { v4 as uuidv4 } from 'uuid';

export function useChatBackend(user: any, signOut) {
  const [chats, setChats] = React.useState<any[]>([]);
  const [recipientEmail, setRecipientEmail] = React.useState("");
  const [recentMessageEmail, setRecentMessageEmail] = React.useState("");
  const [showJoinButton, setShowJoinButton] = React.useState(false);
  const [showConfirmedConnection, setShowConfirmedConnection] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [visibleName, setVisibleName] = React.useState<string>(() => {
    if (user?.attributes?.email) {
      return user.attributes.email.split("@")[0];
    }
    return ""; // Default value if attributes or email is undefined
  });
  const [textSize, setTextSize] = React.useState<number>(14);
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

  const [isMessageSending, setIsMessageSending] = useState(false);

  const handleSendMessage = async (text) => {
    if (isMessageSending) {
      console.log("Message sending already in progress.");
      return;
    }
    setIsMessageSending(true);
    try {
      const sortedMembers = [user.attributes.email, recipientEmail].sort();
      const members = [user.attributes.email, recipientEmail];

      console.log("Sending message:", text, "to members:", members);


      try {
        await API.graphql(graphqlOperation(mutations.createChat, {
          input: {
            text,
            email: user.attributes.email,
            members,
            sortKey: sortedMembers.join("#"),
          }
        }));

        console.log("Message sent successfully");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsMessageSending(false);
    }
  };

  /*const handleSendMessage = async (text) => {
    const sortedMembers = [user.attributes.email, recipientEmail].sort();
    const members = [user.attributes.email, recipientEmail];

    console.log("Sending message:", text, "to members:", members);


    try {
      await API.graphql(graphqlOperation(mutations.createChat, {
        input: {
          text,
          email: user.attributes.email,
          members,
          sortKey: sortedMembers.join("#"),
        }
      }));

      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
    }

    /*
        try {
          const params = {
            TableName: 'Chat-ntkujizqujhnhewe6rjvu7n4om-acceptance', // Replace with your actual table name
            Item: {
              id: uuidv4(),
              text,
              email: user.attributes.email,
              members,
              sortKey: sortedMembers.join("#"),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              __typename: "Chat"
              // Include any other attributes you need to store
            },
          };
        
          await dynamo.put(params).promise();
          console.log("Message sent successfully");
        } catch (error) {
          console.error("Error sending message:", error);
        }
          
  };
  */


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
    if (isChatCreationInProgress) {
      console.log("Chat creation already in progress.");
      return;
    }
    setIsChatCreationInProgress(true);
    try {
      if (!user || !user.attributes) {
        console.error("User object is not fully initialized.");
        return;
      }

      try {
        const uuid = getUUIDFromEmail(recipientEmail);
        const members = [user.attributes.email, recipientEmail];
        const sortedMembers = members.sort().join("#");

        console.log("Creating chat with recipients:", members.join(', '));

        const result = await API.graphql(graphqlOperation(mutations.createChat, {
          input: {
            text: "",
            email: user.attributes.email,
            members,
            sortKey: sortedMembers,
          },
        }));

        console.log("Chat creation result:", result);

        const url = `/chat?recipient=${uuid}`;
        window.history.pushState({}, "", url);
        setRecipientEmail(recipientEmail);
        localStorage.setItem("selectedContact", recipientEmail);

      } catch (error) {
        console.error("Error starting new chat:", error);
      }
    } catch (error) {
      console.error("Error starting new chat:", error);
    } finally {
      setIsChatCreationInProgress(false);
    }
  };




  const [isChatCreationInProgress, setIsChatCreationInProgress] = React.useState(false);

  const handleStartNewChatWithEmailDashboard = async (recipientEmail) => {
    console.log("Starting new chat with email dashboard...", recipientEmail);

    if (!user || !user.attributes) {
      console.error("User object is not fully initialized.");
      return;
    }

    // Check if a chat creation process is already in progress
    if (isChatCreationInProgress) {
      console.log("A chat creation process is already in progress.");
      return;
    }

    try {
      setIsChatCreationInProgress(true); // Set the flag to true when starting the process

      const uuid = getUUIDFromEmail(recipientEmail);
      const members = [user.attributes.email, recipientEmail];
      const sortedMembers = members.sort().join("#");

      console.log('Creating chat with recipients:', members.join(', '));

      const result = await API.graphql(graphqlOperation(mutations.createChat, {
        input: {
          text: "",
          email: user.attributes.email,
          members,
          sortKey: sortedMembers,
        },
      }));

      console.log("Chat creation result:", result);

      const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
      console.log("User groups:", groups);

      if (groups?.includes("Homeowner")) {
        console.log("User is Homeowner, redirecting...");
        const url = `/nl/homeowner-dashboard/chat?recipient=${uuid}`;
        setRecipientEmail(recipientEmail);
        window.location.href = url;
      } else if (groups?.includes("Professional")) {
        console.log("User is Professional, redirecting...");
        const url = `/nl/pro-dashboard/chat?recipient=${uuid}`;
        setRecipientEmail(recipientEmail);
        window.location.href = url;
      } else {
        console.warn("User does not belong to Homeowner or Professional group.");
      }

    } catch (error) {
      console.error("Error starting new chat:", error);
    } finally {
      setIsChatCreationInProgress(false); // Reset the flag after the process completes or fails
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
    localStorage.setItem("selectedContact", recentMessageEmail);
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
    handleStartNewChatWithEmailDashboard,
    handleSendMessage,
    handleAlertConfirm,
    handleAlertCancel,
    handleJoinChat,
    recentMessageEmail,
    handleReceivedMessage,
    signOut,
    visibleName,
    setVisibleName,
    textSize,
    setTextSize
  };
}
