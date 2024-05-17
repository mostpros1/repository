import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useEffect, useRef, useState, useContext } from "react";
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
import { MdDriveFileMove } from "react-icons/md";
import { BsCreditCard } from "react-icons/bs";
import { stopXSS } from "../../../../backend_functions/stopXSS";
import ReactDOMServer from 'react-dom/server';
import PaymentOffer from "../PaymentLink/PaymentOffer";

function ChatMain({ user, signOut }) {
  const {
    chats,
    setChats,
    handleSendMessage,
    handleReceivedMessage,
    handleJoinChat,
  } = useChatBackend(user, signOut);

  const [contactList, setContactList] = useState<string[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredContactList, setFilteredContactList] = useState<string[]>([]);
  const [groupedMessages, setGroupedMessages] = useState({});
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientUUID, setRecipientUUID] = useState("");
  const [isDropUpOpen, setIsDropUpOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dropUpRef = useRef<HTMLDivElement>(null);

  const uuidEmailMap = useRef<{ [uuid: string]: string }>({});

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

  const [lastMessages, setLastMessages] = useState<{ [contact: string]: { text: string; createdAt: string } }>({});

  useEffect(() => {
    const updatedLastMessages: { [contact: string]: { text: string; createdAt: string } } = {};
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
    if (selectedContact) {
      const filteredChats = chats.filter(chat => chat.members.includes(selectedContact) && chat.members.includes(user.attributes.email));
      const groupedMessages = groupMessagesByDate(filteredChats);
      setGroupedMessages(groupedMessages);
    }
  }, [chats, selectedContact, user.attributes.email]);

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
    const recipientUUID = searchParams.get('recipient');
    if (recipientUUID) {
      setRecipientUUID(recipientUUID);
      const email = uuidEmailMap.current[recipientUUID];
      if (email) {
        setRecipientEmail(email);
        setSelectedContact(email);
      }
    }
  }, []);

  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current && Object.keys(groupedMessages).length > 0) {
      setTimeout(() => {
        if (chatBoxRef.current) {
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
      }, 0);
    }
  }, [groupedMessages]);

  useEffect(() => {
    const extractContacts = (): string[] => {
      const contacts = new Set<string>();
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
    setContactList(uniqueContacts);
  }, [chats, user.attributes.email]);

  const switchChat = (contact) => {
    const uuid = getUUIDFromEmail(contact);
    setSelectedContact(contact);
    const url = `/nl/homeowner-dashboard/chat?recipient=${uuid}`;
    window.history.pushState({}, '', url);
    setRecipientEmail(contact);
    handleJoinChat(contact);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const recipientUUID = searchParams.get('recipient');
    if (recipientUUID) {
      setRecipientUUID(recipientUUID);
      const email = uuidEmailMap.current[recipientUUID];
      if (email) {
        setRecipientEmail(email);
        setSelectedContact(email);
      }
    }
  }, []);

  useEffect(() => {
    if (recipientEmail) {
      handleJoinChat(recipientEmail);
    }
  }, [recipientEmail]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);

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

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

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

  const formatCurrencyInput = (value) => {
    // Replace any non-digit characters except for commas and periods
    value = value.replace(/[^\d,.]/g, '');

    // Replace periods with commas
    value = value.replace(/\./g, ',');

    // Split value into euros and cents
    const parts = value.split(',');

    // Ensure euros are separated by commas if longer than 3 digits
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Ensure only two decimal places for cents
    if (parts[1]) {
      parts[1] = parts[1].slice(0, 2);
    }

    return parts.join(',');
  };

  // Sort contacts by the last message date
  const sortedContacts = contactList.sort((a, b) => {
    const dateA = lastMessages[a] ? new Date(lastMessages[a].createdAt).getTime() : 0;
    const dateB = lastMessages[b] ? new Date(lastMessages[b].createdAt).getTime() : 0;
    return dateB - dateA;
  });

  const parseLinks = (text: string) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(linkRegex);
    const jsxElements = parts.flatMap((part, index) => {
      if (index % 2 !== 0) {
        // This is a URL part, wrap it in an <a> tag
        return <a href={part} target="_blank" rel="noopener noreferrer">{part}</a>;
      } else {
        // This is a text part, return it as is
        return part;
      }
    });

    // Convert JSX elements to an HTML string
    const htmlString = ReactDOMServer.renderToStaticMarkup(<>{jsxElements}</>);
    return htmlString;
  };


  const handleAcceptOffer = () => {
    console.log('Offer accepted!');
    // Implement your logic here
  };

  const handleDeclineOffer = () => {
    console.log('Offer declined!');
    // Implement your logic here
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
            ? sortedContacts.map((contact) => (
              <li
                key={contact}
                onClick={() => switchChat(contact)}
                className={selectedContact === contact ? 'selected-contact' : ''}
              >
                <div className="contact-name">
                  <span>{contact.split("@")[0]}</span>
                  {lastMessages[contact] && (
                    <span className="last-message-time">
                      {new Intl.DateTimeFormat('nl-NL', {
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(new Date(lastMessages[contact].createdAt))}
                    </span>
                  )}
                </div>
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
                <div className="contact-name">
                  <span>{contact.split("@")[0]}</span>
                  {lastMessages[contact] && (
                    <span className="last-message-time">
                      {new Intl.DateTimeFormat('nl-NL', {
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(new Date(lastMessages[contact].createdAt))}
                    </span>
                  )}
                </div>
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
                <h2 className="recipient-name">{selectedContact ? selectedContact.split("@")[0] : ''}</h2>
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
                      <div className="text" dangerouslySetInnerHTML={{ __html: chat.text }} />
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
                    await handleSendMessage(stopXSS(messageText));
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
                <div className="amount-input-wrapper">
                  <input
                    type="text"
                    placeholder="Voer bedrag in"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(formatCurrencyInput(e.target.value))}
                    className="amount-input"
                  />
                </div>
                <PaymentLink handleSendMessage={handleSendMessage} subtotal={parseFloat(customAmount.replace(',', '.'))} />
                <PaymentOffer
                  subtotal={parseFloat(customAmount.replace(',', '.'))}
                  handleAcceptOffer={handleAcceptOffer}
                  handleDeclineOffer={handleDeclineOffer} 
                  handleSendMessage={handleSendMessage}
                  />
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
