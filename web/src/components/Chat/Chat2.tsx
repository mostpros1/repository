// chat page is: http://localhost:5173/chat

import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useEffect } from "react";
import * as mutations from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import intlFormatDistance from "date-fns/intlFormatDistance";
import * as subscriptions from "../../graphql/subscriptions";
import "./chatbox.css";

function Chat2({ user, signOut }) {
  const [chats, setChats] = React.useState([]);
  const [recipientEmail, setRecipientEmail] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);

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
      next: ({ provider, value }) =>
        // @ts-ignore
        setChats((prev) => [...prev, value.data.onCreateChat]),
      error: (err) => console.log(err),
    });
    return () => sub.unsubscribe();
  }, []);

  const handleSendMessage = async (text) => {
    await API.graphql({
      query: mutations.createChat,
      variables: {
        input: {
          text,
          email: user.attributes.email,
          members: [user.attributes.email, recipientEmail],
          sortKey: `${user.attributes.email}#${recipientEmail}`,
        },
      },
    });
  };

  const handleStartNewChat = () => {
    setRecipientEmail(
      // @ts-ignore
      prompt("Enter the email of the person you want to chat with:")
    );
    setShowAlert(true);
  };

  const handleAlertInputChange = (e) => {
    setRecipientEmail(e.target.value);
  };

  const handleAlertConfirm = () => {
    if (recipientEmail) {
      handleSendMessage("Hello, let's chat!");
      setShowAlert(false);
      setRecipientEmail("");
    }
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
    setRecipientEmail("");
  };

  return (
    <div>
      <div className="button_containerc">
        <button type="button" className="buttonc" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
      <div className="">
        <div className="">
          {chats
            // @ts-ignore
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            .map((chat) => (
              <div
                // @ts-ignore
                key={chat.id}
                className={`flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200 w-3/4 my-2 ${
                  // @ts-ignore
                  chat.email === user.attributes.email && "self-end bg-gray-200"
                }`}
              >
                <div>
                  <div className="">
                    <div className="username">
                      <span className="username-name">
                        {
                          // @ts-ignore
                          chat.email.split("@")[0]
                        }
                      </span>{" "}
                    </div>
                    <time dateTime="2023-01-23T15:56" className="time">
                      {
                        // @ts-ignore
                        intlFormatDistance(new Date(chat.createdAt), new Date())
                      }
                    </time>
                  </div>
                  <p className="text">
                    {
                      // @ts-ignore
                      chat.text
                    }
                  </p>
                </div>
              </div>
            ))}

          <div>
            <div className="">
              <input
                type="text"
                name="search"
                id="search"
                onKeyUp={async (e) => {
                  if (e.key === "Enter") {
                    // Remove this line
                    // setChats(e.target.value);

                    // Add these
                    await API.graphql({
                      query: mutations.createChat,
                      variables: {
                        input: {
                          // @ts-ignore
                          text: e.target.value,
                          email: user.attributes.email,
                          members: [user.attributes.email, recipientEmail], // Include both users in the chat
                          sortKey: `${user.attributes.email}#${recipientEmail}`, // Create a unique sortKey
                        },
                      },
                    });
                    // @ts-ignore
                    e.target.value = "";
                  }
                }}
                className="inputchat"
              />
              <div className="chat-bar">
                <kbd className="chat-bar">Enter</kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="button_containerc">
        <button type="button" className="buttonc" onClick={handleStartNewChat}>
          Start New Chat
        </button>
      </div>

      {showAlert && (
        <div className="alert">
          <input
            type="text"
            placeholder="Enter recipient's email"
            value={recipientEmail}
            onChange={handleAlertInputChange}
          />
          <button onClick={handleAlertConfirm}>Confirm</button>
          <button onClick={handleAlertCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default withAuthenticator(Chat2);

// // Test code for GraphQL

// function Chat2({ user, signOut }) {
//   const [chats, setChats] = React.useState([]);

//   React.useEffect(() => {
//     async function fetchChats() {
//       const allChats = await API.graphql({
//         query: queries.listChats,
//       });
//       // @ts-ignore
//       console.log(allChats.data.listChats.items);
//       // @ts-ignore
//       setChats(allChats.data.listChats.items);
//     }
//     fetchChats();
//   }, []);

//   React.useEffect(() => {
//     const sub = API.graphql(
//       graphqlOperation(subscriptions.onCreateChat)
//       // @ts-ignore
//     ).subscribe({
//       next: ({ provider, value }) =>
//         // @ts-ignore
//         setChats((prev) => [...prev, value.data.onCreateChat]),
//       error: (err) => console.log(err),
//     });
//     return () => sub.unsubscribe();
//   }, []);

//   return (
//     <div>
//       <div className="button_containerc">
//         <button type="button" className="buttonc" onClick={() => signOut()}>
//           Sign Out
//         </button>
//       </div>
//       <div className="">
//         <div className="">
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

//           <div>
//             <div className="">
//               <input
//                 type="text"
//                 name="search"
//                 id="search"
//                 onKeyUp={async (e) => {
//                   if (e.key === "Enter") {
//                     // Remove this line
//                     // setChats(e.target.value);

//                     // Add these
//                     await API.graphql({
//                       // @ts-ignore
//                       query: mutations.createChat,
//                       variables: {
//                         input: {
//                           // @ts-ignore
//                           text: e.target.value,
//                           email: user.attributes.email,
//                         },
//                       },
//                     });
//                     // @ts-ignore
//                     e.target.value = "";
//                   }
//                 }}
//                 className="inputchat"
//               />
//               <div className="chat-bar">
//                 <kbd className="chat-bar">Enter</kbd>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default withAuthenticator(Chat2);
