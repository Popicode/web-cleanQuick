export default function validateEnv() {
    const nodeEnv = process.env.NODE_ENV || 'production';

    const requiredInProd = [
        "CORS_ORIGIN",
        "SMTP_HOST",
        "SMTP_PORT",
        "SMTP_USER",
        "SMTP_PASS",
        "MAIL_FROM",
        "MAIL_TO",
    ];

    if (nodeEnv === 'production') {
        const missing = requiredInProd.filter((k) => !process.env[k]) || !process.env[k].trim()

        if (missing.length > 0) {
            throw new Error(`Variables de entornos faltantes: ${missing.join(",")}`)
        }

        const origins = process.env.CORS_ORIGIN
            .split(',')
            .map((o) => o.trim())
            .filter(Boolean);

        if (!origins.length) {
            throw new Error('CORS_ORIGIN esta vacio')
        }

        const port = Number(process.env.SMTP_PORT)
        if (!Number.isFinite(port)) {
            throw new Error('SMTP_PORT no es un número valido de puerto')
        }

        const secureRaw = (process.env.SMTP_SECURE || '').toLowerCase();
        if (secureRaw && secureRaw !== 'true' && secureRaw !== 'false') {
            throw new Error('SMTP_SECURE solo puede ser "true" or "false"')
        }
    }

    return nodeEnv;

}