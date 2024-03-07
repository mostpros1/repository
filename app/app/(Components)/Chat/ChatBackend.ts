import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import { Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

export function useChatBackend(user: any, signOut) {
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

    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    };

    const handleSendMessage = async (text) => {
        if (!isValidEmail(recipientEmail)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        const members = [user.attributes.email, recipientEmail];
        try {
            await API.graphql(graphqlOperation(mutations.createChat, {
                input: {
                    text,
                    email: user.attributes.email,
                    members,
                    sortKey: [...members].sort().join("#"),
                },
            }));
        } catch (error) {
            console.error('Error sending message:', error);
            Alert.alert("Error", "Unable to send message. Please try again later.");
        }
    };

    const handleReceivedMessage = (receivedChat) => {
        if (isMounted.current && receivedChat.members.includes(user.attributes.email)) {
            setChats((prev) => {
                return prev.find(chat => chat.id === receivedChat.id) ? prev : [...prev, receivedChat];
            });
            setRecentMessageEmail(receivedChat.email);
            if (receivedChat.email) {
                setShowJoinButton(true);
            }
        }
    };

    const handleStartNewChat = () => {
        Alert.prompt(
            'Start new chat',
            'Enter the email of the person you want to chat with:',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: (email) => {
                        if (isValidEmail(email)) {
                            setRecipientEmail(email);
                        } else {
                            Alert.alert("Invalid Email", "Please enter a valid email address.");
                        }
                    },
                },
            ],
            'plain-text',
        );
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

    const handleAlertInputChange = (text: string) => {
        if (isValidEmail(text)) {
            setRecipientEmail(text);
        } else {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
        }
    };

    return {
        chats,
        setChats,
        recipientEmail,
        showJoinButton,
        setShowJoinButton,
        showConfirmedConnection,
        handleStartNewChat,
        handleSendMessage,
        handleAlertConfirm,
        handleJoinChat,
        recentMessageEmail,
        handleReceivedMessage,
        signOut,
        handleAlertCancel,
        handleAlertInputChange,
        showAlert,
    };
}
