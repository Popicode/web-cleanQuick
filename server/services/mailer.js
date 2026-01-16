import nodemailer from 'nodemailer'

export function validateSMTPConfig() {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const secure = process.env.SMTP_SECURE;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const mailTo = process.env.MAIL_TO;
    const mailFrom = process.env.MAIL_FROM;

    const missingVars = [];

    if (!host) missingVars.push('SMTP_HOST');
    if (!port) missingVars.push('SMTP_PORT');
    if (!secure) missingVars.push('SMTP_SECURE');
    if (!user) missingVars.push('SMTP_USER');
    if (!pass) missingVars.push('SMTP_PASS');
    if (!mailTo) missingVars.push('MAIL_TO');
    if (!mailFrom && !user) missingVars.push('MAIL_FROM o SMTP_USER');

    if (missingVars.length > 0) {
        throw new Error(`Faltan variables de entorno SMTP: ${missingVars.join(', ')}\nRevisa tu archivo .env`);
    }

    console.log('Configuración SMTP validada correctamente');
}

export async function createTransporter() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT);
    const secure = process.env.SMTP_SECURE === 'true';
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    return nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass }
    });
}