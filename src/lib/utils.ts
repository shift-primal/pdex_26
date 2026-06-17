import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function withFallback<T>(value: T | null | undefined, fallback: T): T {
	return value ?? fallback
}
