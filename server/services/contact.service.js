import { createTransporter } from '../services/mailer.js'

export async function procesarSolicitudContacto(data) {
    const transporter = await createTransporter();

    const to = process.env.MAIL_TO;
    const from = process.env.MAIL_FROM || process.env.SMTP_USER; // usa uno o usa el otro

    if (!to) {
        throw new Error('Error, falta MAIL_TO en el entorno (.env)')
    }

    const subject = `Nueva solicitud ${data.servicios}`
    const text = buildText(data);
    const html = buildHtml(data);

    const info = await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html
    });

    return {
        ok: true,
        id: info.messageId
    };
}

function buildText(data) {
    return [
        'Nueva solicitud de CleanQuick',
        `Nombre : ${data.name}`,
        `Email : ${data.email}`,
        `Tel : ${data.tel}`,
        `Servicio : ${data.servicios}`
    ].join("\n")
};

function buildHtml(data) {
    return `
            <h2> Nueva solicitud de CleanQuick </h2>
            <ul>
                <li><strong>Nombre:</strong> ${scapeHtml(data.name)}</li>
                <li><strong>Email:</strong> ${scapeHtml(data.email)}</li>
                <li><strong>Teléfono:</strong> ${scapeHtml(data.tel || "No informado")}</li>
                <li><strong>Servicio:</strong> ${scapeHtml(data.servicios)}</li>
            </ul>
        `;
}

// evitamos html inyectado
function scapeHtml(str) {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

