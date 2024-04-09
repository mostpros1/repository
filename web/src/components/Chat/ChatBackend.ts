import { useState, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
}

interface Person {
  id: string;
  name: string;
  previewMessage: string;
}

export function useChatBackend() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isJoined, setIsJoined] = useState(false);

  // Functie om een bericht te versturen
  const sendMessage = async (text: string) => {
    try {
      // Vervang dit door jouw logica om een bericht te versturen naar je backend
      const response = await fetch('JOUW_BACKEND_ENDPOINT/berichten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Voeg hier eventuele vereiste headers toe, zoals een Authorization header
        },
        body: JSON.stringify({ text }), // Pas aan op jouw API
      });
      if (!response.ok) throw new Error('Netwerk response was niet ok');
      const newMessage: Message = await response.json();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error('Fout bij het versturen van bericht:', error);
    }
  };

  // Functie om de chat te joinen
  const joinChat = () => {
    setIsJoined(true);
    // Voeg hier jouw logica toe om aan de backend te laten weten dat de gebruiker de chat heeft gejoined.
    console.log('Gebruiker heeft de chat gejoined.');
  };

  // Effect om berichten op te halen bij het initialiseren
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Vervang dit door jouw logica om berichten op te halen van je backend
        const response = await fetch('JOUW_BACKEND_ENDPOINT/berichten');
        if (!response.ok) throw new Error('Netwerk response was niet ok');
        const fetchedMessages: Message[] = await response.json(); // Make sure this matches the Message interface
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Fout bij het ophalen van berichten:', error);
      }
    };

    if (isJoined) {
      fetchMessages();
    }
  }, [isJoined]);

  return { messages, sendMessage, joinChat, isJoined };
}
