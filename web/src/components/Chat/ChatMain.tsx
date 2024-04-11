import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useEffect, useRef } from "react";
import * as mutations from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import {intlFormatDistance} from "date-fns/intlFormatDistance";
import * as subscriptions from "../../graphql/subscriptions";
import { useChatBackend } from "./ChatBackend";
import "./chatbox.css";

function ChatMain({ user, signOut,}) {
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

  useEffect(() => {
    async function fetchChats() {
      const allChats = await API.graphql({
        query: queries.listChats,
        variables: {
          filter: {
            members: { contains: user.attributes.email },
          },
        },
      });
      // @ts-ignore
      setChats(allChats.data.listChats.items);
    }
    fetchChats();
  }, [user.attributes.email]);
  
  useEffect(() => {
    console.log("Checking for new messages...");
    const sub = API.graphql(
      graphqlOperation(subscriptions.onCreateChat)
      // @ts-ignore
    ).subscribe({
      next: ({ value }) => {
        console.log("Received a new message:", value.data.onCreateChat);
        handleReceivedMessage(value.data.onCreateChat);
      },
      error: (err) => console.log(err),
    });
    return () => sub.unsubscribe();
  }, [user.attributes.email]);

  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chats]);
  
  return (
    <div className="chat-container">
      <div className="sidebar" id="sidebar">
        {/* Sidebar content goes here */}
      </div>
    
      {showConfirmedConnection && (
        <div className="textjoined">
          <p>{notificationMessage}</p>
          <p>You have joined the chat</p>
        </div>
      )}
    
      <div className="button-container">
        <button type="button" className="buttona" onClick={handleStartNewChat}>
          Start New Chat
        </button>
        <button onClick={handleAlertConfirm} className="buttona">Confirm</button>
        <button onClick={handleAlertCancel} className="buttona">Cancel</button>
      {showAlert && (
        <div className="alert">
          <input
            type="text"
            placeholder="Enter recipient's email"
            value={recipientEmail}
            onChange={handleAlertInputChange}
          />
        </div>
      )}
      </div>
    
      <div className="chat-main">
        <div className="chatheader">
        <div className="chat-info">
          <div className="name-and-status">
            <h2 className="recipient-name">{recipientEmail}</h2>
          </div>
        </div>
      </div>
        
        <div className="chat-box scrollable-chatbox" ref={chatBoxRef}>
          {chats
          .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
          .map((chat) => (
          <div
            key={chat.id}
            className={`message-container ${
              chat.email === user.attributes.email ? "self-message-container" : "other-message-container"
            }`}
          >
        <div
          className={`message-bubble ${
            chat.email === user.attributes.email ? "self-message" : "other-message"
          }`}
        >
            <div className="username">
              <span className="username-name">{chat.email.split("@")[0]}</span>
            </div>
            <p className="text">{chat.text}</p>
          </div>
          <time dateTime={chat.createdAt} className="message-time">
            {`${intlFormatDistance(new Date(chat.createdAt), new Date())}`}
          </time>
        </div>
        ))}
        </div>
        
        <div className="input-form">
          <input
            type="text"
            name="search"
            id="search"
            onKeyUp={async (e) => {
              if (e.key === "Enter") {
                const messageText = (e.target as HTMLInputElement).value;
                if (messageText && recipientEmail) {
                  await handleSendMessage(messageText);
                  (e.target as HTMLInputElement).value = "";
                }
              }
            }}
            className="inputchat"
          />
          <div className="chat-enter">
            <kbd>Enter</kbd>
          </div>
        </div>
      </div>
    
      {showJoinButton && user.attributes.email !== recentMessageEmail && !showConfirmedConnection && (
        <div className="join-chat-button-container">
          <button type="button" onClick={handleJoinChat}>
            Join Chat
          </button>
        </div>
      )}
    </div>
    
  );
}

export default withAuthenticator(ChatMain);
