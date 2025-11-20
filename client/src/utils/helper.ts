// src/lib/cn.js
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn - combine conditional classnames with Tailwind-aware merge.
 * Accepts any clsx-compatible inputs (strings, arrays, objects, etc.)
 */
export default function cn(...inputs: string[]) {
    // clsx reduces input -> string
    const merged = clsx(...inputs);
    // tailwind-merge resolves conflicting Tailwind utilities
    return twMerge(merged);
}
