import React, { useEffect, useRef, useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import * as queries from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";
import * as mutations from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import axios from "axios";
import { useChatBackend } from "./ChatBackend";
import "./chatbox.css";
import PaymentLink from "../PaymentLink/PaymentLink";
import { IoSend } from "react-icons/io5";
import { FaLocationCrosshairs } from "react-icons/fa6";
import {
  BsPaperclip,
  BsPersonCircle,
  BsThreeDotsVertical,
  BsSun,
  BsMoon,
  BsBell,
  BsBellSlash,
  BsCreditCard,
  BsPin,
  BsPinFill,
  BsStar,
  BsStarFill,
} from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { MdDriveFileMove } from "react-icons/md";
import { IoCheckmarkDone, IoCheckmark } from "react-icons/io5";
import { MdOutlineCancel, MdDeleteOutline } from "react-icons/md";
import { stopXSS } from "../../../../backend_functions/stopXSS";
import ReactDOMServer from "react-dom/server";
import { FaReply, FaRegBookmark, FaBookmark } from "react-icons/fa";
import PaymentOffer from "../PaymentLink/PaymentOffer";
import { MdOutlineEdit } from "react-icons/md";
import { getInfo } from "../../../../backend_functions/coordsToKm.ts";
import { dynamo } from "../../../declarations.ts";

interface Chat {
  id: string;
  text: string;
  createdAt: string;
  email: string;
  members: string[];
  read: boolean;
  delivered: boolean;
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
    textSize,
    setTextSize,
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
  const [replyingTo, setReplyingTo] = useState<Chat | null>(null);
  const [markedMessages, setMarkedMessages] = useState<Set<string>>(new Set());
  const [pinnedMessages, setPinnedMessages] = useState<Set<string>>(new Set());
  const [favoriteMessages, setFavoriteMessages] = useState<Set<string>>(
    new Set()
  );
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [theme, setTheme] = useState("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showSavedMessagesModal, setShowSavedMessagesModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [newMessagesCount, setNewMessagesCount] = useState<{
    [contact: string]: number;
  }>({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [messageSearchTerm, setMessageSearchTerm] = useState<string>("");
  const [filteredMessages, setFilteredMessages] = useState<Chat[]>([]);
  const settingsModalRef = useRef<HTMLDivElement>(null);

  // New states for additional functionalities
  const [blockedUsers, setBlockedUsers] = useState<Set<string>>(new Set());
  const [typingStatus, setTypingStatus] = useState<{
    [contact: string]: boolean;
  }>({});

  useEffect(() => {
    const handleNewMessageNotification = (message: Chat) => {
      if (message.members.includes(user.attributes.email)) {
        if (Notification.permission === "granted" && notificationsEnabled) {
          new Notification("Nieuw bericht ontvangen", {
            body: `Je hebt een nieuw bericht ontvangen van ${
              message.email.split("@")[0]
            }`,
          });
        }
        const contact = message.members.find(
          (member) => member !== user.attributes.email
        );
        if (contact) {
          setNewMessagesCount((prevCount) => ({
            ...prevCount,
            [contact]: (prevCount[contact] || 0) + 1,
          }));
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
  }, [user.attributes.email, notificationsEnabled]);

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
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
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
      setNewMessagesCount((prevCount) => ({
        ...prevCount,
        [selectedContact]: 0,
      }));
    }
  }, [chats, selectedContact, user.attributes.email]);

  useEffect(() => {
    let isMounted = true; // To track if the component is still mounted

    async function fetchChats(nextToken?: string) {
      if (!isMounted) return;

      setIsLoading(true);
      try {
        const variables = {
          filter: {
            members: { contains: user.attributes.email },
          },
          limit: 100, // Adjust the limit as needed, but be mindful of the 1MB limit
        };

        if (nextToken) {
          (variables as any).nextToken = nextToken;
        }

        try {
          const result = (await API.graphql({
            query: queries.listChats,
            variables,
          })) as { data: { listChats: { items: any[]; nextToken?: string } } };

          if (!isMounted) return; // Check again if component is still mounted

          const newChats = result.data.listChats.items;

          setChats((prevChats) => {
            // Create a new set of chat IDs to check for duplicates
            const chatIds = new Set(prevChats.map((chat) => chat.id));
            // Filter out any duplicates
            const uniqueNewChats = newChats.filter(
              (chat) => !chatIds.has(chat.id)
            );
            return [...prevChats, ...uniqueNewChats];
          });

          if (result.data.listChats.nextToken) {
            await fetchChats(result.data.listChats.nextToken);
          }
        } catch (error) {
          console.error("Error fetching chats:", error);
        } finally {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    }

    fetchChats();

    return () => {
      isMounted = false; // Cleanup function to set the isMounted flag to false
    };
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
    setNewMessagesCount((prevCount) => ({
      ...prevCount,
      [contact]: 0,
    }));
  };

  const getidFromSearchBar = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  };

  useEffect(() => {
    // Function to grab the email from the search bar and run switch chat

    const id = getidFromSearchBar();
    if (id) {
      dynamo
        .query({
          TableName: "Users",
          KeyConditionExpression: "id = :id",
          ExpressionAttributeValues: {
            ":id": Number(id),
          },
        })
        .promise()
        .then((data) => {
          if (data.Items && data.Items.length > 0) {
            const uuid = getUUIDFromEmail(data.Items[0].email);
            if (uuid) {
              handleStartNewChatWithEmail(data.Items[0].email);
              switchChat(data.Items[0].email);
            } else {
              console.error("No UUID found for the provided user_id");
              // Handle case where no UUID is found for the provided email
            }
          }
        })
        .catch(console.error);
      // Directly use the return value
    } else {
      console.error("No id found in search bar");
      // Handle case where email is not present in the search bar
    }
  }, []);

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

  const handleFileUpload = async (file: File) => {
    const reader = new FileReader();

    reader.onload = async () => {
      if (reader.result) {
        const base64Data = (reader.result as string).split(",")[1];
        console.log(base64Data);
        //   try {
        //     setIsUploading(true);
        //     const response = await axios.post(
        //       "https://7smo3vt5aisw4kvtr5dw3yyttq0bezsf.lambda-url.eu-north-1.on.aws/",
        //       { photo: base64Data },
        //       {
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //       }
        //     );
        //     console.log(response.data);
        //     await handleSendMessage(
        //       `<img src="${response.data}" alt="Uploaded Image" style="max-width: 100%;" />`
        //     );
        //     setIsUploading(false);
        //   } catch (error) {
        //     console.error("Error uploading photo:", error);
        //     alert(
        //       "Er is een fout opgetreden bij het uploaden van de foto. Probeer het opnieuw."
        //     );
        //     setIsUploading(false);
        //   }
      } else {
        console.error("FileReader result is null");
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
  };

  const handleDropUpClick = () => {
    setIsDropUpOpen(!isDropUpOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropUpRef.current &&
      !dropUpRef.current.contains(event.target as Node) &&
      !settingsModalRef.current?.contains(event.target as Node)
    ) {
      setIsDropUpOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowNewChatModal(false);
        setShowSettingsModal(false);
        setShowSavedMessagesModal(false);
        setShowPaymentModal(false);
        setShowFavoritesModal(false);
      }
    };

    const handleClickOutsideModal = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        (showNewChatModal ||
          showSettingsModal ||
          showSavedMessagesModal ||
          showPaymentModal ||
          showFavoritesModal) &&
        target &&
        !settingsModalRef.current?.contains(target)
      ) {
        setShowNewChatModal(false);
        setShowSettingsModal(false);
        setShowSavedMessagesModal(false);
        setShowPaymentModal(false);
        setShowFavoritesModal(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [
    showNewChatModal,
    showSettingsModal,
    showSavedMessagesModal,
    showPaymentModal,
    showFavoritesModal,
  ]);

  const handleEditMessage = async (messageId: string, newText: string) => {
    try {
      await API.graphql({
        query: mutations.updateChat,
        variables: {
          input: {
            id: messageId,
            text: newText,
          },
        },
      });
      // Update local state
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === messageId ? { ...chat, text: newText } : chat
        )
      );
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await API.graphql({
        query: mutations.deleteChat,
        variables: {
          input: {
            id: messageId,
          },
        },
      });
      // Update local state
      setChats((prevChats) =>
        prevChats.filter((chat) => chat.id !== messageId)
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleDeleteChat = async (contact: string) => {
    try {
      const chatToDelete = chats.find(
        (chat) =>
          chat.members.includes(contact) &&
          chat.members.includes(user.attributes.email)
      );
      if (chatToDelete) {
        await API.graphql({
          query: mutations.deleteChat,
          variables: {
            input: { id: chatToDelete.id },
          },
        });
        setChats((prevChats) =>
          prevChats.filter((chat) => chat.id !== chatToDelete.id)
        );
        setSelectedContact(null);
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const handleSendLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
        getInfo(latitude, longitude);
        await handleSendMessage(
          `<a href="${locationUrl}" target="_blank">Mijn locatie</a>`
        );
      });
    } else {
      alert("Geolocatie wordt niet ondersteund door deze browser.");
    }
  };

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

    const htmlString = ReactDOMServer.renderToStaticMarkup(<>{jsxElements}</>);
    return htmlString;
  };

  const validateMessageContent = (message: string) => {
    const phoneNumberRegex =
      /(\+?\d{1,3}[-.\s]?|(\(?\d{2,4}\)?))\d{3}[-.\s]?\d{4,6}/g;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/;
    const forbiddenWords = ["password", "secret", "confidential"];

    if (phoneNumberRegex.test(message) || emailRegex.test(message)) {
      return false;
    }

    for (const word of forbiddenWords) {
      if (message.toLowerCase().includes(word)) {
        return false;
      }
    }

    return true;
  };

  const handleSendMessageClick = async () => {
    const messageInput = document.getElementById(
      "message-input"
    ) as HTMLInputElement;
    if (messageInput) {
      const messageText = messageInput.value;
      if (messageText && recipientEmail) {
        if (!validateMessageContent(messageText)) {
          alert(
            "Het bericht bevat verboden informatie en kan niet worden verzonden."
          );
          return;
        }
        if (replyingTo) {
          await handleSendMessage(
            stopXSS(`Re: ${replyingTo.text} | U: ${messageText}`)
          );
          setReplyingTo(null);
        } else {
          await handleSendMessage(stopXSS(messageText));
        }
        messageInput.value = "";
      }
    }
  };

  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleStartNewChatClick = (email: string = "") => {
    setNewChatEmail(email);
    setShowNewChatModal(true);
  };

  const handleNewChatConfirm = async () => {
    await handleStartNewChatWithEmail(newChatEmail);
    setShowNewChatModal(false);
    const uuid = getUUIDFromEmail(newChatEmail);
    const url = `/nl/homeowner-dashboard/chat?recipient=${uuid}`;
    window.history.pushState({}, "", url);
    setRecipientEmail(newChatEmail);
    setSelectedContact(newChatEmail);
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

  const handlePinMessage = (messageId: string) => {
    setPinnedMessages((prev) => {
      const newPinnedMessages = new Set(prev);
      if (newPinnedMessages.has(messageId)) {
        newPinnedMessages.delete(messageId);
      } else {
        newPinnedMessages.add(messageId);
      }
      return newPinnedMessages;
    });
  };

  const handleFavoriteMessage = (messageId: string) => {
    setFavoriteMessages((prev) => {
      const newFavoriteMessages = new Set(prev);
      if (newFavoriteMessages.has(messageId)) {
        newFavoriteMessages.delete(messageId);
      } else {
        newFavoriteMessages.add(messageId);
      }
      return newFavoriteMessages;
    });
  };

  const handleReplyMessage = (message: Chat) => {
    setReplyingTo(message);
  };

  const handleTextSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextSize(Number(event.target.value));
  };

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled((prevState) => !prevState);
  };

  const handleSaveSettings = () => {
    localStorage.setItem("textSize", textSize.toString());
    setShowSettingsModal(false);
  };

  useEffect(() => {
    const storedTextSize = localStorage.getItem("textSize");
    if (storedTextSize) {
      setTextSize(Number(storedTextSize));
    }
  }, []);

  useEffect(() => {
    if (messageSearchTerm) {
      const filtered = chats.filter((chat) =>
        chat.text.toLowerCase().includes(messageSearchTerm.toLowerCase())
      );
      setFilteredMessages(filtered);
    } else {
      setFilteredMessages([]);
    }
  }, [messageSearchTerm, chats]);

  const [messageSearchTermm, setMessageSearchTermm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleCancelClick = () => {
    setShowSearch(false);
    setMessageSearchTerm("");
  };

  const handleBlockUser = (contact: string) => {
    setBlockedUsers((prev) => {
      const newBlockedUsers = new Set(prev);
      if (newBlockedUsers.has(contact)) {
        newBlockedUsers.delete(contact);
      } else {
        newBlockedUsers.add(contact);
      }
      return newBlockedUsers;
    });
  };

  const MessageStatusIcon = ({
    delivered,
    read,
  }: {
    delivered: boolean;
    read: boolean;
  }) => {
    if (read) {
      return <IoCheckmarkDone className="message-status-icon read" />;
    } else if (delivered) {
      return <IoCheckmark className="message-status-icon delivered" />;
    } else {
      return null;
    }
  };

  return (
    <div
      className={`chat-container ${theme}`}
      style={{ fontSize: `${textSize}px` }}
    >
      <div className="sidebarr" id="sidebarr">
        <div className="dropdownn-container">
          <BsThreeDotsVertical
            size={30}
            className="menu-iconn"
            onClick={toggleMenu}
          />
          {open && (
            <div className="dropdownn-menu">
              <div
                className="dropdownn-item"
                onClick={() => handleStartNewChatClick()}
              >
                Nieuwe chat starten
              </div>
              <div
                className="dropdownn-item"
                onClick={() => setShowSavedMessagesModal(true)}
              >
                Opgeslagen berichten
              </div>
              <div
                className="dropdownn-item"
                onClick={() => setShowSettingsModal(true)}
              >
                Instellingen
              </div>
              {selectedContact && (
                <>
                  <div
                    className="dropdownn-item"
                    onClick={() => handleDeleteChat(selectedContact)}
                  >
                    Verwijder chat
                  </div>
                  <div
                    className="dropdownn-item"
                    onClick={() => handleBlockUser(selectedContact)}
                  >
                    {blockedUsers.has(selectedContact)
                      ? "Deblokkeer gebruiker"
                      : "Blokkeer gebruiker"}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <ul>
          {searchTerm === ""
            ? sortedContacts.map((contact) => (
                <li
                  key={contact}
                  onClick={() => switchChat(contact)}
                  className={
                    selectedContact === contact ? "selected-contact" : ""
                  }
                >
                  <BsPersonCircle size={50} className="avatar-chat-side" />
                  <div className="contact-details">
                    <div className="contact-name">
                      <span>{contact.split("@")[0]}</span>
                      {newMessagesCount[contact] > 0 && (
                        <span className="new-message-badge">
                          {newMessagesCount[contact]}
                        </span>
                      )}
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
                  className={
                    selectedContact === contact ? "selected-contact" : ""
                  }
                >
                  <BsPersonCircle size={50} className="avatar-chat-side" />
                  <div className="contact-details">
                    <div className="contact-name">
                      <span>{contact.split("@")[0]}</span>
                      {newMessagesCount[contact] > 0 && (
                        <span className="new-message-badge">
                          {newMessagesCount[contact]}
                        </span>
                      )}
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
              </div>
            </div>
            <div className="search-container">
              <input
                type="text"
                placeholder="Zoek berichten..."
                value={messageSearchTerm}
                onChange={(e) => setMessageSearchTerm(e.target.value)}
                className={`search-input-header ${showSearch ? "show" : ""}`}
              />
              {!showSearch && (
                <button onClick={handleSearchClick} className="search-icon">
                  <CiSearch className="search-header" size={25} color="blue" />
                </button>
              )}
              {showSearch && (
                <button onClick={handleCancelClick} className="cancel-icon">
                  <MdOutlineCancel
                    className="search-header"
                    size={25}
                    color="blue"
                  />
                </button>
              )}
            </div>
          </div>
          <div className="chat-box" ref={chatBoxRef}>
            {isLoading && <div className="loading-spinner">Loading...</div>}
            {filteredMessages.length > 0
              ? filteredMessages.map((chat) => (
                  <div
                    key={chat.id}
                    className={`message-container ${
                      chat.email === user.attributes.email
                        ? "self-message-container"
                        : "other-message-container"
                    } ${markedMessages.has(chat.id) ? "marked-message" : ""}`}
                  >
                    <div
                      className={`message-bubble ${
                        chat.email === user.attributes.email
                          ? "self-message"
                          : "other-message"
                      }`}
                      style={{ fontSize: `${textSize}px` }} // Apply text size
                    >
                      <div
                        className="text"
                        dangerouslySetInnerHTML={{ __html: chat.text }}
                      />
                      <div className="message-actions">
                        <button onClick={() => handleReplyMessage(chat)}>
                          <FaReply />
                        </button>
                        <button onClick={() => handleMarkMessage(chat.id)}>
                          {markedMessages.has(chat.id) ? (
                            <FaBookmark />
                          ) : (
                            <FaRegBookmark />
                          )}
                        </button>
                        <button onClick={() => handleDeleteMessage(chat.id)}>
                          <MdDeleteOutline />
                        </button>
                      </div>
                      <div className="message-status">
                        <MessageStatusIcon
                          delivered={chat.delivered}
                          read={chat.read}
                        />
                      </div>
                      <time dateTime={chat.createdAt} className="message-time">
                        {new Intl.DateTimeFormat("nl-NL", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(chat.createdAt))}
                      </time>
                    </div>
                  </div>
                ))
              : Object.keys(groupedMessages).map((date) => {
                  const { text, className } = formatDate(date);
                  return (
                    <React.Fragment key={date}>
                      <div className={`date-separator ${className}`}>
                        {text}
                      </div>
                      {groupedMessages[date].map((chat) => (
                        <div
                          key={chat.id}
                          className={`message-container ${
                            chat.email === user.attributes.email
                              ? "self-message-container"
                              : "other-message-container"
                          } ${
                            markedMessages.has(chat.id) ? "marked-message" : ""
                          }`}
                        >
                          <div
                            className={`message-bubble ${
                              chat.email === user.attributes.email
                                ? "self-message"
                                : "other-message"
                            }`}
                            style={{ fontSize: `${textSize}px` }}
                          >
                            <div
                              className="text"
                              dangerouslySetInnerHTML={{ __html: chat.text }}
                            />
                            <div className="message-actions">
                              <button onClick={() => handleReplyMessage(chat)}>
                                <FaReply />
                              </button>
                              <button
                                onClick={() => handleMarkMessage(chat.id)}
                              >
                                {markedMessages.has(chat.id) ? (
                                  <FaBookmark />
                                ) : (
                                  <FaRegBookmark />
                                )}
                              </button>
                              <button
                                onClick={() => handleDeleteMessage(chat.id)}
                              >
                                <MdDeleteOutline />
                              </button>
                            </div>
                            <div className="message-status">
                              <MessageStatusIcon
                                delivered={chat.delivered}
                                read={chat.read}
                              />
                            </div>
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
                  );
                })}
          </div>
          {replyingTo && (
            <div className="replying-to">
              Replying to: <blockquote>{replyingTo.text}</blockquote>
              <button onClick={() => setReplyingTo(null)}>Annuleren</button>
            </div>
          )}
          <div className="input-form">
            {isUploading && <div className="loading-spinner">Uploading...</div>}
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
              onChange={() => {}}
            />
            <div className="dropup" ref={dropUpRef}>
              <BsPaperclip
                className="paperclip"
                size={25}
                onClick={handleDropUpClick}
              />
              {isDropUpOpen && (
                <div className="dropup-content show">
                  <button
                    className="dropup-option"
                    onClick={handleSendLocation}
                  >
                    Locatie
                  </button>
                  <input
                    type="file"
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <button
                    className="dropup-option"
                    onClick={() => setShowPaymentModal(true)}
                  >
                    Betalen
                  </button>
                  <button
                    className="dropup-option"
                    onClick={() => inputRef.current?.click()}
                  >
                    Deel Bestand
                  </button>
                </div>
              )}
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
          <div className="modal-content" ref={settingsModalRef}>
            <h2>Start Nieuwe Chat</h2>
            <input
              type="email"
              placeholder="Voer e-mailadres in"
              value={newChatEmail}
              onChange={(e) => setNewChatEmail(e.target.value)}
            />
            <button onClick={handleNewChatConfirm} className="button-modal">
              Bevestigen
            </button>
            <button
              onClick={() => setShowNewChatModal(false)}
              className="button-modal"
            >
              Annuleren
            </button>
          </div>
        </div>
      )}
      {showSettingsModal && (
        <div className="settings-modal-overlay">
          <div className="settings-modal-content" ref={settingsModalRef}>
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
              <label>Theme:</label>
              <button
                onClick={handleThemeChange}
                className="theme-toggle-button"
              >
                {theme === "light" ? <BsMoon size={20} /> : <BsSun size={20} />}
              </button>
            </div>
            <div className="settings-item">
              <label>Notifications:</label>
              <button
                onClick={handleNotificationsToggle}
                className="notifications-toggle-button"
              >
                {notificationsEnabled ? (
                  <BsBellSlash size={20} />
                ) : (
                  <BsBell size={20} />
                )}
              </button>
            </div>
            <button onClick={handleSaveSettings} className="button-modal">
              Opslaan
            </button>
            <button
              onClick={() => setShowSettingsModal(false)}
              className="button-modal"
            >
              Annuleren
            </button>
          </div>
        </div>
      )}
      {showSavedMessagesModal && (
        <div className="modal-overlay">
          <div className="modal-content" ref={settingsModalRef}>
            <h2>Opgeslagen Berichten</h2>
            <div className="saved-messages-list">
              {Array.from(markedMessages).map((messageId) => {
                const message = chats.find((chat) => chat.id === messageId);
                if (message) {
                  return (
                    <div key={message.id} className="saved-message-item">
                      <div className="saved-message-sender">
                        Van: {message.email.split("@")[0]}
                      </div>
                      <div
                        className="saved-message-text"
                        dangerouslySetInnerHTML={{ __html: message.text }}
                      />
                      <time
                        dateTime={message.createdAt}
                        className="saved-message-time"
                      >
                        {new Intl.DateTimeFormat("nl-NL", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(message.createdAt))}
                      </time>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <button
              onClick={() => setShowSavedMessagesModal(false)}
              className="button-modal"
            >
              Sluiten
            </button>
          </div>
        </div>
      )}
      {showFavoritesModal && (
        <div className="modal-overlay">
          <div className="modal-content" ref={settingsModalRef}>
            <h2>Favoriete Berichten</h2>
            <div className="favorite-messages-list">
              {Array.from(favoriteMessages).map((messageId) => {
                const message = chats.find((chat) => chat.id === messageId);
                if (message) {
                  return (
                    <div key={message.id} className="favorite-message-item">
                      <div
                        className="favorite-message-text"
                        dangerouslySetInnerHTML={{ __html: message.text }}
                      />
                      <time
                        dateTime={message.createdAt}
                        className="favorite-message-time"
                      >
                        {new Intl.DateTimeFormat("nl-NL", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(message.createdAt))}
                      </time>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <button
              onClick={() => setShowFavoritesModal(false)}
              className="button-modal"
            >
              Sluiten
            </button>
          </div>
        </div>
      )}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content" ref={settingsModalRef}>
            <h2>Payment Options</h2>
            <div className="amount-input-wrapper">
              <input
                type="text"
                placeholder="Voer bedrag in"
                value={customAmount}
                onChange={(e) =>
                  setCustomAmount(formatCurrencyInput(e.target.value))
                }
                className="amount-input-modal"
              />
            </div>
            <PaymentLink
              handleSendMessage={handleSendMessage}
              subtotal={parseFloat(customAmount.replace(",", "."))}
            />
            <PaymentOffer
              subtotal={parseFloat(customAmount.replace(",", "."))}
              handleSendMessage={handleSendMessage}
              recipientEmail={recipientEmail}
            />
            <button
              onClick={() => setShowPaymentModal(false)}
              className="button-modal"
            >
              Sluiten
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuthenticator(ChatMain);
