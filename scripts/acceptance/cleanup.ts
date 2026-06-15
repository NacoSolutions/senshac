import { rmdirSync, rmSync } from "node:fs";
import { join } from "node:path";

export function cleanupWranglerState(root = ".wrangler") {
	for (const directory of [
		join(root, "state/v3/workflows"),
		join(root, "state/v3/do"),
		join(root, "tmp"),
	]) {
		rmSync(directory, { recursive: true, force: true });
	}
	for (const directory of [join(root, "state/v3"), join(root, "state"), root]) {
		try {
			rmdirSync(directory);
		} catch {}
	}
}
