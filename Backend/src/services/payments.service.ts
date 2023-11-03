import { Injectable } from "@nestjs/common";
import { Request } from "express";
import Stripe from "stripe";
import 'dotenv/config';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

@Injectable()
export class PaymentsService {
    constructor() { }

    async createCheckoutSession(request: Request) {
        const host = request.get('host');
        return await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1O82vOGSS5FaNGjd54C2HjjO',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${request.protocol}://${host}/v1/payments/checkout?success=true`,
            cancel_url: `${request.protocol}://${host}/v1/payments/checkout?canceled=true`,
            automatic_tax: { enabled: true },
        });
    }
}