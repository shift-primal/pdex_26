import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function withFallback<T>(value: T | null | undefined, fallback: T): T {
	return value ?? fallback;
}

export function capFirstLetter(text: string) {
	const newText = text.replaceAll(" ", "-");

	if (!newText.includes("-")) {
		return text.charAt(0).toUpperCase() + text.slice(1);
	}

	return text
		.split("-")
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(" ");
}
