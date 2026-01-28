// Webhook: Stripe Payment Events
import { NextRequest, NextResponse } from 'next/server';
import { stripePayments } from '@/lib/payments/stripe';
import { supabaseAdmin, db } from '@/lib/db';
import { createEscrowHold } from '@/lib/escrow';
import { emailService } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const signature = request.headers.get('stripe-signature')!;

        // Verify webhook signature
        const event = stripePayments.verifyWebhook(Buffer.from(body), signature);

        // Handle payment success
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as any;
            const projectId = session.metadata.project_id;

            // Find payment record
            const { data: payment } = await supabaseAdmin
                .from('payments')
                .select('*')
                .eq('project_id', projectId)
                .eq('gateway', 'stripe')
                .eq('status', 'pending_verification')
                .single();

            if (payment) {
                // Update payment with tx details
                await supabaseAdmin
                    .from('payments')
                    .update({
                        tx_hash: session.payment_intent,
                        raw_payload: event.data.object,
                        status: 'pending_verification' // Awaits admin verification
                    })
                    .eq('id', payment.id);

                // Create audit log
                await db.createAuditLog(
                    payment.payer_id || projectId,
                    'client',
                    'payment_webhook_received',
                    { payment_id: payment.id, gateway: 'stripe', event_type: event.type }
                );

                // Notify admin (in-app notification)
                const { data: admins } = await supabaseAdmin
                    .from('users')
                    .select('id')
                    .eq('role', 'admin');

                if (admins) {
                    for (const admin of admins) {
                        await db.createNotification(
                            admin.id,
                            'in_app',
                            'New Payment Pending Verification',
                            `Payment of ${payment.currency} ${payment.amount} via Stripe needs verification`
                        );
                    }
                }
            }
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('Stripe webhook error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}
