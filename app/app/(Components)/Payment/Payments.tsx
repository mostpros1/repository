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
    const [userStripeAccountId, setUserStripeAccountId] = useState('');
    const companyFee = subtotal * 0.02; // Mostpros takes 2% of the transaction.
    

    useEffect(() => {
        initializeStripe();
        async function checkStripeAccountId() {
            const user = await Auth.currentAuthenticatedUser();
            setCurrentUser(user);
            const stripeAccountId = user?.attributes['custom:stripeAccountId'] || '';
            setUserStripeAccountId(stripeAccountId);
        }
        checkStripeAccountId();
    }, []);

    const createSession = async () => {
        if (userStripeAccountId === '') return;
        

        const result = await stripeClient.checkout.sessions.create({
            currency: 'eur',
            mode: 'payment',
            customer_email: `${currentUser.attributes.email}`,
            line_items: [{
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: "Betaling voor klus",
                    },
                    unit_amount: subtotal
                },
                quantity: 1
            }],
            payment_method_types: ['card', 'ideal'],
            payment_intent_data: {
                application_fee_amount: Math.ceil(companyFee),
                transfer_data: {
                    destination: userStripeAccountId
                }
            },
            success_url: `${window.location.origin}/payments/success`,
            cancel_url: `${window.location.origin}/payments/canceled`,
        });

        setPaymentLink(result.url);
        const paymentMessage = `Hier is de betalingslink: ${result.url}`;
        handleSendMessage(paymentMessage);
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
