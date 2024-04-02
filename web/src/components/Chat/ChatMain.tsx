import React, { useState, useRef, useEffect } from 'react';
import './ChatMain.css'; // Make sure the path is correct

interface Message {
  id: number;
  text: string;
  senderId: string; // Identifier for the sender
}

// Assuming there's a structure for people - Adjust as necessary
interface Person {
  id: string; // Unique identifier
  name: string;
  previewMessage: string;
}

function ChatMain() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const people: Person[] = [ // Example people - adjust based on your data
    { id: 'Jan Ja', name: 'Jan Ja', previewMessage: 'Dit is een test bericht. Als je dit ziet, ben je niet blind.' },
    { id: 'Bekir Se', name: 'Bekir Se', previewMessage: 'Just finished the report. Sending it over now!' },
    { id: 'Timon Ti', name: 'Timon Ti', previewMessage: 'Just finished the report. Sending it over now!' },
    { id: 'Matthew Ma', name: 'Matthew Ma', previewMessage: 'Just finished the report. Sending it over now!' },
    { id: 'Jasmeet Ja', name: 'Jasmeet Ja', previewMessage: 'Just finished the report. Sending it over now!' },
    { id: 'Stefan St', name: 'Stefan St', previewMessage: 'Just finished the report. Sending it over now!' },
    { id: 'Tarik Ta', name: 'Tarik Ta', previewMessage: 'Just finished the report. Sending it over now!' },
    { id: 'Abdel Ab', name: 'Abdel Ab', previewMessage: 'Just finished the report. Sending it over now!' },
    { id: 'Robert Ro', name: 'Robert Ro', previewMessage: 'Just finished the report. Sending it over now!' },
    { id: 'Dani Da', name: 'Dani Da', previewMessage: 'Just finished the report. Sending it over now!' },
  ];

  const handleSendMessage = () => {
    if (inputText.trim() !== '' && selectedPerson) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        senderId: selectedPerson,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents form submission on Enter key press
      handleSendMessage();
    }
  };

  // Scroll to the bottom of the messages container when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      <div className='list-people'>
        {people.map(person => (
          <a key={person.id} className="people-block" onClick={() => setSelectedPerson(person.id)}>
            <h2>{person.name}</h2>
            <p>Message: "{person.previewMessage}"</p>
          </a>
        ))}
      </div>

      <div className="chat-main">
        <div className="messages" style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          {messages.filter(msg => msg.senderId === selectedPerson).map((msg) => (
            <p key={msg.id} style={{ padding: '5px 0' }}>{msg.text}</p>
          ))}
          {/* Dummy element for automatic scrolling */}
          <div ref={messagesEndRef} />
        </div>
        <div className="input">
        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc' }}
        />
        <button onClick={handleSendMessage} className='sendbutton'>Send</button>
      </div>
        </div>
    </div>
  );
}

export default ChatMain;
