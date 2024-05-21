import React, { useState } from 'react';
import { dynamo } from '../../../declarations';
import { createQuote } from '../../../../backend_functions/CreateOffer';

interface PaymentOfferProps {
    subtotal: number;
    handleSendMessage: (message: string) => void;
}

function addToDb(id: number, title: string, amount: number, description: string) {
    dynamo
        .put({
            Item: {
                id: id,
                title: title,
                amount: amount,
                description: description,
                status: "undecided"
            },
            TableName: "Offers",
        })
        .promise()
        .then(data => console.log(data.Attributes))
        .catch(console.error);
}

const PaymentOffer: React.FC<PaymentOfferProps> = ({ subtotal, handleSendMessage }) => {
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const handleAccept = async () => {
        const id = Math.floor(Math.random() * 10000);
        addToDb(id, title, amount, description);
        console.log(title, description, amount);
        console.log("ACCEPT");

        const lineItems = [{
            price: 'price_1Mr7wULkdIwHu7ixhPkIEN2w', // example price ID, update as necessary
            quantity: amount
        }];

        // Call the backend function to create the quote
        await createQuote('cus_NcMfB0SSFHINCV', lineItems);

        const offerMessage = '<div>' +
            '<OfferTemplate />' + '</div>';
        handleSendMessage(offerMessage);
    };

    return (
        <div>
            <form>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    step="any"
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <button type="button" onClick={handleAccept}>Submit</button>
            </form>

            <p>Aanbieding: €{subtotal.toFixed(2)}</p>
            <button onClick={handleAccept}>Aanvaarden</button>
        </div>
    );
};

export default PaymentOffer;
