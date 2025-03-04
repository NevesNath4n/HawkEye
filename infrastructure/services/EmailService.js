import NodeMailer from 'nodemailer';
import { MailtrapClient, MailtrapTransport } from 'mailtrap';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export default class EmailService {
    constructor(sender,name){
        this.client = new MailtrapClient({
            token: process.env.MAILTRAP_API_TOKEN,
            testInboxId: process.env.MAILTRAP_TEST_INBOX_ID
        });
        this.sender = sender;
        this.name = name;

    }
    
    async sendEmail(recipientEmail,subject, message,template) {
        await this.client.testing.send({
            from:this.sender,
            to:recipientEmail,
            subject,
            html:template.replace("%message%",message)
        });
    }
}