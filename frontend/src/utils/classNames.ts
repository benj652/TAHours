/*
 * A utility function to merge tailwind classes together.
 * It takes in a variable amount of strings and uses `clsx` to merge them.
 * Then it passes the merged string to `twMerge` to remove duplicates.
 */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to merge tailwind classes together.
 * It takes in a variable amount of strings and uses `clsx` to merge them.
 * Then it passes the merged string to `twMerge` to remove duplicates.
 * @param inputs - The strings to merge.
 * @returns The merged string.
 */
export function cn(...inputs: string[]) {
  return twMerge(clsx(inputs));
}
