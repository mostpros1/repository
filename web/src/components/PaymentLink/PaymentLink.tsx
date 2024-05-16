import { useEffect, useState } from 'react';
import { stripeClient } from '../../main';
import { Auth } from 'aws-amplify';
import { BsCreditCard } from "react-icons/bs";
import axios from 'axios';

type PaymentLinkProps = {
    subtotal: number;
    handleSendMessage: (text: any) => void;
};

const PaymentLink = ({ subtotal, handleSendMessage }: PaymentLinkProps) => {
    const [paymentLink, setPaymentLink] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userStripeAccountId, setUserStripeAccountId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function checkStripeAccountId() {
            try {
                const user = await Auth.currentAuthenticatedUser();
                console.log('Gebruikersattributen:', user.attributes);
                const email = user.attributes.email;
                setUserEmail(email);
                const userStripeAccountId = user.attributes['custom:stripeAccountId'] || '';
                console.log('E-mail van de gebruiker:', email);
                console.log('Stripe-account-ID van de gebruiker:', userStripeAccountId);
                setUserStripeAccountId(userStripeAccountId);
            } catch (e) {
                setError('Failed to authenticate user.');
            }
        }
        checkStripeAccountId();
    }, []);

    const createSession = async () => {
        if (userStripeAccountId === '') {
            setError('Stripe account ID is missing.');
            return;
        } 
        if (userEmail === '') {
            setError('user email is missing.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await stripeClient.checkout.sessions.create({
                currency: 'eur',
                mode: 'payment',
                customer_email: userEmail,
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
                    application_fee_amount: Math.ceil(subtotal * 0.02),
                    transfer_data: {
                        destination: userStripeAccountId
                    }
                },
                success_url: `${window.location.origin}/payments/success`,
                cancel_url: `${window.location.origin}/payments/canceled`,
            });

            const paymentUrl = result.url as string;

            // Shorten the payment URL using Bitly API
            const shortenedUrl = await shortenUrl(paymentUrl);

            setPaymentLink(shortenedUrl);
            handleSendMessage(`Hier is de betalingslink: <a href="${shortenedUrl}">${shortenedUrl}</a>`);
            setError('');
        } catch (e) {
            setError('Failed to create payment session. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const shortenUrl = async (url: string) => {
        const bitlyToken = process.env.REACT_APP_BITLY_API_KEY;  // Get the API key from the environment variable

        try {
            const response = await axios.post(
                'https://api-ssl.bitly.com/v4/shorten',
                { long_url: url },
                {
                    headers: {
                        'Authorization': `Bearer ${bitlyToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.link;
        } catch (error) {
            setError('Failed to shorten URL.');
            return url; // Return original URL if shortening fails
        }
    };

    return (
        <>
            {loading ? <p>Loading...</p> : (
                <>
                    <button onClick={createSession} className="dropup-option">
                        <BsCreditCard size={25} color="blue"/>
                    </button>
                    {paymentLink && (
                        <>
                            <p>Betalingslink is succesvol gemaakt:</p>
                            <a href={paymentLink} target="_blank" rel="noopener noreferrer">{paymentLink}</a>
                        </>
                    )}
                </>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
}

export default PaymentLink;
