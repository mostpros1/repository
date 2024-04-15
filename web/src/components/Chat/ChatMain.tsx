import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useEffect, useRef, useState } from "react";
import * as mutations from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import {intlFormatDistance} from "date-fns/intlFormatDistance";
import * as subscriptions from "../../graphql/subscriptions";
import { useChatBackend } from "./ChatBackend";
import "./chatbox.css";

function ChatMain({ user, signOut }) {
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

  const [contactList, setContactList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [image, setImage] = useState(null); // Nieuwe staat voor de afbeelding

  // Functie om afbeelding te verzenden
  const handleSendImage = async () => {
    if (!image) return; // Afbeelding controleren
    try {
      // Verstuur de afbeelding naar de backend
      await handleSendMessage(image); // Verstuur de afbeelding met de bestaande handleSendMessage-functie
      setImage(null); // Wis de afbeelding nadat deze is verzonden
    } catch (error) {
      console.error("Error sending image:", error);
    }
  };

  // Functie om afbeeldingsbestand te verwerken wanneer deze wordt geüpload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

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
    const sub = API.graphql(
      graphqlOperation(subscriptions.onCreateChat)
      // @ts-ignore
    ).subscribe({
      next: ({ value }) => {
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

  useEffect(() => {
    const extractContacts = () => {
      const contacts = new Set();
      chats.forEach(chat => {
        chat.members.forEach(member => {
          if (member !== user.attributes.email) {
            contacts.add(member);
          }
        });
      });
      return Array.from(contacts);
    };

    const uniqueContacts = extractContacts();
    // @ts-ignore
    setContactList(uniqueContacts);
  }, [chats, user.attributes.email]);
  
  const switchChat = (contact) => {
    setSelectedContact(contact);
    handleJoinChat(contact);
    
  };

  useEffect(() => {
    const Email = window.location.hash.replace("#", "");
    switchChat(Email);
   }, []);

  const filteredChats = selectedContact
    ? chats.filter(chat => chat.members.includes(selectedContact) || chat.members.includes(user.attributes.email))
    : chats;

  return (
    <div className="chat-container">
      <div className="sidebar" id="sidebar">
        <ul>
          {contactList.map(contact => (
            <li key={contact} onClick={() => switchChat(contact)}>
              {contact}
            </li>
          ))}
        </ul>
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
          {filteredChats
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
                  {new Intl.DateTimeFormat('nl-NL', {
                    hour: '2-digit',
                    minute: '2-digit',
                  }).format(new Date(chat.createdAt))}
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
