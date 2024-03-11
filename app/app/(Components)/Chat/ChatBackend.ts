import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import { Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

export function useChatBackend(userInput: any, signOut) {
    const [chats, setChats] = useState([]);
    const [recipientEmail, setRecipientEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [recentMessageEmail, setRecentMessageEmail] = useState('');
    const [showJoinButton, setShowJoinButton] = useState(false);
    const [showConfirmedConnection, setShowConfirmedConnection] = useState(false);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const defaultUser = {
        attributes: {
            email: 'Jan Schilder',
        }
    };

    // Use the provided user or the default user
    const user = userInput || defaultUser;

    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    };

    const handleSendMessage = (messageText) => {
        if (!messageText.trim()) return;  // Prevent sending empty messages
        
        // Simulate creating a new chat message
        const newChat = {
            id: Date.now().toString(), // Simulate a unique identifier
            text: messageText,
            email: user?.attributes?.email || 'Jan Schilder', // Use the default or provided user email
            createdAt: new Date().toISOString(),
        };
        
        // Simulate asynchronous operation
        setTimeout(() => {
            if (isMounted.current) {
                setChats(prevChats => [...prevChats, newChat]);
            }
        }, 500); // Simulate a delay
    };

    const handleAlertConfirm = () => {
        if (recipientEmail) {
            handleSendMessage("Hello, let's chat!");
            setShowConfirmedConnection(true);
        }
    };

    const handleAlertCancel = () => {
        setShowAlert(false);
        setRecipientEmail("");
    };

    const handleJoinChat = () => {
        if (recentMessageEmail && isValidEmail(recentMessageEmail)) {
            const members = [user.attributes.email, recentMessageEmail];
            setRecipientEmail(recentMessageEmail);
            setShowJoinButton(false);
            setShowConfirmedConnection(true);
        }
    };

    return {
        chats,
        setChats,
        recipientEmail,
        showJoinButton,
        setShowJoinButton,
        showConfirmedConnection,
        // handleStartNewChat,
        handleSendMessage,
        handleAlertConfirm,
        handleJoinChat,
        recentMessageEmail,
        // handleReceivedMessage,
        signOut,
        handleAlertCancel,
        // handleAlertInputChange,
        showAlert,
    };
}
