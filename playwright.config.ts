import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	use: {
		baseURL: process.env.BASE_URL || "http://localhost:4325",
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	webServer: process.env.BASE_URL
		? undefined
		: {
				command:
					"CI=true bun run build && CI=true bunx wrangler pages dev dist/ --port 4325",
				url: "http://localhost:4325",
				reuseExistingServer: !process.env.CI,
				timeout: 120 * 1000,
			},
});
