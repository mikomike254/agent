// Email Sending via Resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailService = {
    /**
     * Send payment receipt email
     */
    async sendPaymentReceipt(
        to: string,
        projectTitle: string,
        amount: number,
        currency: string,
        txId: string
    ) {
        return await resend.emails.send({
            from: 'Tech Developers <noreply@techdev.ke>',
            to,
            subject: `Payment Received - ${projectTitle}`,
            html: `
        <h2>Payment Received</h2>
        <p>We've received your deposit of ${currency} ${amount}.</p>
        <p>It is held in escrow and will be verified by an admin shortly.</p>
        <p><strong>Transaction ID:</strong> ${txId}</p>
        <p><strong>Project:</strong> ${projectTitle}</p>
        <p>You'll be notified once work begins.</p>
        <br/>
        <p>Questions? Contact support@techdev.ke</p>
      `
        });
    },

    /**
     * Send deposit verified email
     */
    async sendDepositVerified(
        to: string,
        projectTitle: string,
        firstMilestoneDate?: string
    ) {
        return await resend.emails.send({
            from: 'Tech Developers <noreply@techdev.ke>',
            to,
            subject: `Deposit Verified - Work Started`,
            html: `
        <h2>Deposit Verified - Work Has Started</h2>
        <p>Your deposit has been verified and held in escrow.</p>
        <p><strong>Project:</strong> ${projectTitle}</p>
        ${firstMilestoneDate ? `<p>Expect the first demo on <strong>${firstMilestoneDate}</strong></p>` : ''}
        <p>You can track progress in your dashboard.</p>
        <br/>
        <p><a href="https://techdev.ke/dashboard/client">View Dashboard</a></p>
      `
        });
    },

    /**
     * Send milestone ready email
     */
    async sendMilestoneReady(
        to: string,
        projectTitle: string,
        milestoneName: string,
        demoLink?: string
    ) {
        return await resend.emails.send({
            from: 'Tech Developers <noreply@techdev.ke>',
            to,
            subject: `Milestone Ready: ${milestoneName}`,
            html: `
        <h2>A New Milestone is Ready</h2>
        <p><strong>Project:</strong> ${projectTitle}</p>
        <p><strong>Milestone:</strong> ${milestoneName}</p>
        ${demoLink ? `<p><a href="${demoLink}">View Demo</a></p>` : ''}
        <p>Log in to your dashboard to approve and continue.</p>
        <br/>
        <p><a href="https://techdev.ke/dashboard/client">Go to Dashboard</a></p>
      `
        });
    },

    /**
     * Send intake link to client
     */
    async sendIntakeLink(
        to: string,
        commissionerName: string,
        intakeLink: string
    ) {
        return await resend.emails.send({
            from: 'Tech Developers <noreply@techdev.ke>',
            to,
            subject: `Your Project Link from ${commissionerName}`,
            html: `
        <h2>Start Your Project</h2>
        <p>${commissionerName} has created a project page for you.</p>
        <p>Click below to review the details and either schedule a call or pay the 43% deposit to begin:</p>
        <br/>
        <p><a href="${intakeLink}" style="padding: 12px 24px; background: #1f7a5a; color: white; text-decoration: none; border-radius: 6px;">Open Project Page</a></p>
        <br/>
        <p>Your deposit is protected by escrow and comes with a 110% refund guarantee.</p>
      `
        });
    }
};
