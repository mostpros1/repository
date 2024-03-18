const express = require('express');
const stripe = require('stripe')('sk_test_yourSecretKey'); // Use your secret key
const app = express();

app.use(express.json());

// Endpoint to create a Stripe session
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { subtotal, userEmail, userStripeAccountId } = req.body;
        const companyFee = Math.ceil(subtotal * 0.02); // Adjust the fee calculation as necessary

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'ideal'], // Adjust according to your needs
            line_items: [{
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: "Service or product name",
                    },
                    unit_amount: subtotal * 100, // Stripe expects amounts in cents
                },
                quantity: 1,
            }],
            payment_intent_data: {
                application_fee_amount: companyFee,
                transfer_data: {
                    destination: userStripeAccountId,
                },
            },
            mode: 'payment',
            success_url: `${req.headers.origin}/payments/success`,
            cancel_url: `${req.headers.origin}/payments/canceled`,
            customer_email: userEmail, // Ensure you get this from your authenticated session
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
