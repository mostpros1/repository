import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useEffect, useRef, useState } from "react";
import * as queries from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";
import { API, graphqlOperation } from "aws-amplify";
import { useChatBackend } from "./ChatBackend";
import "./chatbox.css";
import PaymentLink from "../PaymentLink/PaymentLink";
import { IoSend } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { Storage } from "aws-amplify";

function ChatMain({ user, signOut }) {
  // Importing and initializing hooks and state variables
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

  const [contactList, setContactList] = useState<string[]>([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [image, setImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredContactList, setFilteredContactList] = useState<string[]>([]);
  const [groupedMessages, setGroupedMessages] = useState({});

  // Function to upload an image to S3
  const uploadImageToS3 = async (file) => {
    try {
      const filename = `${Date.now()}-${file.name}`;
      await Storage.put(filename, file, {
        contentType: file.type,
      });
      return filename;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Function to handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const filename = await uploadImageToS3(file);
      const imageUrl = `https://<chatsphotos>.s3.amazonaws.com/<filename>${filename}`;
      await handleSendMessage(imageUrl);
    } catch (error) {
      // Handle error
    }
  };

  // Function to group messages by date
  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const createdAt = new Date(message.createdAt);
      const date = createdAt.toLocaleDateString("nl-NL", {
        month: "short",
        day: "2-digit",
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push({ ...message, createdAt });
      groups[date].sort((a, b) => a.createdAt - b.createdAt);
      return groups;
    }, {});
  };

  // Update grouped messages when chats change
  useEffect(() => {
    const filteredChats = chats;
    const groupedMessages = groupMessagesByDate(filteredChats);
    setGroupedMessages(groupedMessages);
  }, [chats]);

  // Filter contact list based on search term
  useEffect(() => {
    const filteredContacts = contactList.filter((contact) =>
      contact.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContactList(filteredContacts);
  }, [searchTerm, contactList]);

  // Fetch chats when user email changes
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
      //@ts-ignore
      setChats(allChats.data.listChats.items);
    }
    fetchChats();
  }, [user.attributes.email]);

  // Subscribe to new chat creation events
  useEffect(() => {
    const sub = API.graphql(
      graphqlOperation(subscriptions.onCreateChat)
      //@ts-ignore
    ).subscribe({
      next: ({ value }) => {
        handleReceivedMessage(value.data.onCreateChat);
      },
      error: (err) => console.log(err),
    });
    return () => sub.unsubscribe();
  }, [user.attributes.email]);

  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat box when chats change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chats]);

  // Extract unique contacts from chats
  useEffect(() => {
    const extractContacts = () => {
      const contacts = new Set();
      chats.forEach((chat) => {
        chat.members.forEach((member) => {
          if (member !== user.attributes.email) {
            contacts.add(member.split("@")[0]);
          }
        });
      });
      return Array.from(contacts);
    };

    const uniqueContacts = extractContacts();
    //@ts-ignore
    setContactList(uniqueContacts);
  }, [chats, user.attributes.email]);

  // Function to switch chat
  const switchChat = (contact) => {
    if (selectedContact === contact) {
      setSelectedContact(null);
    } else {
      setSelectedContact(contact);
      handleJoinChat(contact);
    }
  };

  const [isTyping, setIsTyping] = useState(false);

  // Simulate recipient typing
  useEffect(() => {
    const simulateRecipientTyping = () => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    };

    const typingTimer = setTimeout(simulateRecipientTyping, 5000);

    return () => clearTimeout(typingTimer);
  }, []);

  const email = window.location.hash.replace("/", "").split("#")[1];

  const [showPaymentLink, setShowPaymentLink] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [customSubtotal, setCustomSubtotal] = useState("");

  // Update subtotal
  const updateSubtotal = () => {
    if (!customSubtotal || isNaN(Number(customSubtotal))) {
      alert("Voer een geldig bedrag in.");
      return;
    }
    setSubtotal(Number(customSubtotal));
  };

  const handlePaySendMessage = (text) => {
    console.log(text);
  };

  // Filter chats based on selected contact
  const filteredChats = selectedContact
    ? chats.filter(
        (chat) =>
          chat.members.includes(selectedContact) ||
          chat.members.includes(user.attributes.email)
      )
    : [];

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="sidebar" id="sidebar">
        <input
          type="text"
          placeholder="Zoek gebruikers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchList"
        />
        <ul>
          {searchTerm === ""
            ? contactList.map((contact) => (
                <li
                  key={contact}
                  onClick={() => switchChat(contact)}
                  className={
                    selectedContact === contact ? "selected-contact" : ""
                  }
                >
                  {contact}
                </li>
              ))
            : filteredContactList.map((contact) => (
                <li
                  key={contact}
                  onClick={() => switchChat(contact)}
                  className={
                    selectedContact === contact ? "selected-contact" : ""
                  }
                >
                  {contact}
                </li>
              ))}
        </ul>
      </div>

      {/* Main Chat */}
      <div className="main-container">
        {selectedContact && (
          <div className="chat-main">
            {/* Chat Header */}
            <div className="chatheader">
              <div className="chat-info">
                <div className="name-and-status">
                  <h2 className="recipient-name">
                    {recipientEmail.split("@")[0]}
                  </h2>
                  {isTyping && <div id="typing-indicator">Typing...</div>}
                </div>
              </div>
            </div>

            {/* Chat Box */}
            <div className="chat-box" ref={chatBoxRef}>
              {Object.keys(groupedMessages).map((date) => (
                <React.Fragment key={date}>
                  <div className="date-separator">{date}</div>
                  {groupedMessages[date].map((chat) => (
                    <div
                      key={chat.id}
                      className={`message-container ${
                        chat.email === user.attributes.email
                          ? "self-message-container"
                          : "other-message-container"
                      }`}
                    >
                      <div
                        className={`message-bubble ${
                          chat.email === user.attributes.email
                            ? "self-message"
                            : "other-message"
                        }`}
                      >
                        <div className="username">
                          <span className="username-name">
                            {chat.email.split("@")[0]}
                          </span>
                        </div>
                        <p className="text">{chat.text}</p>
                        <time
                          dateTime={chat.createdAt}
                          className="message-time"
                        >
                          {new Intl.DateTimeFormat("nl-NL", {
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(chat.createdAt))}
                        </time>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>

            {/* Input Form */}
            <div className="input-form">
              <button
                onClick={() => setShowPaymentLink(true)}
                className="addPay"
              >
                <MdOutlinePayment size={30} />
              </button>
              {showPaymentLink && (
                <PaymentLink
                  subtotal={subtotal}
                  handleSendMessage={handlePaySendMessage}
                />
              )}
              <input
                type="number"
                value={customSubtotal}
                onChange={(e) => setCustomSubtotal(e.target.value)}
                placeholder="Subtotaal"
                className="betalingbedrag"
              />
              <IoMdPhotos size={25} className="addPhoto" />
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Stuur een bericht..."
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
                <kbd>
                  <IoSend size={25} />
                </kbd>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Join Chat Button */}
      {showJoinButton &&
        user.attributes.email !== recentMessageEmail &&
        !showConfirmedConnection && (
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
