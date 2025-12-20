// src/pages/[lang]/api/contact.ts
import type { APIRoute } from 'astro';

const translations = {
  es: {
    success: '¡Mensaje enviado! Te contactaremos pronto.',
    error: 'Error al enviar. Por favor, inténtalo de nuevo.',
    invalidEmail: 'Email inválido.',
    missingFields: 'Por favor, completa todos los campos obligatorios.',
    turnstileFailed: 'Verificación de seguridad fallida. Por favor, inténtalo de nuevo.',
  },
  ca: {
    success: 'Missatge enviat! Et contactarem aviat.',
    error: 'Error en enviar. Si us plau, torna-ho a provar.',
    invalidEmail: 'Email invàlid.',
    missingFields: 'Si us plau, completa tots els camps obligatoris.',
    turnstileFailed: 'Verificació de seguretat fallida. Si us plau, torna-ho a provar.',
  },
  en: {
    success: 'Message sent! We will contact you soon.',
    error: 'Error sending. Please try again.',
    invalidEmail: 'Invalid email.',
    missingFields: 'Please complete all required fields.',
    turnstileFailed: 'Security verification failed. Please try again.',
  },
};

// Verify Turnstile token with Cloudflare
async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secretKey = import.meta.env.TURNSTILE_SECRET_KEY;

  // Skip verification in development if no secret key
  if (!secretKey) {
    console.log('Turnstile: No secret key configured, skipping verification');
    return true;
  }

  try {
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (ip) formData.append('remoteip', ip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json() as { success: boolean; 'error-codes'?: string[] };

    if (!data.success) {
      console.error('Turnstile verification failed:', data['error-codes']);
    }

    return data.success;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

// Simple email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST: APIRoute = async ({ request, params }) => {
  const lang = (params.lang as keyof typeof translations) || 'es';
  const t = translations[lang] || translations.es;

  try {
    const formData = await request.formData();

    const name = formData.get('name')?.toString().trim() || '';
    const company = formData.get('company')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const phone = formData.get('phone')?.toString().trim() || '';
    const projectType = formData.get('projectType')?.toString() || '';
    const serviceType = formData.get('serviceType')?.toString() || '';
    const message = formData.get('message')?.toString().trim() || '';
    const privacy = formData.get('privacy');
    const turnstileToken = formData.get('cf-turnstile-response')?.toString() || '';

    // Verify Turnstile token
    const clientIp = request.headers.get('CF-Connecting-IP');
    const turnstileValid = await verifyTurnstile(turnstileToken, clientIp);
    if (!turnstileValid) {
      return new Response(
        `<div class="p-4 bg-red-50 border border-red-200 text-red-800 rounded">${t.turnstileFailed}</div>`,
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Validate required fields
    if (!name || !email || !projectType || !serviceType || !privacy) {
      return new Response(
        `<div class="p-4 bg-red-50 border border-red-200 text-red-800 rounded">${t.missingFields}</div>`,
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Validate email
    if (!isValidEmail(email)) {
      return new Response(
        `<div class="p-4 bg-red-50 border border-red-200 text-red-800 rounded">${t.invalidEmail}</div>`,
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Send email via Resend (if configured) or log for now
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    const CONTACT_EMAIL = import.meta.env.CONTACT_EMAIL || 'info@senshac.com';

    if (RESEND_API_KEY) {
      const emailBody = `
Nuevo mensaje de contacto desde senshac.com

Nombre: ${name}
Empresa: ${company || 'No especificada'}
Email: ${email}
Teléfono: ${phone || 'No especificado'}
Tipo de proyecto: ${projectType}
Tipo de servicio: ${serviceType}
Mensaje: ${message || 'Sin mensaje adicional'}
Idioma: ${lang}
      `.trim();

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Senshac Web <noreply@senshac.com>',
          to: CONTACT_EMAIL,
          reply_to: email,
          subject: `Nuevo contacto: ${name} - ${projectType}`,
          text: emailBody,
        }),
      });

      if (!res.ok) {
        console.error('Resend API error:', await res.text());
        return new Response(
          `<div class="p-4 bg-red-50 border border-red-200 text-red-800 rounded">${t.error}</div>`,
          { status: 500, headers: { 'Content-Type': 'text/html' } }
        );
      }
    } else {
      // Log to console if no email service configured
      console.log('Contact form submission:', { name, company, email, phone, projectType, serviceType, message, lang });
    }

    // Return success HTML that HTMX will swap in
    return new Response(
      `<div class="p-6 bg-green-50 border border-green-200 text-green-800 rounded text-center">
        <svg class="w-12 h-12 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <p class="text-lg font-medium">${t.success}</p>
      </div>`,
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      `<div class="p-4 bg-red-50 border border-red-200 text-red-800 rounded">${t.error}</div>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
};

// Reject other methods
export const ALL: APIRoute = () => {
  return new Response('Method not allowed', { status: 405 });
};
