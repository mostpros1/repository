import React, { useState } from 'react'; // Removed useState as it's not used
import { dynamo } from '../../../declarations';

interface PaymentOfferProps {
    subtotal: number;
    handleSendMessage: (message: string) => void;
}

function addToDb(id, title, amount, description) {
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
        .catch(console.error)
}

const PaymentOffer = ({ subtotal, handleSendMessage }: PaymentOfferProps) => {
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const handleAccept = () => {
        const id = Math.floor(Math.random() * 10000);
        addToDb(id, title, amount, description);
        console.log(title, description, amount);
        console.log("ACCEPT");
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

                <button type="submit">Submit</button>
            </form>

            <p>Aanbieding: €{subtotal.toFixed(2)}</p>
            <button onClick={handleAccept}>Aanvaarden</button>
            {/* Add other elements */}
        </div>
    );
};

export default PaymentOffer;