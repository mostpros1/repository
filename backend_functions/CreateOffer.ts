import Stripe from 'stripe';

interface PriceData {
  currency: string;
  product: string; // Corrected to match Stripe's expectation
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

// Function to create a quote
export async function createQuote(lineItems: { unit_amount: number, quantity: number }[]) {
  try {
      const quote = await stripe.quotes.create({
          line_items: lineItems.map(item => ({
              price_data: {
                  currency: 'eur', // Ensure this matches the currency you intend to use
                  product: 'test', // Use the product ID here
                  unit_amount: item.unit_amount * 100, // Stripe expects amounts in cents, so multiply by 100
              },
              quantity: item.quantity,
          })),
      });

      console.log(quote);
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