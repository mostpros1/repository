import { useEffect, useState } from 'react';
import { stripeClient } from '../../main';
import { Auth } from 'aws-amplify';

type PaymentLinkProps = {
    subtotal: number;
    handleSendMessage: (text: any) => void;
};

const PaymentLink = ({ subtotal, handleSendMessage }: PaymentLinkProps) => {
    const [paymentLink, setPaymentLink] = useState('');
    const [currentUser, setCurrentUser] = useState<any>('');
    const [userStripeAccountId, setUserStripeAccountId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const companyFee = subtotal * 0.02; // Mostpros takes 2% of the transaction.

    useEffect(() => {
        async function checkStripeAccountId() {
            try {
                const user = await Auth.currentAuthenticatedUser();
                setCurrentUser(user);
                const stripeAccountId = user?.attributes['custom:stripeAccountId'] || '';
                setUserStripeAccountId(stripeAccountId);
            } catch (e) {
                setError('Failed to authenticate user.');
            }
        }
        checkStripeAccountId();
    }, []);

    const createSession = async () => {
        if (userStripeAccountId === '') return;

        setLoading(true);
        setError('');

        try {
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

            setPaymentLink(result.url as string);
            handleSendMessage(`Hier is de betalingslink: ${result.url}`);
        } catch (e) {
            setError('Failed to create payment session.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? <p>Loading...</p> : (
                <>
                    <button onClick={createSession} disabled={!userStripeAccountId}>Create payment</button>
                    {paymentLink && <a href={paymentLink}>Payment link</a>}
                </>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
}

export default PaymentLink;
