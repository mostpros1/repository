import Stripe from 'stripe';

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
const stripe = new Stripe('sk_test_Gx4mWEgHtCMr4DYMUIqfIrsz', {
    apiVersion: '2023-10-16',
});

// Function to check if a product exists by name]
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

// Function to create a quote
export async function createQuote(lineItems: { unit_amount: number, quantity: number }[]) {
    try {
        // Automatically create the product if it doesn't exist
        const productDetails = await createProduct('Custom Product Name', 'Custom Product Description');

        const quote = await stripe.quotes.create({
            line_items: lineItems.map(item => ({
                price_data: {
                    currency: 'eur', // Ensure this matches the currency you intend to use
                    product: productDetails, // Use the dynamically obtained product ID
                    unit_amount: item.unit_amount * 100, // Stripe expects amounts in cents, so multiply by 100
                },
                quantity: item.quantity,
            })),
        });

        console.log('Quote created:', quote);
        return quote;
    } catch (error) {
        console.error('Error creating quote:', error);
        throw error;
    }
}

// Usage example
createQuote([
    { unit_amount: 1000, quantity: 2 }, // Example line item with unit amount of 1000 (in smallest currency unit) and quantity of 2
]).then(quote => {
    console.log(quote);
}).catch(error => {
    console.error(error);
});