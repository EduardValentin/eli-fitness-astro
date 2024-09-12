const {
    EMAIL_PROVIDER_CLIENT_ID,
    EMAIL_PROVIDER_SECRET_KEY,
    FROM_EMAIL_ADDR,
    FROM_NAME,
} = import.meta.env;

import Mailjet from 'node-mailjet';

const mailjet = Mailjet.apiConnect(
    EMAIL_PROVIDER_CLIENT_ID,
    EMAIL_PROVIDER_SECRET_KEY
);

export type Variables = { [k: string]: string };

type Attachment = {
    Filename: string;
    ContentType: string;
    Base64Content: string;
};

type SendEmailArgs = {
    templateID: string;
    to: string;
    toName?: string;
    subject: string;
    variables?: Variables;
    attachments?: Attachment[];
};

export async function sendEmail(args: SendEmailArgs) {
    const {
        templateID,
        to,
        toName,
        subject,
        variables = {},
        attachments = [],
    } = args;

    return await mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: FROM_EMAIL_ADDR,
                    Name: FROM_NAME,
                },
                To: [
                    {
                        Email: to,
                        Name: toName,
                    },
                ],
                Subject: subject,
                Variables: variables,
                TemplateID: parseInt(templateID, 10),
                Attachments: attachments,
                TemplateLanguage: true,
            },
        ],
    });
}
