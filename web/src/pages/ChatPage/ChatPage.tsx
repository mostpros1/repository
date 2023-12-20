import Chat from "../../components/Chat/Chat.tsx";

function ChatPage({ messages }) {
  return (
    <div>
      <Chat messages={messages} />
    </div>
  );
}

export default ChatPage;
