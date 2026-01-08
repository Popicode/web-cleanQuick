import nodemailer from 'nodemailer'

export async function createTransporter() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT);
    const secure = process.env.SMTP_SECURE === 'true';
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;


    if (!host || !port || !secure || !user || !pass) {
        throw new Error('Faltan variables de entorno en (.env)')
    }

    return nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass }
    });
}