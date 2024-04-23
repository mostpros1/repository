import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useEffect, useRef, useState } from "react";
import * as queries from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";
import { API, graphqlOperation } from "aws-amplify";
import { useChatBackend } from "./ChatBackend";
import "./chatbox.css";
import PaymentLink from '../PaymentLink/PaymentLink';
import { IoSend } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";

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

  const [contactList, setContactList] = useState<string[]>([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredContactList, setFilteredContactList] = useState<string[]>([]);
  const [groupedMessages, setGroupedMessages] = useState({});

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const createdAt = new Date(message.createdAt);
      const date = createdAt.toLocaleDateString('nl-NL', {
        month: 'short',
        day: '2-digit',
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push({ ...message, createdAt });
      groups[date].sort((a, b) => a.createdAt - b.createdAt);
      return groups;
    }, {});
  };
  
  useEffect(() => {
    const filteredChats = chats;
    const groupedMessages = groupMessagesByDate(filteredChats);
    setGroupedMessages(groupedMessages);
  }, [chats]);

  useEffect(() => {
    const filteredContacts = contactList.filter((contact) =>
      contact.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContactList(filteredContacts);
  }, [searchTerm, contactList]);

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
  
  const switchChat = (contact) => {
    if (selectedContact === contact) {
      setSelectedContact(null);
    } else {
      setSelectedContact(contact);
      handleJoinChat(contact);
    }
  };

  const [showPaymentLink, setShowPaymentLink] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [customSubtotal, setCustomSubtotal] = useState('');

  const updateSubtotal = () => {
    if (!customSubtotal || isNaN(Number(customSubtotal))) {
      alert('Voer een geldig bedrag in.');
      return;
    }
    setSubtotal(Number(customSubtotal));
  };
  
  const handlePaySendMessage = (text) => {
      console.log(text);
  };

  const filteredChats = selectedContact
  ? chats.filter(chat => chat.members.includes(selectedContact) || chat.members.includes(user.attributes.email))
  : []; 

  return (
    <div className="chat-container">
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
                className={selectedContact === contact ? 'selected-contact' : ''}
              >
                {contact}
              </li>
            ))
          : filteredContactList.map((contact) => (
              <li
                key={contact}
                onClick={() => switchChat(contact)}
                className={selectedContact === contact ? 'selected-contact' : ''}
              >
                {contact}
              </li>
            ))}
      </ul>
    </div>

    <div className="button-container">
      <button
        type="button"
        className="buttona"
        onClick={handleStartNewChat}
        >
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
      <div className="main-container">
      {selectedContact && (
        <div className="chat-main">
        <div className="chatheader">
          <div className="chat-info">
            <div className="name-and-status">
              <h2 className="recipient-name">{recipientEmail.split("@")[0]}</h2>
            </div>
          </div>
        </div>

        <div className="chat-box" ref={chatBoxRef}>
              {Object.keys(groupedMessages).map((date) => (
                <React.Fragment key={date}>
                  <div className="date-separator">{date}</div>

                  {groupedMessages[date].map((chat) => (
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
                        <time dateTime={chat.createdAt} className="message-time">
                          {new Intl.DateTimeFormat('nl-NL', {
                            hour: '2-digit',
                            minute: '2-digit',
                          }).format(new Date(chat.createdAt))}
                        </time>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>

        <div className="input-form">
          <button onClick={() => setShowPaymentLink(true)} className='addPay'><MdOutlinePayment size={30} /></button>
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
          <IoMdPhotos size={25} className="addPhoto"/>
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
            <kbd><IoSend size={25} /></kbd>
          </div>
        </div>
      </div>
      )}</div>

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