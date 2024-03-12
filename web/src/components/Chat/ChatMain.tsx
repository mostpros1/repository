// // Chat2.tsx
import "@aws-amplify/ui-react/styles.css";
import NavBar from "../ui/NavBar/NavBar";
import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useEffect, useState } from "react";
import * as mutations from "../../graphql/mutations";
<<<<<<< HEAD
//import PaymentLink from "../PaymentLink/PaymentLink";
=======
import PaymentLink from "../PaymentLink/PaymentLink";
>>>>>>> acceptance
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import intlFormatDistance from "date-fns/intlFormatDistance";
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

  const groups = user.signInUserSession.accessToken.payload['cognito:groups'];

  const [subtotalInput, setSubtotalInput] = useState(""); // Voeg de staat toe voor de handmatige subtotal

  const handleSubtotalChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[^0-9.]/g, '');

    const isValidValue = sanitizedValue.split('.').length <= 2;

    if (isValidValue) {
      setSubtotalInput(sanitizedValue);
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
    // Scroll de chatbox naar beneden wanneer nieuwe berichten worden toegevoegd
    const chatBox = document.getElementById('chat-box');
    if (chatBox) {
      // Controleer of de gebruiker naar boven heeft gescrold voordat nieuwe berichten worden toegevoegd
      const isUserAtBottom = chatBox.scrollTop + chatBox.clientHeight === chatBox.scrollHeight;

      // Voeg nieuwe berichten toe aan de chatbox
      chatBox.scrollTop = chatBox.scrollHeight;

      // Als de gebruiker eerder naar boven had gescrold, herstel dan de scrollpositie
      if (!isUserAtBottom) {
        chatBox.scrollTop -= 10; // Een kleine aanpassing om de scrollpositie te behouden zonder direct naar beneden te springen
      }
    }
  }, [chats]);

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

  const handleSendMessageOnEnter = async (e) => {
    if (e.key === 'Enter') {
      const messageText = e.target.value;
      if (messageText && recipientEmail) {
        await handleSendMessage(messageText);
        e.target.value = ''; // Leeg het invoerveld na het verzenden van het bericht
      }
    }
  };

  let PaymentLinkComponent: JSX.Element | null = null;
  if (groups && groups.includes('Professional')) {
    PaymentLinkComponent = (
      <>
        <input
          type="number"
          step="0.01"
          placeholder="Enter subtotal"
          value={subtotalInput}
          onChange={handleSubtotalChange}
        />
<<<<<<< HEAD
        {/* <PaymentLink subtotal={parseFloat(subtotalInput) || 0} handleSendMessage={handleSendMessage} /> */}
=======
        <PaymentLink subtotal={parseFloat(subtotalInput) || 0} handleSendMessage={handleSendMessage} />
>>>>>>> acceptance
      </>
    );
  }

  const handleSendMessageButtonClick = async () => {
    const inputElement = document.getElementById('search') as HTMLInputElement;

    if (inputElement) {
      const messageText = inputElement.value;

      if (messageText && recipientEmail) {
        await handleSendMessage(messageText);
        inputElement.value = ''; // Leeg het invoerveld na het verzenden van het bericht
      }
    }
  };


  return (
    <>
      <NavBar />
      <div className="chat_wrapper">
        <div className="chat_con">
          <div className="chat_leftside">
            <div className="contact_list">

            </div>
            <div className="chat_btn_con">
              <button type="button" className="buttonc" onClick={handleStartNewChat}>
                Start New Chat
              </button>
              {PaymentLinkComponent}
              <button type="button" className="buttonc" onClick={() => signOut()}>
                Sign Out
              </button>
              {showAlert && (
                <div className="alert">
                  <input
                    type="text"
                    placeholder="Enter recipient's email"
                    value={recipientEmail}
                    onChange={handleAlertInputChange}
                  />
                  <button
                    onClick={() => {
                      handleAlertConfirm();
                      setShowJoinButton(true);
                    }}
                  >
                    Confirm
                  </button>
                  <button onClick={handleAlertCancel}>Cancel</button>
                </div>
              )}

              {/* {showJoinButton &&
                user.attributes.email !== recentMessageEmail &&
                !showConfirmedConnection && (
                  <div className="button_containerc">
                    <button type="button" className="buttonc" onClick={handleJoinChat}>
                      Join Chat
                    </button>
                  </div>
                )} */}

              {/* {showConfirmedConnection && (
                <div> */}
              {/* Render a notification message */}
              {/* <p>{notificationMessage}</p> */}
              {/* You can render a message or button to indicate that the user has joined the chat */}
              {/* <p>You have joined the chat</p>
                </div>
              )} */}
            </div>
          </div>

          <div className="chat_box_con">
            <div id="chat-box" className="chat_box">
              {chats
                // @ts-ignore
                .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                .map((chat) => (
                  <div
                    // @ts-ignore
                    key={chat.id}
                    className={
                      //@ts-ignore
                      chat.email === user.attributes.email ? "self-end" : "other-end"}
                  >

                    <div className="chat_box_user_info">
                      <div className="username">
                        <span className="username-name">
                          {
                            // @ts-ignore
                            chat.email}
                        </span>{" "}
                      </div>
                      <time dateTime="2023-01-23T15:56" className="time">
                        { // @ts-ignore
                          intlFormatDistance(new Date(chat.createdAt), new Date())}
                      </time>
                    </div>
                    <p className="text">

                      { // @ts-ignore 
                        chat.text}
                    </p>
                  </div>

                ))}
            </div>
            <div className="input_form">
              <input
                type="text"
                name="search"
                id="search"
                onKeyUp={handleSendMessageOnEnter}
                className="inputchat"
                placeholder="Bericht sturen..."
              />
              <div className="chat-enter" onClick={handleSendMessageButtonClick}>
                <p className="">Enter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthenticator(ChatMain);

// //  -Test code for GraphQL- // //

// user.attributes.email !== recentMessageEmail &&

// import "@aws-amplify/ui-react/styles.css";
// import { withAuthenticator } from "@aws-amplify/ui-react";
// import React, { useEffect } from "react";
// import * as mutations from "../../graphql/mutations";
// import { API, graphqlOperation } from "aws-amplify";
// import * as queries from "../../graphql/queries";
// import intlFormatDistance from "date-fns/intlFormatDistance";
// import * as subscriptions from "../../graphql/subscriptions";
// import "./chatbox.css";

// function ChatMain({ user, signOut }) {
//   const [chats, setChats] = React.useState([]);
//   const [recipientEmail, setRecipientEmail] = React.useState("");
//   const [recentMessageEmail, setRecentMessageEmail] = React.useState("");
//   const [showJoinButton, setShowJoinButton] = React.useState(false);
//   const [showConfirmedConnection, setShowConfirmedConnection] =
//     React.useState(false);
//   const [showAlert, setShowAlert] = React.useState(false);
//   const [confirmedHost, setConfirmedHost] = React.useState("");
//   const [notificationMessage, setNotificationMessage] = React.useState("");

//   useEffect(() => {
//     async function fetchChats() {
//       const allChats = await API.graphql({
//         query: queries.listChats,
//         variables: {
//           filter: {
//             members: { contains: user.attributes.email },
//           },
//         },
//       });
//       // @ts-ignore
//       setChats(allChats.data.listChats.items);
//     }
//     fetchChats();
//   }, [user.attributes.email]);

//   useEffect(() => {
//     console.log("Checking for new messages...");
//     const sub = API.graphql(
//       graphqlOperation(subscriptions.onCreateChat)
//       // @ts-ignore
//     ).subscribe({
//       next: ({ provider, value }) => {
//         console.log("Received a new message:", value.data.onCreateChat);
//         handleReceivedMessage(value.data.onCreateChat);
//       },
//       error: (err) => console.log(err),
//     });
//     return () => sub.unsubscribe();
//   }, [user.attributes.email]);

//   const handleSendMessage = async (text) => {
//     const members = [user.attributes.email, recipientEmail]; // Include both users in the chat
//     await API.graphql({
//       query: mutations.createChat,
//       variables: {
//         input: {
//           text,
//           email: user.attributes.email,
//           members,
//           sortKey: members.sort().join("#"), // Create a unique sortKey
//         },
//       },
//     });
//   };

//   const handleReceivedMessage = (receivedChat) => {
//     if (receivedChat.members.includes(user.attributes.email)) {
//       // @ts-ignore
//       setChats((prev) => [...prev, receivedChat]);
//       setRecentMessageEmail(receivedChat.email); // Update recentMessageEmail with the email of the sender
//       if (receivedChat.email !== confirmedHost) {
//         setShowJoinButton(true);
//       }
//     }
//   };

//   const handleStartNewChat = () => {
//     setRecipientEmail(
//       // @ts-ignore
//       prompt("Enter the email of the person you want to chat with:")
//     );
//     setShowAlert(true);
//   };

//   const handleAlertInputChange = (e) => {
//     setRecipientEmail(e.target.value);
//   };

//   const handleAlertConfirm = () => {
//     if (recipientEmail) {
//       handleSendMessage("Hello, let's chat!");
//       setShowAlert(false);
//       setShowJoinButton(false);
//       setConfirmedHost(user.attributes.email);
//       setShowConfirmedConnection(true); // Show the button to indicate that the user has joined the chat
//       setNotificationMessage(`${recentMessageEmail} joined the chat`);
//     }
//   };

//   const handleAlertCancel = () => {
//     setShowAlert(false);
//     setRecipientEmail("");
//   };

//   const handleJoinChat = () => {
//     console.log("Joining chat with email:", recentMessageEmail);
//     const members = [user.attributes.email, recentMessageEmail];
//     setRecipientEmail(recentMessageEmail);
//     setRecentMessageEmail("");
//     setShowJoinButton(false); // Hide the "Join Chat" button after clicking it
//     setShowConfirmedConnection(true); // Show the button to indicate that the user has joined the chat
//     setNotificationMessage(`${recentMessageEmail} joined the chat`);
//   };

//   return (
//     <div>
//       <div className="button_containerc">
//         <button type="button" className="buttonc" onClick={handleStartNewChat}>
//           Start New Chat
//         </button>
//       </div>

//       <div className="">
//         <div className="chat_box">
//           {chats
//             // @ts-ignore
//             .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
//             .map((chat) => (
//               <div
//                 // @ts-ignore
//                 key={chat.id}
//                 className={`flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200 w-3/4 my-2 ${
//                   // @ts-ignore
//                   chat.email === user.attributes.email && "self-end bg-gray-200"
//                 }`}
//               >
//                 <div>
//                   <div className="">
//                     <div className="username">
//                       <span className="username-name">
//                         {
//                           // @ts-ignore
//                           chat.email.split("@")[0]
//                         }
//                       </span>{" "}
//                     </div>
//                     <time dateTime="2023-01-23T15:56" className="time">
//                       {
//                         // @ts-ignore
//                         intlFormatDistance(new Date(chat.createdAt), new Date())
//                       }
//                     </time>
//                   </div>
//                   <p className="text">
//                     {
//                       // @ts-ignore
//                       chat.text
//                     }
//                   </p>
//                 </div>
//               </div>
//             ))}
//         </div>
//         <div>
//           <div className="input_form">
//             <input
//               type="text"
//               name="search"
//               id="search"
//               onKeyUp={async (e) => {
//                 if (e.key === "Enter") {
//                   // @ts-ignore
//                   const messageText = e.target.value;
//                   if (messageText && recipientEmail) {
//                     await handleSendMessage(messageText);
//                     // @ts-ignore
//                     e.target.value = "";
//                   }
//                 }
//               }}
//               className="inputchat"
//             />
//             <div className="chat-enter">
//               <kbd className="">Enter</kbd>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="button_containerc">
//         <button type="button" className="buttonc" onClick={() => signOut()}>
//           Sign Out
//         </button>
//       </div>
//       {showAlert && (
//         <div className="alert">
//           <input
//             type="text"
//             placeholder="Enter recipient's email"
//             value={recipientEmail}
//             onChange={handleAlertInputChange}
//           />
//           <button
//             onClick={() => {
//               handleAlertConfirm();
//               setShowJoinButton(true);
//             }}
//           >
//             Confirm
//           </button>
//           <button onClick={handleAlertCancel}>Cancel</button>
//         </div>
//       )}

//       {showJoinButton &&
//         user.attributes.email !== recentMessageEmail &&
//         !showConfirmedConnection && (
//           <div className="button_containerc">
//             <button type="button" className="buttonc" onClick={handleJoinChat}>
//               Join Chat
//             </button>
//           </div>
//         )}

//       {showConfirmedConnection && (
//         <div>
//           {/* Render a notification message */}
//           <p>{notificationMessage}</p>
//           {/* You can render a message or button to indicate that the user has joined the chat */}
//           <p>You have joined the chat</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default withAuthenticator(ChatMain);
