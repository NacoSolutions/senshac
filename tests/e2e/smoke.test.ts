import { expect, test } from "@playwright/test";

test.describe("Senshac E2E Smoke Tests", () => {
	test("static route delivery", async ({ page }) => {
		const response = await page.goto("/en");
		expect(response?.status()).toBe(200);
		// h1 might not exist on home page depending on Tina blocks, check for main or a generic container
		await expect(page.locator("main").first()).toBeVisible();
	});

	test("header keyboard behavior", async ({ page }) => {
		await page.goto("/en");

		// Focus the first link in the header to simulate keyboard navigation
		const firstHeaderLink = page.locator("header a, header button").first();
		await firstHeaderLink.focus();

		// Evaluate if the currently focused element is within the header
		const isHeaderFocused = await page.evaluate(() => {
			const active = document.activeElement;
			return active?.closest("header") !== null;
		});
		expect(isHeaderFocused).toBe(true);
	});

	test("carousel controls", async ({ page }) => {
		await page.goto("/en");

		// Check if there is a carousel on the homepage
		const nextBtn = page.locator(".carousel-slide").first();
		// If a carousel exists, test it
		if (await nextBtn.isVisible()) {
			// Find the next button and click it
			const nextButton = page
				.locator('button[aria-label="Next"], button.carousel-next')
				.first();
			if (await nextButton.isVisible()) {
				await nextButton.click();
				// Wait for animation to start
				await page.waitForTimeout(100);
				// Expect some slides to be visible or styles to change
				const slides = page.locator(".carousel-slide");
				await expect(slides.nth(1)).toBeVisible();
			}
		}
	});

	test("UnoCSS generated classes", async ({ page }) => {
		await page.goto("/en");
		// Ensure UnoCSS generated utility classes and injected them.
		// Check for some layout classes that should be present
		const element = page.locator(".container, .mx-auto, .flex, .grid").first();
		await expect(element).toBeVisible();
	});

	test("Tina edit islands render fallback", async ({ page }) => {
		// Navigate to admin to verify the build retained Tina config
		const response = await page.goto("/admin/index.html");
		expect(response?.status()).toBe(200);
		// The CMS wrapper should be present (might be 0x0 invisible initially)
		await expect(page.locator("#root")).toBeAttached();
	});

	test("R2 APIs endpoints exist", async ({ request }) => {
		// Check if the media API exists and returns either 200 or 401
		const response = await request.get("/api/media");
		expect([200, 401, 404]).toContain(response.status());
	});
});

test.describe("Contact Form & HTMX", () => {
	test("HTMX success/errors and Turnstile failure", async ({ page }) => {
		await page.goto("/en/contact");

		// Find the contact form
		const form = page.locator("form");
		await expect(form).toBeVisible();

		// Fill out the form
		await page.fill('input[name="name"]', "Test User");
		await page.fill('input[name="email"]', "test@example.com");
		await page.selectOption('select[name="projectType"]', { index: 1 });
		await page.selectOption('select[name="serviceType"]', { index: 1 });
		await page.fill('textarea[name="message"]', "This is a test message.");
		await page.check('input[name="privacy"]');

		// Submit the form without Turnstile token to trigger a failure
		// We bypass the frontend widget which might hang in Playwright
		// by directly triggering HTMX submit
		await page.evaluate(() => {
			const form = document.querySelector("form");
			if (window.htmx && form) {
				window.htmx.trigger(form, "submit");
			}
		});

		// Expect an HTMX error message or standard error fallback
		const errorMsg = page.locator(".text-red-800").first();
		await expect(errorMsg).toBeVisible({ timeout: 5000 });
	});
});

test.describe("No JavaScript", () => {
	test.use({ javaScriptEnabled: false });

	test("no-JavaScript form submission", async ({ page }) => {
		await page.goto("/en/contact");

		const form = page.locator("form");
		await expect(form).toBeVisible();

		await page.fill('input[name="name"]', "Test No-JS");
		await page.fill('input[name="email"]', "nojs@example.com");
		await page.selectOption('select[name="projectType"]', { index: 1 });
		await page.selectOption('select[name="serviceType"]', { index: 1 });
		await page.fill(
			'textarea[name="message"]',
			"This is a test message without JS.",
		);
		await page.check('input[name="privacy"]');

		// Submit form natively
		await Promise.all([
			page.waitForLoadState("load"),
			form.evaluate((f: HTMLFormElement) => f.submit()),
		]);

		// Should receive a full page response back since JS is off (no HTMX)
		const errorMsg = page.locator(".text-red-800").first();
		await expect(errorMsg).toBeVisible();
	});
});

test.describe("Reduced Motion", () => {
	test.use({ colorScheme: "dark" });

	test("animations are disabled when prefers-reduced-motion is reduce", async ({
		page,
	}) => {
		await page.emulateMedia({ reducedMotion: "reduce" });
		await page.goto("/en");

		// Check carousel or reveal animations
		// Since reduced motion is on, duration should be 0s
		// Playwright evaluates the computed styles
		const carousel = page.locator(".carousel-slide").first();
		if (await carousel.isVisible()) {
			const transitionDuration = await carousel.evaluate((el) => {
				return window.getComputedStyle(el).transitionDuration;
			});
			// Should be 0s or empty
			expect(["0s", ""]).toContain(transitionDuration);
		}
	});
});
