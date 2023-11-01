import { Injectable } from "@nestjs/common";
import { Body, Destination, SendEmailCommandInput, SES } from '@aws-sdk/client-ses';
import { Address } from "aws-sdk/clients/ses";
import 'dotenv/config';

const sesConnection = new SES({ region: process.env.AWS_REGION });

@Injectable()
export class EmailService {
    constructor() {}

    async sendEmail(destination: Destination, sender: Address, subject: string, body: Body) {
        let emailParams: SendEmailCommandInput = {
            Destination: destination,
            Message: {
                Body: body,
                Subject: { Data: subject },
            },
            Source: sender
        };
        return await sesConnection.sendEmail(emailParams)
    }
}