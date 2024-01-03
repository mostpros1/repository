// chat page is: http://localhost:5173/chat

import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Observable } from "zen-observable-ts";

import { GraphQLResult } from "@aws-amplify/api";
import "@aws-amplify/pubsub";

import { createMessage } from "../../graphql/mutations";
import { onCreateMessage } from "../../graphql/subscriptions";
import { messagesByChannelID } from "../../graphql/queries";

import "./chatbox.css";

function Chat2() {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    API.graphql(
      graphqlOperation(messagesByChannelID, {
        channelID: "1",
        sortDirection: "ASC",
      })
    ).then((response) => {
      const items = response?.data?.messagesByChannelID?.items;

      if (items) {
        setMessages(items);
      }
    });
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (event) => {
        setMessages([...messages, event.value.data.onCreateMessage]);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [messages]);

  const handleChange = (event) => {
    setMessageBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const input = {
      channelID: "1",
      author: "Dave",
      body: messageBody.trim(),
    };

    try {
      setMessageBody("");
      await API.graphql(graphqlOperation(createMessage, { input }));
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="container">
      <div className="messages">
        <div className="messages-scroller">
          {messages.map((message) => (
            <div
              key={message.id}
              className={message.author === "Dave" ? "message me" : "message"}
            >
              {message.body}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-bar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            placeholder="Type your message here..."
            onChange={handleChange}
            value={messageBody}
          />
        </form>
      </div>
    </div>
  );
}

export default Chat2;

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
