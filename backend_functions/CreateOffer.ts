import Stripe from 'stripe';

interface PriceData {
  currency: string;
  product_data: {
    name: string;
    description: string;
  };
  unit_amount: number;
  product: string; // Include the 'product' field to match the expected structure
}

interface LineItem {
  price_data: PriceData;
  quantity: number;
}

// Initialize the Stripe client with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Function to create an open quote
export async function createQuote(lineItemsDetails: { name: string, description: string, unit_amount: number, quantity: number, product: string }[]): Promise<Stripe.Response<Stripe.Quote>> {
  try {
    // Generate line items based on the provided details
    const lineItems: LineItem[] = lineItemsDetails.map(detail => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: detail.name,
          description: detail.description,
        },
        unit_amount: detail.unit_amount,
        product: detail.product, // Add this line to include the 'product' property
      },
      quantity: detail.quantity, // Assuming all items have a quantity of 1, adjust as needed
    }));

    // Create a quote with the adjusted line items
    const quote = await stripe.quotes.create({
      line_items: lineItems,
    });

    console.log(quote);
    return quote;
  } catch (error) {
    console.error('Error creating quote:', error);
    throw error;
  }
}

// Usage example

