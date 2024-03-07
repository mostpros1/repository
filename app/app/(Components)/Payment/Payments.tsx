import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Text, View, Linking } from 'react-native';
import { Auth } from 'aws-amplify';
import { initStripe } from '@stripe/stripe-react-native';

let stripeClient;

const initializeStripe = async () => {
 stripeClient = await initStripe({
    publishableKey: 'pk_live_51Np5loGSS5FaNGjdWL8VPW3RJws0ndlFg3WIPcgtxEzdKHxiwo9AsSH803slhEOJkUeuGvQGGOZmjxMaLiYbPKR000sTekr8bf',
 });
};

const PaymentLink = ({ subtotal, handleSendMessage }) => {
    const [paymentLink, setPaymentLink] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        initializeStripe();
        async function checkUser() {
            const user = await Auth.currentAuthenticatedUser();
            setCurrentUser(user);
        }
        checkUser();
    }, []);

    const createSession = async () => {
        const user = await Auth.currentAuthenticatedUser();
        if (!user) return; // Ensure the user is logged in

        const userStripeAccountId = user.attributes['custom:stripeAccountId'];
        if (!userStripeAccountId) return; // Make sure the user has a Stripe account ID

        try {
            const response = await fetch(`${'http://192.168.1.x:3000'}/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subtotal,
                    userEmail: user.attributes.email,
                    userStripeAccountId,
                }),
            });

            const { url } = await response.json();
            setPaymentLink(url);
            handleSendMessage(`Here is your payment link: ${url}`);
        } catch (error) {
            console.error("Failed to create payment session:", error);
            // Handle errors (e.g., show an error message)
        }
    };

    return (
        <View>
            <Button title="create payment" onPress={createSession} />
            {paymentLink ? (
                <Text onPress={() => Linking.openURL(paymentLink)} style={{ color: 'blue' }}>
                    Payment link
                </Text>
            ) : null}
        </View>
    );
};

export default PaymentLink;
