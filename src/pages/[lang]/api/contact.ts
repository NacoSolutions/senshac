// src/pages/[lang]/api/contact.ts
export const prerender = false;

import { getEntry } from "astro:content";
import type { APIRoute } from "astro";

// Verify Turnstile token with Cloudflare
async function verifyTurnstile(
	token: string,
	ip: string | null,
): Promise<boolean> {
	const secretKey = import.meta.env.TURNSTILE_SECRET_KEY;

	// Fail closed if production secret is absent
	if (!secretKey) {
		if (import.meta.env.PROD) {
			console.error(
				"Turnstile: Missing secret key in production. Failing closed.",
			);
			return false;
		}
		console.log(
			"Turnstile: No secret key configured in dev, skipping verification",
		);
		return true;
	}

	try {
		const formData = new FormData();
		formData.append("secret", secretKey);
		formData.append("response", token);
		if (ip) formData.append("remoteip", ip);

		const res = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				body: formData,
			},
		);

		const data = (await res.json()) as {
			success: boolean;
			"error-codes"?: string[];
		};

		if (!data.success) {
			console.error("Turnstile verification failed:", data["error-codes"]);
		}

		return data.success;
	} catch (error) {
		console.error("Turnstile verification error:", error);
		return false;
	}
}

// Simple email validation
function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST: APIRoute = async ({ request, params, locals }) => {
	const lang = params.lang || "es";

	// Get translations from content collection
	const translations = await getEntry("translations", lang);
	if (!translations) {
		return new Response("Translations not found", { status: 500 });
	}
	const t = translations.data.contactForm;

	const isHtmx = request.headers.get("HX-Request") === "true";
	const referer = request.headers.get("Referer") || `/${lang}/contact`;

	// Helper to send either HTMX fragment or redirect for progressive enhancement
	const sendResponse = (
		fragment: string,
		status: number,
		errorKey?: string,
		isSuccess = false,
	) => {
		if (isHtmx) {
			return new Response(fragment, {
				status: 200, // Always 200 for HTMX to ensure it swaps the feedback
				headers: { "Content-Type": "text/html" },
			});
		}

		// For ordinary non-HTMX requests, redirect back with state in URL
		const url = new URL(referer, request.url);
		if (isSuccess) {
			url.searchParams.set("contact_success", "1");
		} else if (errorKey) {
			url.searchParams.set("contact_error", errorKey);
		}
		return Response.redirect(url.toString(), 303);
	};

	try {
		const formData = await request.formData();

		const name = formData.get("name")?.toString().trim() || "";
		const company = formData.get("company")?.toString().trim() || "";
		const email = formData.get("email")?.toString().trim() || "";
		const phone = formData.get("phone")?.toString().trim() || "";
		const projectType = formData.get("projectType")?.toString() || "";
		const serviceType = formData.get("serviceType")?.toString() || "";
		const message = formData.get("message")?.toString().trim() || "";
		const privacy = formData.get("privacy");
		const turnstileToken =
			formData.get("cf-turnstile-response")?.toString() || "";

		// Verify Turnstile token
		const clientIp = request.headers.get("CF-Connecting-IP");
		const turnstileValid = await verifyTurnstile(turnstileToken, clientIp);
		if (!turnstileValid) {
			return sendResponse(
				`<div class="p-4 bg-red-50 border border-red-200 text-red-800 rounded">${t.turnstileFailed}</div>`,
				400,
				"turnstileFailed",
			);
		}

		// Validate required fields
		if (!name || !email || !projectType || !serviceType || !privacy) {
			return sendResponse(
				`<div class="p-4 bg-red-50 border border-red-200 text-red-800 rounded">${t.missingFields}</div>`,
				400,
				"missingFields",
			);
		}

		// Validate email
		if (!isValidEmail(email)) {
			return sendResponse(
				`<div class="p-4 bg-red-50 border border-red-200 text-red-800 rounded">${t.invalidEmail}</div>`,
				400,
				"invalidEmail",
			);
		}

		// Send email via Cloudflare Email Routing
		const EMAIL = (locals as any)?.runtime?.env?.EMAIL;
		const CONTACT_EMAIL = import.meta.env.CONTACT_EMAIL || "info@senshac.com";

		if (EMAIL) {
			const emailBodyText = `
Nuevo mensaje de contacto desde senshac.com

Nombre: ${name}
Empresa: ${company || "No especificada"}
Email: ${email}
Teléfono: ${phone || "No especificado"}
Tipo de proyecto: ${projectType}
Tipo de servicio: ${serviceType}
Mensaje: ${message || "Sin mensaje adicional"}
Idioma: ${lang}
			`.trim();

			const emailBodyHtml = `
<p>Nuevo mensaje de contacto desde senshac.com</p>
<p>
<strong>Nombre:</strong> ${name}<br>
<strong>Empresa:</strong> ${company || "No especificada"}<br>
<strong>Email:</strong> ${email}<br>
<strong>Teléfono:</strong> ${phone || "No especificado"}<br>
<strong>Tipo de proyecto:</strong> ${projectType}<br>
<strong>Tipo de servicio:</strong> ${serviceType}<br>
<strong>Mensaje:</strong><br>
${message.replace(/\n/g, '<br>') || "Sin mensaje adicional"}<br>
<strong>Idioma:</strong> ${lang}
</p>
			`.trim();

			try {
				await EMAIL.send({
					to: CONTACT_EMAIL,
					from: { email: "noreply@senshac.com", name: "Senshac Web" },
					replyTo: email,
					subject: `Nuevo contacto: ${name} - ${projectType}`,
					text: emailBodyText,
					html: emailBodyHtml,
				});
			} catch (error) {
				console.error("Cloudflare Email API error:", error);
				console.error("Failed submission data:", {
					name,
					company,
					email,
					phone,
					projectType,
					serviceType,
					message,
					lang,
				});
				return sendResponse(
					`<div class="p-4 bg-red-50 border border-red-200 text-red-800 rounded">${t.error}</div>`,
					500,
					"error",
				);
			}
		} else {
			// Log to console if no email service configured
			console.warn(
				"Contact form received but EMAIL WAS NOT SENT because Cloudflare EMAIL binding is missing. (Did you add it to wrangler.jsonc?)",
			);
			console.log("Contact form submission payload:", {
				name,
				company,
				email,
				phone,
				projectType,
				serviceType,
				message,
				lang,
			});
		}

		// Return success HTML that HTMX will swap into feedback, and remove the form
		return sendResponse(
			`<div class="p-6 bg-green-50 border border-green-200 text-green-800 rounded text-center">
        <svg class="w-12 h-12 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <p class="text-lg font-medium">${t.success}</p>
      </div>
      <form id="contact-form" hx-swap-oob="outerHTML"></form>`,
			200,
			undefined,
			true,
		);
	} catch (error) {
		console.error("Contact form error:", error);
		return sendResponse(
			`<div class="p-4 bg-red-50 border border-red-200 text-red-800 rounded">${t.error}</div>`,
			500,
			"error",
		);
	}
};

// Reject other methods
export const ALL: APIRoute = () => {
	return new Response("Method not allowed", { status: 405 });
};
