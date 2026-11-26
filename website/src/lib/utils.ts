import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safe payload for an inline JSON-LD <script>. Escaping `<` prevents a string
 * value from closing the script element and injecting markup (REACT-XSS-001).
 */
export function jsonLdPayload(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
