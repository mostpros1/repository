import React, { useState } from 'react';
import { dynamo } from '../../../declarations';
import { createQuote } from '../../../../backend_functions/CreateOffer';

interface PaymentOfferProps {
    subtotal: number;
    handleSendMessage: (text: unknown) => Promise<void>;
    recipientEmail: string; // Add this line
  }

interface LineItem {
    id: number;
    title: string;
    description: string;
    price: number;
    quantity: number;
}

function addToDb(lineItem: LineItem) {
    dynamo
        .put({
            Item: {
                ...lineItem,
                status: "undecided"
            },
            TableName: "Offers",
        })
        .promise()
        .then(data => console.log(data.Attributes))
        .catch(console.error);
}

const PaymentOffer: React.FC<PaymentOfferProps> = ({ subtotal, handleSendMessage, recipientEmail}) => {
    const [lineItems, setLineItems] = useState<LineItem[]>([]);

    const handleAddLineItem = () => {
        const newItem: LineItem = {
            id: Date.now(), // Unique identifier
            title: '',
            description: '',
            price: 0, // Assuming price is provided or calculated
            quantity: 0
        };
        setLineItems([...lineItems, newItem]);
    };

    const handleDeleteLineItem = (itemId: number) => {
        setLineItems(lineItems.filter(item => item.id !== itemId));
    };

    const handleAccept = async () => {
        // Save each line item to the database
        lineItems.forEach(item => addToDb(item));

        // Prepare line items for Stripe
        const lineItemsForStripe = lineItems.map(item => ({
            unit_amount: item.price,
            quantity: item.quantity,
            title: item.title,
            description: item.description
        }));

        
        createQuote(lineItemsForStripe, recipientEmail).then(quote => {
            console.log(quote);
        }).catch(error => {
            console.error(error);
        });

        const offerMessage = `<div><OfferTemplate /></div>`;
        handleSendMessage(offerMessage);
    };

    return (
        <div>
            <form>
                {lineItems.map((item, index) => (
                    <div key={index}>
                        <label htmlFor={`title-${index}`}>Title:</label>
                        <input
                            type="text"
                            id={`title-${index}`}
                            name="title"
                            value={item.title}
                            onChange={(e) => setLineItems(lineItems.map((li, i) => i === index ? { ...li, title: e.target.value } : li))}
                            required
                        />

                        

                        <label htmlFor={`price-${index}`}>Price:</label>
                        <input
                            type="number"
                            id={`price-${index}`}
                            name="price"
                            value={item.price}
                            onChange={(e) => setLineItems(lineItems.map((li, i) => i === index ? { ...li, price: parseFloat(e.target.value) } : li))}
                            step="any"
                            required
                        />

                        <label htmlFor={`description-${index}`}>Description:</label>
                        <textarea
                            id={`description-${index}`}
                            name="description"
                            value={item.description}
                            onChange={(e) => setLineItems(lineItems.map((li, i) => i === index ? { ...li, description: e.target.value } : li))}
                            required
                        />

                        <label htmlFor={`quantity-${index}`}>Quantity:</label>
                        <input
                            type="number"
                            id={`quantity-${index}`}
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => setLineItems(lineItems.map((li, i) => i === index ? { ...li, quantity: parseFloat(e.target.value) } : li))}
                            step="any"
                            required
                        />

                        <button type="button" onClick={() => handleDeleteLineItem(item.id)}>Remove</button>
                    </div>
                ))}

                <button type="button" onClick={handleAddLineItem}>Add Line Item</button>
                <button type="button" onClick={handleAccept}>Submit</button>
            </form>

            <p>Aanbieding: €{subtotal.toFixed(2)}</p>
        </div>
    );
};

export default PaymentOffer;
