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
import axios from 'axios';
import { BsPaperclip } from "react-icons/bs";
import JanSchilder from "../../assets/JanSchilder.jpg";
import { BorderAllRounded } from "@mui/icons-material";
import { MdDriveFileMove } from "react-icons/md";
import { BsCreditCard } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";

function ChatMain({ user, signOut }) {
  const {
    chats,
    setChats,
    recentMessageEmail,
    showJoinButton,
    setShowJoinButton,
    showConfirmedConnection,
    showAlert,
    notificationMessage,
    handleStartNewChat,
    handleSendMessage,
    handleAlertConfirm,
    handleAlertCancel,
    handleJoinChat,
    handleReceivedMessage,
  } = useChatBackend(user, signOut);

  const [contactList, setContactList] = useState<string[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredContactList, setFilteredContactList] = useState<string[]>([]);
  const [groupedMessages, setGroupedMessages] = useState({});
  const [recipientEmail, setRecipientEmail] = useState("");
  const [isDropUpOpen, setIsDropUpOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>(''); // Voeg customAmount hier toe
  const inputRef = useRef<HTMLInputElement>(null);
  const dropUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleNewMessageNotification = (message) => {
      if (message.email !== user.attributes.email) {
        if (Notification.permission === "granted") {
          new Notification("Nieuw bericht ontvangen", {
            body: `Je hebt een nieuw bericht ontvangen van ${message.email.split("@")[0]}`,
          });
        }
      }
    };

    const sub = API.graphql(
      graphqlOperation(subscriptions.onCreateChat)
      //@ts-ignore
    ).subscribe({
      next: ({ value }) => {
        handleReceivedMessage(value.data.onCreateChat);
        handleNewMessageNotification(value.data.onCreateChat);
      },
      error: (err) => console.log(err),
    });

    return () => sub.unsubscribe();
  }, [user.attributes.email]);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  const [lastMessages, setLastMessages] = useState({});

  useEffect(() => {
    const updatedLastMessages = {};
    chats.forEach(chat => {
      const contact = chat.members.find(member => member !== user.attributes.email);
      if (contact) {
        if (!updatedLastMessages[contact] || new Date(updatedLastMessages[contact].createdAt) < new Date(chat.createdAt)) {
          updatedLastMessages[contact] = {
            text: chat.text,
            createdAt: chat.createdAt
          };
        }
      }
    });
    setLastMessages(updatedLastMessages);
  }, [chats, user.attributes.email]);

  const groupMessagesByDate = (messages) => {
    const groupedMessages: { [key: string]: any[] } = {};

    messages.forEach((message) => {
      const createdAt = new Date(message.createdAt);
      const dateKey = createdAt.toISOString().split('T')[0]; // Use ISO date format for consistent sorting

      if (!groupedMessages[dateKey]) {
        groupedMessages[dateKey] = [];
      }

      groupedMessages[dateKey].push(message);
    });

    const sortedDates = Object.keys(groupedMessages).sort((a, b) => new Date(a).getTime() - new Date(b).getTime()); // Sort dates

    const sortedGroupedMessages: { [key: string]: any[] } = {};

    sortedDates.forEach(date => {
      groupedMessages[date].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // Sort messages within the same day
      sortedGroupedMessages[date] = groupedMessages[date];
    });

    return sortedGroupedMessages;
  };

  useEffect(() => {
    const filteredChats = selectedContact
      ? chats.filter(chat => chat.members.includes(selectedContact) && chat.members.includes(user.attributes.email))
      : [];
    const groupedMessages = groupMessagesByDate(filteredChats);
    setGroupedMessages(groupedMessages);
  }, [chats, selectedContact, user.attributes.email]);

  useEffect(() => {
    if (selectedContact) {
      const filteredChats = chats.filter(chat => chat.members.includes(selectedContact) && chat.members.includes(user.attributes.email));
      const groupedMessages = groupMessagesByDate(filteredChats);
      setGroupedMessages(groupedMessages);
    }
  }, [selectedContact]);

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
    const searchParams = new URLSearchParams(window.location.search);
    const recipient = searchParams.get('recipient');
    if (recipient) {
      setRecipientEmail(recipient);
      setSelectedContact(recipient);
    }
  }, []);

  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current && chats.length > 0) {
      setTimeout(() => {
        if (chatBoxRef.current) {
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
      }, 0);
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
    //@ts-ignore
    setContactList(uniqueContacts);
  }, [chats, user.attributes.email]);

  const switchChat = (contact) => {
    if (selectedContact === contact) {
      setSelectedContact(null);
      setGroupedMessages({});
    } else {
      setSelectedContact(contact);
      const members = [user.attributes.email, contact].sort().join("#");
      const existingChat = chats.find(chat => chat.sortKey === members);
      if (existingChat) {
        setChats([existingChat]);
      } else {
        setChats([]);
      }
      const url = `/nl/homeowner-dashboard/chat?recipient=${contact}`;
      window.location.href = url;
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const recipient = searchParams.get('recipient');
    if (recipient) {
      setRecipientEmail(recipient);
      setSelectedContact(recipient);
    }
  }, []);

  useEffect(() => {
    if (recipientEmail) {
      handleJoinChat(recipientEmail);
    }
  }, [recipientEmail]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('photo', selectedFile);

      const response = await axios.post('https://7smo3vt5aisw4kvtr5dw3yyttq0bezsf.lambda-url.eu-north-1.on.aws/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      setUploadedPhotoUrl(response.data);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Er is een fout opgetreden bij het uploaden van de foto. Probeer het opnieuw.');
    }
  };

  const handleDropUpClick = () => {
    setIsDropUpOpen(!isDropUpOpen);
  };

  const handleClickOutside = (event) => {
    if (dropUpRef.current && !dropUpRef.current.contains(event.target)) {
      setIsDropUpOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "yesterday";
    } else {
      return new Intl.DateTimeFormat('nl-NL', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    }
  };

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
                {contact.split("@")[0]}
                {lastMessages[contact] && (
                  <span className="last-message">
                    {lastMessages[contact].text}
                  </span>
                )}
              </li>
            ))
            : filteredContactList.map((contact) => (
              <li
                key={contact}
                onClick={() => switchChat(contact)}
                className={selectedContact === contact ? 'selected-contact' : ''}
              >
                {contact.split("@")[0]}
                {lastMessages[contact] && (
                  <span className="last-message">
                    {lastMessages[contact].text}
                  </span>
                )}
              </li>
            ))}
        </ul>
      </div>
      <div className="main-container">
        <div className="chat-main">
          <div className="chatheader">
            <div className="chat-info">
              <img src={JanSchilder} className="profile-ava" />
              <div className="name-and-status">
                <h2 className="recipient-name">{recipientEmail.split("@")[0]}</h2>
                {/* <h5 className="last-seen">Last seen: </h5> */}
              </div>
            </div>
          </div>
          <div className="chat-box" ref={chatBoxRef}>
            {Object.keys(groupedMessages).map((date) => (
              <React.Fragment key={date}>
                <div className="date-separator">{formatDate(date)}</div>

                {groupedMessages[date].map((chat) => (
                  <div
                    key={chat.id}
                    className={`message-container ${chat.email === user.attributes.email ? "self-message-container" : "other-message-container"}`}
                  >
                    <div className={`message-bubble ${chat.email === user.attributes.email ? "self-message" : "other-message"}`}>
                      <div className="username">
                        <span className="username-name">{chat.email.split("@")[0]}</span>
                      </div>
                      <p className="text">{chat.text}</p>
                      {/* <IoCheckmarkDone size={13} className="checkmarks" /> */}
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
            <div className="dropup" onClick={handleDropUpClick} ref={dropUpRef}>
              <BsPaperclip className="paperclip" size={25} />
              <div className={`dropup-content ${isDropUpOpen ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
                <button className="dropup-option" onClick={() => inputRef.current?.click()}><MdDriveFileMove size={25} color="blue" /></button>
                {uploadedPhotoUrl && (
                  <div>
                    <img src={uploadedPhotoUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
                  </div>
                )}
                <input 
                  type="number" 
                  placeholder="Voer bedrag in" 
                  value={customAmount} 
                  onChange={(e) => setCustomAmount(e.target.value)} 
                />
                <PaymentLink handleSendMessage={handleSendMessage} subtotal={parseFloat(customAmount)} />
              </div>
            </div>

            <div className="chat-enter">
              <kbd><IoSend size={25} /></kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuthenticator(ChatMain);
