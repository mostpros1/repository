import Stripe from 'stripe';

interface LineItem {
    price: string;
    quantity: number;
  }

// Initialize the Stripe client with your secret key
const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

// Function to create a quote
async function createQuote(customer: string, line_items: LineItem[]) {
  try {
    const quote = await stripe.quotes.create({
      customer: customer,
      line_items: line_items,
    });

    console.log(quote);
  } catch (error) {
    console.error('Error creating quote:', error);
  }
}

// Call the function
createQuote('cus_NcMfB0SSFHINCV',[{
    price: 'price_1Mr7wULkdIwHu7ixhPkIEN2w',
    quantity: 2,
  }]);
