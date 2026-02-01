export default function validateEnv() {
    const nodeEnv = process.env.NODE_ENV || 'production';

    const requiredInProd = [
        "CORS_ORIGIN",
        "RESEND_API_KEY",
        "MAIL_FROM",
        "MAIL_TO",
    ];

    if (nodeEnv === 'production') {
        const missing = requiredInProd.filter((k) => !process.env[k] || !process.env[k].trim())

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
    }

    return nodeEnv;

}