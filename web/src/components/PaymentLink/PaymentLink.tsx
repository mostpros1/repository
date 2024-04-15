import { useEffect, useState } from 'react';
import { stripeClient } from '../../main';
import { Auth } from 'aws-amplify';


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
                setUserEmail(user.attributes.email);
                const stripeAccountId = user.attributes['custom:stripeAccountId'] || '';
                setUserStripeAccountId(stripeAccountId);
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

            setPaymentLink(result.url as string);
            handleSendMessage(`Hier is de betalingslink: ${result.url}`);
            setError('');
        } catch (e) {
            setError('Failed to create payment session. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? <p>Loading...</p> : (
                <>
                    <button onClick={createSession} className='create-payment'>Create payment</button>
                    {paymentLink && (
                        <>
                            <p>Betalingslink is succesvol gemaakt:</p>
                            <a href={paymentLink}>{paymentLink}</a>
                        </>
                    )}
                </>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
}


export default PaymentLink;
