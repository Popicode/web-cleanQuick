import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export function validateSMTPConfig() {
    const apiKey = process.env.RESEND_API_KEY;
    const mailTo = process.env.MAIL_TO;
    const mailFrom = process.env.MAIL_FROM;

    const missingVars = [];

    if (!apiKey) missingVars.push('RESEND_API)KEY');
    if (!mailTo) missingVars.push('MAIL_TO');
    if (!mailFrom) missingVars.push('MAIL_FROM');

    if (missingVars.length > 0) {
        throw new Error(`Faltan variables de entorno: ${missingVars.join(', ')}\nRevisa tu archivo .env`);
    }

    console.log('Configuración de Resend validada correctamente');
}

export async function sendEmail({ from, to, subject, text, html }) {
    const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        text,
        html
    });

    if (error) {
        throw error;
    }
    return data;
};