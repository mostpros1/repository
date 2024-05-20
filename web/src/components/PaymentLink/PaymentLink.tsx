import { useEffect, useState } from 'react';
import { stripeClient } from '../../main';
import { Auth } from 'aws-amplify';
import { BsCreditCard } from "react-icons/bs";

type PaymentLinkProps = {
    handleSendMessage: (text: string) => void;
    subtotal: number;
  };

  const PaymentLink = ({ handleSendMessage, subtotal }: PaymentLinkProps) => {
    const [amount, setAmount] = useState<number>(subtotal);
    const [paymentLink, setPaymentLink] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userStripeAccountId, setUserStripeAccountId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function checkStripeAccountId() {
            try {
                const user = await Auth.currentAuthenticatedUser();
                const email = user.attributes.email;
                setUserEmail(email);
                const userStripeAccountId = user.attributes['custom:stripeAccountId'] || '';
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
            setError('User email is missing.');
            return;
        }
        if (amount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const session = await stripeClient.checkout.sessions.create({
                currency: 'eur',
                mode: 'payment',
                customer_email: userEmail,
                line_items: [{
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: "Betaling voor klus",
                        },
                        unit_amount: Math.round(amount * 100), // Convert to cents
                    },
                    quantity: 1
                }],
                payment_method_types: ['card', 'ideal'],
                payment_intent_data: {
                    application_fee_amount: Math.ceil(amount * 2), // 2% of amount in cents
                    transfer_data: {
                        destination: userStripeAccountId
                    }
                },
                success_url: `${window.location.origin}/payments/success`,
                cancel_url: `${window.location.origin}/payments/canceled`,
            });
            const paymentUrl = result.url as string;
            setPaymentLink(paymentUrl);
            handleSendMessage(`Hier is de betalingslink: <a href="${paymentUrl}">${paymentUrl}</a>`);
            setError('');
        } catch (e) {
            setError('Failed to create payment session. Please try again later. ' + e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={createSession} className="dropup-option">
                <BsCreditCard size={25} color="blue" />
            </button>
            {loading && <p>Loading...</p>}
            {paymentLink && (
                <>
                    <button onClick={createSession} className="dropup-option">
                        <BsCreditCard size={25} color="blue"/>
                    </button>
                    {paymentLink && (
                        <>
                            <p>Betalingslink is succesvol gemaakt:</p>
                            <p>{paymentLink}</p>
                        </>
                    )}
                </>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
};

export default PaymentLink;
