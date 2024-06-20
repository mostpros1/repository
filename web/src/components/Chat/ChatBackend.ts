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

  const handleSendMessage = async (text) => {
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
    if (!user || !user.attributes) {
      console.error("User object is not fully initialized.");
      return;
    }
    try {
      const uuid = getUUIDFromEmail(recipientEmail);
      const members = [user.attributes?.email, recipientEmail];
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
      localStorage.setItem("selectedContact", recipientEmail);

    } catch (error) {
      console.error("Error starting new chat:", error);
    }
  };



  const handleStartNewChatWithEmailDashboard = async (recipientEmail) => {
  console.log("Starting new chat with email dashboard...", recipientEmail); // Initial log

  if (!user ||!user.attributes) {
    console.error("User object is not fully initialized.");
    return;
  }

  console.log("User attributes available:", user.attributes); // Log user attributes

  try {
    const uuid = getUUIDFromEmail(recipientEmail);
    console.log("Generated UUID for recipient:", uuid); // Log generated UUID

    const members = [user.attributes?.email, recipientEmail];
    console.log('Creating chat with recipients:', members.join(', '));

    console.log("Calling API to create chat..."); // Before API call
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

    console.log('Chat creation succeeded'); // After successful API call

    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
    console.log("User groups:", groups); // Log user groups

    if (groups?.includes("Homeowner")) {
      console.log("User is Homeowner, redirecting..."); // Before redirect for Homeowners
      const url = `/nl/homeowner-dashboard/chat?recipient=${uuid}`;
      setRecipientEmail(recipientEmail);
      await handleSendMessage("Hallo");
      window.location.href = url;
    } else if (groups?.includes("Professional")) {
      console.log("User is Professional, redirecting..."); // Before redirect for Professionals
      const url = `/nl/pro-dashboard/chat?recipient=${uuid}`;
      setRecipientEmail(recipientEmail);
      await handleSendMessage("Hallo");
      window.location.href = url;
    } else {
      console.warn("User does not belong to Homeowner or Professional group."); // Log if no matching group found
    }

  } catch (error) {
    console.error("Error starting new chat:", error); // Existing error log
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
