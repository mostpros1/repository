// import { useEffect, useState } from 'react';
// import { stripeClient } from '../../main';
// import { Auth } from 'aws-amplify';

<<<<<<< HEAD
// type PaymentLinkProps = {
//     subtotal: number;
//     handleSendMessage: (text: any) => void; // Of het nu een Promise<void> of een andere return type moet zijn, hangt af van je implementatie
// };

// const PaymentLink = ({ subtotal, handleSendMessage }: PaymentLinkProps) => {
//     const [paymentLink, setPaymentLink] = useState('')
//     const [currentUser, setCurrentUser] = useState<any>('')
//     const [userStripeAccountId, setUserStripeAccountId] = useState('')
//     const companyFee = subtotal * 0.02 // Mostpros takes 2% of the transaction.
=======
type PaymentLinkProps = {
    subtotal: number;
    handleSendMessage: (text: any) => void; // Of het nu een Promise<void> of een andere return type moet zijn, hangt af van je implementatie
};

const PaymentLink = ({ subtotal, handleSendMessage }: PaymentLinkProps) => {
    const [paymentLink, setPaymentLink] = useState('')
    const [currentUser, setCurrentUser] = useState<any>('')
    const [userStripeAccountId, setUserStripeAccountId] = useState('')
    const companyFee = subtotal * 0.02 // Mostpros takes 2% of the transaction.
>>>>>>> acceptance

//     useEffect(() => {
//         async function checkStripeAccountId() {
//             const user = await Auth.currentAuthenticatedUser()
//             setCurrentUser(user)
//             const stripeAccountId = user?.attributes['custom:stripeAccountId'] || []
//             setUserStripeAccountId(stripeAccountId)
//         }
//         checkStripeAccountId()
//     }, [])

//     const createSession = async () => {
//         if (userStripeAccountId == '') return;

<<<<<<< HEAD
//         stripeClient.checkout.sessions.create({
//             currency: 'eur',
//             mode: 'payment',
//             customer_email: `${currentUser.attributes.email}`,
//             line_items: [{
//                 price_data: {
//                     currency: 'eur',
//                     product_data: {
//                         name: "Betaling voor klus",
//                     },
//                     unit_amount: subtotal
//                 },
//                 quantity: 1
//             }],
//             payment_method_types: ['card', 'ideal'],
//             payment_intent_data: {
//                 application_fee_amount: Math.ceil(companyFee),
//                 transfer_data: {
//                     destination: userStripeAccountId
//                 }
//             },
//             success_url: `${window.location.origin}/payments/success`,
//             cancel_url: `${window.location.origin}/payments/canceled`,
//         }).then(result => {
//             setPaymentLink(result.url as string)
//             const paymentMessage = `Hier is de betalingslink: ${result.url}`;
//             handleSendMessage(paymentMessage);
//         })
//     }
=======
        stripeClient.checkout.sessions.create({
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
        }).then(result => {
            setPaymentLink(result.url as string)
            const paymentMessage = `Hier is de betalingslink: ${result.url}`;
            handleSendMessage(paymentMessage);
        })
    }
>>>>>>> acceptance

//     return <>
//         <button onClick={createSession}>create payment</button>
//         <a href={paymentLink}>payment link</a>
//     </>
// }

// export default PaymentLink