// Stripe Payment Integration
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia'
});

export const stripePayments = {
    /**
     * Create a checkout session for deposit payment
     */
    async createCheckoutSession(
        projectId: string,
        amount: number,
        currency: string = 'KES',
        successUrl: string,
        cancelUrl: string
    ) {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency.toLowerCase(),
                        product_data: {
                            name: 'Project Deposit (43%)',
                            description: `Deposit for project ${projectId}`
                        },
                        unit_amount: Math.round(amount * 100) // Convert to cents
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                project_id: projectId,
                payment_type: 'deposit'
            }
        });

        return session;
    },

    /**
     * Verify webhook signature
     */
    verifyWebhook(payload: Buffer, signature: string): Stripe.Event {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
        return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    },

    /**
     * Issue refund (110% logic handled separately)
     */
    async createRefund(paymentIntentId: string, amount?: number) {
        return await stripe.refunds.create({
            payment_intent: paymentIntentId,
            amount: amount ? Math.round(amount * 100) : undefined
        });
    }
};
