import Stripe from 'stripe';
import { dynamo } from '../web/declarations';

interface PriceData {
    currency: string;
    product: string;
    unit_amount: number;
}
interface LineItem {
    price_data: PriceData;
    quantity: number;
}

// Initialize the Stripe client with your secret key
const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

// Function to check if a product exists by name
async function getProductByName(name: string): Promise<string | null> {
    // Fetch all products
    const products = await stripe.products.list();

    // Filter products by name
    const matchingProduct = products.data.find(product => product.name === name);

    return matchingProduct? matchingProduct.id : null;
}

// Function to create a product if it doesn't exist
async function createProduct(name: string, description: string) {
    const productId = await getProductByName(name);

    if (!productId) {
        const product = await stripe.products.create({
            name: name,
            description: description,
            type: 'service', // Or 'good', depending on your needs
        });

        return product.id;
    }

    return productId;
}

async function generatePdf(quoteId: string) {
    try {
        const response = await fetch(`https://3ppb27whl1.execute-api.eu-north-1.amazonaws.com/generatePdf/${quoteId}`);
        if (response.ok) {
            const pdfBlob = await response.blob();
            const url = URL.createObjectURL(pdfBlob);
            window.open(url);
        } else {
            console.error('Error generating PDF:', response.statusText);
        }
    } catch (err) {
        console.error(err);
    }
}


// Function to create a quote with a generated fake customer ID
export async function createQuote(lineItems: { unit_amount: number, quantity: number, title: string, description: string }[], email: string)  {
    try {

        let stripeCustomerId;
        dynamo.query({
            TableName: "Users",
            IndexName: "username",
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email,
            },
        }).promise() // Use.promise() here to get a Promise
        .then(data => {
            if (data.Items) {
                stripeCustomerId = data.Items[0].stripeCustomerId;
            }
        }).catch(console.error);
        let productDetails: string[] = [];
        // Automatically create the product if it doesn't exist
        console.log("Creating products:", lineItems);
        for (const item of lineItems) {
            console.log(`Processing item: ${item.title}, Description: ${item.description}`);
            const productDetail = await createProduct(item.title, item.description);
            productDetails.push(productDetail);
        }

        let quote = await stripe.quotes.create({
            customer: stripeCustomerId,
            line_items: lineItems.map((item, index) => ({
                price_data: {
                    currency: 'eur', // Ensure this matches the currency you intend to use
                    product: productDetails[index], // Use the dynamically obtained product ID
                    unit_amount: item.unit_amount * 100, // Stripe expects amounts in cents, so multiply by 100
                },
                quantity: item.quantity,
            })),
        });
        console.log('Quote created:', quote);
        quote = await stripe.quotes.finalizeQuote(quote.id);
        generatePdf(quote.id);
        return quote;
    } catch (error) {
        console.error('Error creating quote:', error);
        throw error;
    }
}