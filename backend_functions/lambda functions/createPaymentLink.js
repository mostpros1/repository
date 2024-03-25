const stripe = require('stripe')('your_stripe_secret_key');

async function createPaymentLink(amountInCents, description, professionalEmail, userEmail) {
    try {
        const paymentLink = await stripe.paymentLinks.create({
            amount: amountInCents, // Amount in cents (e.g., $10.00)
            currency: 'eur',
            description: description,
            metadata: {
                professional_email: professionalEmail,
                user_email: userEmail,
            },
            // Other optional parameters: customer, etc.
        });

        // Payment link created successfully
        console.log('Payment link URL:', paymentLink.url);
        return paymentLink.url;
    } catch (error) {
        console.error('Error creating payment link:', error.message);
        throw error;
    }
}

// Example usage:
const amountInCents = 1000; // €10.00
const paymentDescription = 'Product purchase';
const professionalEmail = 'professional@example.com';
const userEmail = 'user@example.com';

createPaymentLink(amountInCents, paymentDescription, professionalEmail, userEmail);