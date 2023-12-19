import React, { useEffect, useState } from "react";
import "./chat.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { API, Auth, withSSRContext, graphqlOperation } from "aws-amplify";
import { Observable } from "zen-observable-ts";
import { GraphQLResult } from "@aws-amplify/api";
import { listMessages } from "../../graphql/queries";
import { createMessage } from "../../graphql/mutations";
import Message from "./message";
import { onCreateMessage } from "../../graphql/subscriptions";

function Chat({ messages }) {
  const [stateMessages, setStateMessages] = useState([...messages]);
  const [messageText, setMessageText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const amplifyUser = await Auth.currentAuthenticatedUser();
        setUser(amplifyUser);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();

    // Subscribe to creation of message
    let subscription;

    const fetchData = async () => {
      try {
        const response = await API.graphql(graphqlOperation(onCreateMessage));
        const observable = response as Observable<any>;

        subscription = observable.subscribe({
          next: ({ provider, value }: { provider: any; value: any }) => {
            setStateMessages((stateMessages) => [
              ...stateMessages,
              (value as GraphQLResult<any>).data.onCreateMessage,
            ]);
          },
          error: (error: any) => console.warn(error),
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    // Cleanup function for unsubscribing
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    async function getMessages() {
      try {
        const messagesReq = await API.graphql({
          query: listMessages,
          authMode: import.meta.env.VITE_USER_POOL_ID,
        });
        if ("data" in messagesReq) {
          const messageData = messagesReq.data?.listMessages?.items;

          if (messageData) {
            setStateMessages([...messageData]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    getMessages();
  }, [user]);

  const handleSubmit = async (event) => {
    // Prevent the page from reloading
    event.preventDefault();

    // clear the textbox
    setMessageText("");

    const input = {
      // id is auto populated by AWS Amplify
      message: messageText, // the message content the user submitted (from state)
      owner: (user as any)?.username, // this is the username of the current user
    };

    // Try make the mutation to graphql API
    try {
      await API.graphql({
        authMode: import.meta.env.VITE_USER_POOL_ID,
        query: createMessage,
        variables: {
          input: input,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (user) {
    return (
      <div className="background">
        <div className="container">
          <h1 className="title"> MostPros Chat</h1>
          <div className={"chatbox"}>
            {stateMessages
              // sort messages oldest to newest client-side
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .map((message) => (
                // map each message into the message component with message as props
                <Message
                  message={message}
                  isMe={(user as any)?.username === message.owner}
                  key={message.id}
                />
              ))}
          </div>
          <div className={"formContainer"}>
            <form onSubmit={handleSubmit} className="formBase">
              <input
                type="text"
                id="message"
                name="message"
                autoFocus
                required
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="💬 Send a message to the world 🌎"
                className="textBox"
              />
              <button style={{ marginLeft: "8px" }}>Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  } else if (!user) {
    return <p>Loading...</p>;
  }
}

export default withAuthenticator(Chat);

export async function getServerSideProps({ req }) {
  // wrap the request in a withSSRContext to use Amplify functionality serverside.
  const SSR = withSSRContext({ req });

  try {
    // currentAuthenticatedUser() will throw an error if the user is not signed in.
    const user = await SSR.Auth.currentAuthenticatedUser();

    // If we make it passed the above line, that means the user is signed in.
    const response = await SSR.API.graphql({
      query: listMessages,
      // use authMode: AMAZON_COGNITO_USER_POOLS to make a request on the current user's behalf
      authMode: import.meta.env.VITE_USER_POOL_ID,
    });

    // return all the messages from the dynamoDB
    return {
      props: {
        messages: response.data.listMessages.items,
      },
    };
  } catch (error) {
    // We will end up here if there is no user signed in.
    // We'll just return a list of empty messages.
    return {
      props: {
        messages: [],
      },
    };
  }
}
