// chat page is: http://localhost:5173/chat

import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import React from "react";
import * as mutations from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import intlFormatDistance from "date-fns/intlFormatDistance";
import * as subscriptions from "../../graphql/subscriptions";
import "./chatbox.css";

function Chat2({ user, signOut }) {
  const [chats, setChats] = React.useState([]);

  React.useEffect(() => {
    async function fetchChats() {
      const allChats = await API.graphql({
        query: queries.listChats,
      });
      // @ts-ignore
      console.log(allChats.data.listChats.items);
      // @ts-ignore
      setChats(allChats.data.listChats.items);
    }
    fetchChats();
  }, []);

  React.useEffect(() => {
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
                      // @ts-ignore
                      query: mutations.createChat,
                      variables: {
                        input: {
                          // @ts-ignore
                          text: e.target.value,
                          email: user.attributes.email,
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
    </div>
  );
}

export default withAuthenticator(Chat2);
// // Test code for GraphQL

// import React, { useEffect, useState } from "react";
// import { API, graphqlOperation } from "aws-amplify";
// import { listMessages } from "../../graphql/queries";
// import "./chatbox.css";

// interface Message {
//   id: string;
//   author: string;
//   body: string;
// }

// function Chat2() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [messageBody, setMessageBody] = useState<string>("");

//   async function fetchMessages(): Promise<void> {
//     try {
//       const response: any = await API.graphql(graphqlOperation(listMessages));
//       const items = response.data?.listMessages?.items;

//       if (items) {
//         setMessages(items);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setMessageBody(event.target.value);
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     // Placeholder code for submitting the message to AWS Amplify
//     // Replace this with your actual logic for submitting messages
//     console.log("Submitting message:", messageBody);

//     // Clear the input field after submitting
//     setMessageBody("");
//   };

//   return (
//     <div className="container">
//       <div className="messages">
//         <div className="messages-scroller">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={message.author === "Dave" ? "message me" : "message"}
//             >
//               {message.body}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="chat-bar">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="messageBody"
//             placeholder="Type your message here"
//             onChange={handleChange}
//             value={messageBody}
//           />
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Chat2;
