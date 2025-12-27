import { Resend } from 'resend';

export class EmailService {
    private static resend = new Resend(process.env.RESEND_API_KEY || 're_123'); // Fallback to avoid crash if env missing

    static async sendWelcomeEmail(to: string, name: string) {
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY is missing. Skipping email.');
            return;
        }

        try {
            await this.resend.emails.send({
                from: 'onboarding@resend.dev',
                to,
                subject: 'Welcome to ApniSec - Access Granted',
                html: `
                    <h1>Welcome, ${name}</h1>
                    <p>Your access to the Secure Command Center has been authorized.</p>
                    <p>You can now log in and monitor your digital assets.</p>
                    <p>Role: Operative</p>
                    <br/>
                    <a href="http://localhost:3000/login">Login Console</a>
                `,
            });
        } catch (error) {
            console.error('Failed to send welcome email:', error);
        }
    }

    static async sendIssueCreated(to: string, issueId: string, title: string) {
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY is missing. Skipping email.');
            return;
        }

        try {
            const response = await this.resend.emails.send({
                from: 'onboarding@resend.dev', // ONLY works for your verified email in testing
                to,
                subject: `New Issue Created: ${title}`,
                html: `<p>A new issue has been reported.</p><p><strong>ID:</strong> ${issueId}</p><p><strong>Title:</strong> ${title}</p>`,
            });

            if (response.error) {
                console.error('Resend API Error:', response.error);
            }

        } catch (error) {
            console.error('Failed to send email:', error);
            // Graceful degradation: Do not throw
        }
    }
}
