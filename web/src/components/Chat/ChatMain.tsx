import React, { useEffect, useRef, useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import * as queries from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";
import { API, graphqlOperation } from "aws-amplify";
import axios from "axios";
import { useChatBackend } from "./ChatBackend";
import "./chatbox.css";
import PaymentLink from '../PaymentLink/PaymentLink';
import { IoSend } from "react-icons/io5";
import { BsPaperclip, BsPersonCircle, BsThreeDotsVertical } from "react-icons/bs";
import { MdDriveFileMove } from "react-icons/md";
import { stopXSS } from "../../../../backend_functions/stopXSS";
import ReactDOMServer from "react-dom/server";
import { FaReply } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import PaymentOffer from "../PaymentLink/PaymentOffer";
import OfferTemplate from "../PaymentLink/offers/offerTemplate";

interface Chat {
  id: string;
  text: string;
  createdAt: string;
  email: string;
  members: string[];
}

interface GroupedMessages {
  [key: string]: Chat[];
}

function ChatMain({ user, signOut }: { user: any; signOut: () => void }) {
  const {
    chats,
    setChats,
    handleSendMessage,
    handleReceivedMessage,
    handleJoinChat,
    handleStartNewChatWithEmail,
    visibleName,
    setVisibleName,
    textSize,
    setTextSize
  } = useChatBackend(user, signOut);

  const [contactList, setContactList] = useState<string[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredContactList, setFilteredContactList] = useState<string[]>([]);
  const [groupedMessages, setGroupedMessages] = useState<GroupedMessages>({});
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [recipientUUID, setRecipientUUID] = useState<string>("");
  const [isDropUpOpen, setIsDropUpOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropUpRef = useRef<HTMLDivElement>(null);
  const uuidEmailMap = useRef<{ [uuid: string]: string }>({});

  const [lastMessages, setLastMessages] = useState<{
    [contact: string]: { text: string; createdAt: string };
  }>({});
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatEmail, setNewChatEmail] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // New states for extra functionalities
  const [replyingTo, setReplyingTo] = useState<Chat | null>(null);
  const [markedMessages, setMarkedMessages] = useState<Set<string>>(new Set());

  // New states for settings modal
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const handleTypingIndicator = (isTyping: boolean) => {
    setIsTyping(isTyping);
    // Emit typing indicator event to backend (e.g., WebSocket, API)
  };

  useEffect(() => {
    const handleNewMessageNotification = (message: Chat) => {
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
      next: ({ value }: { value: { data: { onCreateChat: Chat } } }) => {
        handleReceivedMessage(value.data.onCreateChat);
        handleNewMessageNotification(value.data.onCreateChat);
      },
      error: (err: any) => console.log(err),
    });

    return () => sub.unsubscribe();
  }, [user.attributes.email]);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    const updatedLastMessages: {
      [contact: string]: { text: string; createdAt: string };
    } = {};
    chats.forEach((chat) => {
      const contact = chat.members.find(
        (member) => member !== user.attributes.email
      );
      if (contact) {
        if (
          !updatedLastMessages[contact] ||
          new Date(updatedLastMessages[contact].createdAt) <
          new Date(chat.createdAt)
        ) {
          updatedLastMessages[contact] = {
            text: chat.text,
            createdAt: chat.createdAt,
          };
        }
      }
    });
    setLastMessages(updatedLastMessages);
  }, [chats, user.attributes.email]);

  const groupMessagesByDate = (messages: Chat[]): GroupedMessages => {
    const groupedMessages: GroupedMessages = {};

    messages.forEach((message) => {
      const createdAt = new Date(message.createdAt);
      const dateKey = createdAt.toISOString().split("T")[0];

      if (!groupedMessages[dateKey]) {
        groupedMessages[dateKey] = [];
      }

      groupedMessages[dateKey].push(message);
    });

    const sortedDates = Object.keys(groupedMessages).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    const sortedGroupedMessages: GroupedMessages = {};

    sortedDates.forEach((date) => {
      groupedMessages[date].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      sortedGroupedMessages[date] = groupedMessages[date];
    });

    return sortedGroupedMessages;
  };

  useEffect(() => {
    if (selectedContact) {
      const filteredChats = chats.filter(
        (chat) =>
          chat.members.includes(selectedContact) &&
          chat.members.includes(user.attributes.email)
      );
      const groupedMessages = groupMessagesByDate(filteredChats);
      setGroupedMessages(groupedMessages);
    }
  }, [chats, selectedContact, user.attributes.email]);

  useEffect(() => {
    async function fetchChats() {
      const allChats: any = await API.graphql({
        query: queries.listChats,
        variables: {
          filter: {
            members: { contains: user.attributes.email },
          },
        },
      });
      setChats(allChats.data.listChats.items);
    }
    fetchChats();
  }, [user.attributes.email]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const recipientUUID = searchParams.get("recipient");
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
      chats.forEach((chat) => {
        chat.members.forEach((member) => {
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

  const switchChat = (contact: string) => {
    const uuid = getUUIDFromEmail(contact);
    setSelectedContact(contact);
    const url = `/nl/homeowner-dashboard/chat?recipient=${uuid}`;
    window.history.pushState({}, "", url);
    setRecipientEmail(contact);
    handleJoinChat(contact);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const recipientUUID = searchParams.get("recipient");
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    const reader = new FileReader();

    reader.onload = async () => {
      if (reader.result) {
        const base64Data = (reader.result as string).split(',')[1];
        try {
          const response = await axios.post(
            'https://7smo3vt5aisw4kvtr5dw3yyttq0bezsf.lambda-url.eu-north-1.on.aws/',
            { photo: base64Data },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          console.log(response.data);
        } catch (error) {
          console.error('Error uploading photo:', error);
        }
      } else {
        console.error('FileReader result is null');
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };

    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("photo", selectedFile); // Ensure the server expects the file under this key
      console.log(formData);
      // Remove manual Content-Type header setting
      const response = await axios.post(
        "https://7smo3vt5aisw4kvtr5dw3yyttq0bezsf.lambda-url.eu-north-1.on.aws/",
        formData
      );

      console.log(response.data);
      setUploadedPhotoUrl(response.data.url); // Assuming the response contains a URL property

      await handleSendMessage(`<img src="${response.data.url}" alt="Uploaded Image" style="max-width: 100%;" />`);
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Er is een fout opgetreden bij het uploaden van de foto. Probeer het opnieuw.");
    }
  };

  const handleDropUpClick = () => {
    setIsDropUpOpen(!isDropUpOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropUpRef.current && !dropUpRef.current.contains(event.target as Node)) {
      setIsDropUpOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return { text: "Today", className: "date-today" };
    } else if (date.toDateString() === yesterday.toDateString()) {
      return { text: "Yesterday", className: "date-yesterday" };
    } else {
      return {
        text: new Intl.DateTimeFormat("nl-NL", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(date),
        className: "date-other",
      };
    }
  };

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

  const formatCurrencyInput = (value: string) => {
    value = value.replace(/[^\d,.]/g, "");
    value = value.replace(/\./g, ",");
    const parts = value.split(",");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (parts[1]) {
      parts[1] = parts[1].slice(0, 2);
    }

    return parts.join(",");
  };

  const sortedContacts = contactList.sort((a, b) => {
    const dateA = lastMessages[a]
      ? new Date(lastMessages[a].createdAt).getTime()
      : 0;
    const dateB = lastMessages[b]
      ? new Date(lastMessages[b].createdAt).getTime()
      : 0;
    return dateB - dateA;
  });

  const parseLinks = (text: string) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(linkRegex);
    const jsxElements = parts.flatMap((part, index) => {
      if (index % 2 !== 0) {
        return (
          <a href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      } else {
        return part;
      }
    });

    const htmlString = ReactDOMServer.renderToStaticMarkup(
      <>{jsxElements}</>
    );
    return htmlString;
  };


  const handleSendMessageClick = async () => {
    const messageInput = document.getElementById("message-input") as HTMLInputElement;
    if (messageInput) {
      const messageText = messageInput.value;
      if (messageText && recipientEmail) {
        if (replyingTo) {
          await handleSendMessage(
            stopXSS(
              `Re: ${replyingTo.text} | U: ${messageText}`
            )
          );
          setReplyingTo(null);
        } else {
          await handleSendMessage(stopXSS(messageText));
        }
        messageInput.value = "";
        handleTypingIndicator(false);
      }
    }
  };

  const handleInputChange = () => {
    handleTypingIndicator(true);
    setTimeout(() => handleTypingIndicator(false), 1000);
  };

  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleStartNewChatClick = () => {
    setShowNewChatModal(true);
  };

  const handleNewChatConfirm = async () => {
    console.log("Starting new chat with email:", newChatEmail);
    await handleStartNewChatWithEmail(newChatEmail);
    setShowNewChatModal(false);
  };

  const handleMarkMessage = (messageId: string) => {
    setMarkedMessages((prev) => {
      const newMarkedMessages = new Set(prev);
      if (newMarkedMessages.has(messageId)) {
        newMarkedMessages.delete(messageId);
      } else {
        newMarkedMessages.add(messageId);
      }
      return newMarkedMessages;
    });
  };

  const handleReplyMessage = (message: Chat) => {
    setReplyingTo(message);
  };

  const handleTextSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextSize(Number(event.target.value));
  };

  const handleVisibleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibleName(event.target.value);
  };

  const handleSaveSettings = () => {
    setShowSettingsModal(false);
  };

  return (
    <div className="chat-container" style={{ fontSize: `${textSize}px` }}>
      <div className="sidebar" id="sidebar">
        <div className="dropdown-container">
          <BsThreeDotsVertical size={50} className="menu-icon" onClick={toggleMenu} />
          {open && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={handleStartNewChatClick}>
                Nieuwe chat starten
              </div>
              <div className="dropdown-item">
                Opgeslagen berichten
              </div>
              <div className="dropdown-item" onClick={() => setShowSettingsModal(true)}>
                Instellingen
              </div>
            </div>
          )}
        </div>
        <ul>
          {searchTerm === ""
            ? sortedContacts.map((contact) => (
              <li
                key={contact}
                onClick={() => switchChat(contact)}
                className={selectedContact === contact ? "selected-contact" : ""}
              >
                <BsPersonCircle size={50} className="avatar-chat-side" />
                <div className="contact-details">
                  <div className="contact-name">
                    <span>{contact.split("@")[0]}</span>
                  </div>
                  {lastMessages[contact] && (
                    <span className="last-message">
                      {lastMessages[contact].text}
                    </span>
                  )}
                  {lastMessages[contact] && (
                    <span className="last-message-time">
                      {formatDate(lastMessages[contact].createdAt).text}
                    </span>
                  )}
                </div>
              </li>
            ))
            : filteredContactList.map((contact) => (
              <li
                key={contact}
                onClick={() => switchChat(contact)}
                className={selectedContact === contact ? "selected-contact" : ""}
              >
                <BsPersonCircle size={50} className="avatar-chat-side" />
                <div className="contact-details">
                  <div className="contact-name">
                    <span>{contact.split("@")[0]}</span>
                  </div>
                  {lastMessages[contact] && (
                    <span className="last-message">
                      {lastMessages[contact].text}
                    </span>
                  )}
                  {lastMessages[contact] && (
                    <span className="last-message-time">
                      {formatDate(lastMessages[contact].createdAt).text}
                    </span>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="main-container">
        <div className="chat-main">
          <div className="chatheader">
            <div className="chat-info">
              <BsPersonCircle size={50} className="avatar-chat" />
              <div className="name-and-status">
                <h2 className="recipient-name">
                  {selectedContact ? selectedContact.split("@")[0] : ""}
                </h2>
                {isTyping && <div className="typing-indicator">Typing...</div>}
              </div>
            </div>
          </div>
          <div className="chat-box" ref={chatBoxRef}>
            {Object.keys(groupedMessages).map((date) => {
              const { text, className } = formatDate(date);
              return (
                <React.Fragment key={date}>
                  <div className={`date-separator ${className}`}>{text}</div>

                  {groupedMessages[date].map((chat) => (
                    <div
                      key={chat.id}
                      className={`message-container ${chat.email === user.attributes.email
                          ? "self-message-container"
                          : "other-message-container"
                        } ${markedMessages.has(chat.id) ? "marked-message" : ""}`}
                    >
                      <div
                        className={`message-bubble ${chat.email === user.attributes.email
                            ? "self-message"
                            : "other-message"
                          }`}
                      >
                        <div
                          className="text"
                          dangerouslySetInnerHTML={{ __html: chat.text }}
                        />
                        <time dateTime={chat.createdAt} className="message-time">
                          {new Intl.DateTimeFormat("nl-NL", {
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(chat.createdAt))}
                        </time>
                        <div className="message-actions">
                          <button onClick={() => handleReplyMessage(chat)}><FaReply /></button>
                          <button onClick={() => handleMarkMessage(chat.id)}>
                            {markedMessages.has(chat.id) ? <FaBookmark /> : <FaRegBookmark />}
                          </button>
                          {/* <button onClick={() => handleDeleteMessage(chat.id)}>Delete</button> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              );
            })}
          </div>

          {replyingTo && (
            <div className="replying-to">
              Replying to: <blockquote>{replyingTo.text}</blockquote>
              <button onClick={() => setReplyingTo(null)}>Cancel</button>
            </div>
          )}
          <div className="input-form">
            <input
              type="text"
              id="message-input"
              name="search"
              placeholder="Stuur een bericht..."
              onKeyUp={async (e) => {
                if (e.key === "Enter") {
                  await handleSendMessageClick();
                }
              }}
              className="inputchat"
              onChange={handleInputChange}
            />
            <div className="dropup" onClick={handleDropUpClick} ref={dropUpRef}>
              <BsPaperclip className="paperclip" size={25} />
              <div
                className={`dropup-content ${isDropUpOpen ? "show" : ""}`}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="dropup-option"
                  onClick={() => inputRef.current?.click()}
                >
                  <MdDriveFileMove size={25} color="blue" />
                </button>
                <input
                  type="file"
                  ref={inputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <button
                  className="dropup-option"
                  onClick={handleUpload}
                  disabled={!selectedFile}
                >
                  Upload
                </button>
                {uploadedPhotoUrl && (
                  <div>
                    <img
                      src={uploadedPhotoUrl}
                      alt="Uploaded"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                )}
                <div className="amount-input-wrapper">
                  <input
                    type="text"
                    placeholder="Voer bedrag in"
                    value={customAmount}
                    onChange={(e) =>
                      setCustomAmount(formatCurrencyInput(e.target.value))
                    }
                    className="amount-input"
                  />
                </div>
                <PaymentLink
                  handleSendMessage={handleSendMessage}
                  subtotal={parseFloat(customAmount.replace(",", "."))}
                />
                <PaymentOffer
                  subtotal={parseFloat(customAmount.replace(',', '.'))}
                  handleSendMessage={handleSendMessage}
                  recipientEmail={recipientEmail}
                />
              </div>
            </div>
            <div className="chat-enter" onClick={handleSendMessageClick}>
              <kbd>
                <IoSend size={25} />
              </kbd>
            </div>
          </div>
        </div>
      </div>
      {showNewChatModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Start Nieuwe Chat</h2>
            <input
              type="email"
              placeholder="Voer e-mailadres in"
              value={newChatEmail}
              onChange={(e) => setNewChatEmail(e.target.value)}
            />
            <button onClick={handleNewChatConfirm} className="button-modal">Bevestigen</button>
            <button onClick={() => setShowNewChatModal(false)} className="button-modal">Annuleren</button>
          </div>
        </div>
      )}
      {showSettingsModal && (
        <div className="settings-modal-overlay">
          <div className="settings-modal-content">
            <h2>Instellingen</h2>
            <div className="settings-item">
              <label htmlFor="text-size">Tekstgrootte:</label>
              <input
                type="range"
                id="text-size"
                min="12"
                max="24"
                value={textSize}
                onChange={handleTextSizeChange}
              />
              <span>{textSize}px</span>
            </div>
            <div className="settings-item">
              <label htmlFor="visible-name">Zichtbare naam:</label>
              <input
                type="text"
                id="visible-name"
                value={visibleName}
                onChange={handleVisibleNameChange}
              />
            </div>
            <button onClick={handleSaveSettings} className="button-modal">Opslaan</button>
            <button onClick={() => setShowSettingsModal(false)} className="button-modal">Annuleren</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuthenticator(ChatMain);
