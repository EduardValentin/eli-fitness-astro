import type { APIRoute } from 'astro';
import { sendEmail } from '../../services/email-service';
import * as eBookRequestsRepository from '../../repositories/ebook-request-repository';
import { makeJSONResponse } from '../../utils/http';
import { readFileSync } from 'fs';
import { verifySolution } from 'altcha-lib';
import schema from '../ebook/preact/EBookRequestForm/schema';
import { resolve } from 'path';

const validateBody = (body: Record<string, unknown>) => {
    if (!body.altcha) {
        return false;
    }
    try {
        schema.validateSync(body);
        return true;
    } catch (e) {
        return false;
    }
};

const { EBOOK_EMAIL_TEMPLATE_ID, ALTCHA_API_SECRET } = import.meta.env;

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();

    if (!validateBody(body)) {
        return makeJSONResponse(
            { status: 'invalid_body', message: 'Invalid parameters' },
            400
        );
    }

    const { email, name, altcha } = body;
    let lastInserted = null;
    try {
        if (await verifySolution(altcha, ALTCHA_API_SECRET)) {
            const dbInsert = await eBookRequestsRepository.create(body);
            lastInserted = dbInsert[0];

            const res = await sendEBookMail(email, name);
            if (res.response.status < 200 || res.response.status >= 300) {
                console.info('[ERROR]: Email sending failed', res);
                return emailSendingError();
            }
        } else {
            console.log('[WARN] Captcha verification failed');
            return makeJSONResponse(
                {
                    status: 'captcha_failed',
                    message: 'Captcha verification failed',
                },
                401
            );
        }
    } catch (e) {
        rollback(e, lastInserted?.id);
        return emailSendingError();
    }
    return makeJSONResponse(lastInserted, 200);
};
async function sendEBookMail(email: string, name: string) {
    const file = readFileSync(resolve(__dirname, '../ggg.pdf'), {
        encoding: 'base64',
    });
    return await sendEmail({
        templateID: EBOOK_EMAIL_TEMPLATE_ID,
        to: email,
        toName: name,
        subject: 'Your Glute Growth Guide E-Book',
        variables: {
            name,
        },
        attachments: [
            {
                Filename: 'glute-growth-guide.pdf',
                ContentType: 'application/pdf',
                Base64Content: file,
            },
        ],
    });
}
function rollback(err: unknown, lastInsertedId?: string | null) {
    console.error('[ERROR] error sending the ebook request email', err);
    if (!lastInsertedId) {
        console.error('[ERROR] Last inserted ebook request id not present');
    } else {
        eBookRequestsRepository.deleteById(lastInsertedId);
    }
}

function emailSendingError() {
    return makeJSONResponse(
        {
            status: 'email_failed',
            message: 'Email sending failed.',
        },
        500
    );
}
