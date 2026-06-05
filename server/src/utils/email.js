/**
 * Email utility using Nodemailer
 * Sends notification emails for contact form submissions
 *
 * To enable: add nodemailer to package.json and configure SMTP env vars
 */

let transporter = null;

// Lazy-load nodemailer only if configured
function getTransporter() {
  if (transporter) return transporter;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  try {
    const nodemailer = require('nodemailer');
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    return transporter;
  } catch {
    return null;
  }
}

/**
 * Send contact form notification to admin
 */
async function sendContactNotification({ name, email, subject, message }) {
  const transport = getTransporter();
  if (!transport) {
    console.log('📧 Email not configured — skipping notification');
    return;
  }

  const adminEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

  await transport.sendMail({
    from: `"BK Engineering Website" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `[Contact] ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0F172A; padding: 24px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #F59E0B; margin: 0;">Nouveau Message — BK Engineering</h2>
        </div>
        <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 100px;">De :</td>
              <td style="padding: 8px 0; color: #6b7280;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email :</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #F59E0B;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Sujet :</td>
              <td style="padding: 8px 0; color: #6b7280;">${subject}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <h3 style="color: #374151; margin-top: 0;">Message :</h3>
          <p style="color: #6b7280; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <a href="mailto:${email}?subject=Re: ${subject}" 
             style="display: inline-block; background: #F59E0B; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            Répondre
          </a>
        </div>
        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">
          BK Engineering Group — Goma, Nord-Kivu, RDC
        </p>
      </div>
    `,
  });
}

/**
 * Send auto-reply to the person who submitted the form
 */
async function sendContactAutoReply({ name, email, subject }) {
  const transport = getTransporter();
  if (!transport) return;

  await transport.sendMail({
    from: `"BK Engineering Group" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Votre message a bien été reçu — BK Engineering`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0F172A; padding: 24px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #F59E0B; margin: 0;">BK Engineering Group</h2>
        </div>
        <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
          <p style="color: #374151;">Bonjour <strong>${name}</strong>,</p>
          <p style="color: #6b7280; line-height: 1.6;">
            Nous avons bien reçu votre message concernant "<strong>${subject}</strong>".
            Notre équipe vous répondra dans les plus brefs délais (généralement sous 24-48h ouvrables).
          </p>
          <p style="color: #6b7280; line-height: 1.6;">
            En attendant, n'hésitez pas à consulter notre site pour en savoir plus sur nos services et projets.
          </p>
          <p style="color: #374151; margin-top: 24px;">
            Cordialement,<br/>
            <strong>L'équipe BK Engineering Group</strong><br/>
            <span style="color: #9ca3af; font-size: 14px;">Goma, Nord-Kivu, RDC</span>
          </p>
        </div>
      </div>
    `,
  });
}

module.exports = { sendContactNotification, sendContactAutoReply };
