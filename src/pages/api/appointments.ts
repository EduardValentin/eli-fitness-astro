import type { APIRoute } from 'astro';
import { sendEmail } from '../../services/email-service';
import * as appointmentRepository from '../../repositories/appointment-repository';
import { makeJSONResponse } from '../../utils/http';
import schema from '../../components/preact/ServicesCard/schema';
import { verifySolution } from 'altcha-lib';

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

const {
    APPOINTMENT_REQUEST_TEMPLATE_ID,
    APPOINTMENT_EMAIL_NOTIFICATION_ADDR,
    ALTCHA_API_SECRET,
} = import.meta.env;

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();

    if (!validateBody(body)) {
        return makeJSONResponse(
            { status: 'invalid_body', message: 'Invalid parameters' },
            400
        );
    }

    let lastInserted = null;

    try {
        if (await verifySolution(body.altcha, ALTCHA_API_SECRET)) {
            const dbInsert = await appointmentRepository.create(body);
            lastInserted = dbInsert[0];

            console.info(
                '[DEBUG] inserted appointment with id: ',
                lastInserted?.id
            );

            const res = await sendEmail({
                templateID: APPOINTMENT_REQUEST_TEMPLATE_ID,
                subject: 'New Appointment Requested',
                to: APPOINTMENT_EMAIL_NOTIFICATION_ADDR,
                variables: body,
            });

            if (res.response.status < 200 || res.response.status >= 300) {
                console.info(
                    '[DEBUG]: email send request returned with: ',
                    res
                );
                return error();
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
        return error();
    }
    return makeJSONResponse(lastInserted, 201);
};

function rollback(err: unknown, lastInsertedId?: string | null) {
    console.error('[ERROR] error sending the appointment request email', err);

    if (!lastInsertedId) {
        console.error('[ERROR] Last inserted appointment id not present');
    } else {
        appointmentRepository.deleteById(lastInsertedId);
    }
}

function error() {
    return makeJSONResponse(
        {
            code: 'email_sending_failed',
            message: 'There was an error with sending the email.',
        },
        500
    );
}
