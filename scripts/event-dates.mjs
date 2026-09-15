// @ts-check
import { readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

/** @param {string} directory @returns {string[]} */
function markdownFiles(directory) {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = join(directory, entry.name);

		if (entry.isDirectory()) {
			return markdownFiles(path);
		}

		return entry.name.endsWith(".md") ? [path] : [];
	});
}

/** @returns {Map<string, string>} */
export function eventDatesByPath() {
	const eventsDirectory = resolve("src/content/eventos");

	return new Map(
		markdownFiles(eventsDirectory).flatMap((file) => {
			const source = readFileSync(file, "utf8");
			const dateValue = source.match(
				/^date:\s*["']?([^"'\r\n]+?)["']?\s*$/m,
			)?.[1];

			if (!dateValue) {
				return [];
			}

			const date = new Date(dateValue);

			if (Number.isNaN(date.getTime())) {
				return [];
			}

			const eventPath = relative(eventsDirectory, file)
				.split(sep)
				.join("/")
				.replace(/\.md$/, "/");

			return [[`/eventos/${eventPath}`, date.toISOString().slice(0, 10)]];
		}),
	);
}
