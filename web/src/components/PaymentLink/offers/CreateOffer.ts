import Stripe from 'stripe';

// Initialize the Stripe client with your secret key
const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

// Function to create a quote
async function createQuote() {
  try {
    const quote = await stripe.quotes.create({
      customer: 'cus_NcMfB0SSFHINCV',
      line_items: [
        {
          price: 'price_1Mr7wULkdIwHu7ixhPkIEN2w',
          quantity: 2,
        },
      ],
    });

    console.log(quote);
  } catch (error) {
    console.error('Error creating quote:', error);
  }
}

// Call the function
createQuote();
