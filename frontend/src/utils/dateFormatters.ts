/*
 * dateFormatters.ts
 * This file contains functions for formatting dates
 * It is used in the analytics page
 * These functions are getDateRange, formatDateRange, and getDateRangeBounds
 */
import { DateRangeBounds } from "@/types";

export const dateOptions = {
  0: "Today",
  33: "Past Week",
  66: "Past Month",
  99: "All Time",
};

/**
 * Returns a date object representing the start of the given time range
 *
 * The returned date object is the beginning of the time range specified by the option parameter.
 * If the option is invalid, the function returns null.
 *
 * @param option a string representing the time range to return. Valid options are:
 * - "0": Past 24 hours
 * - "33": Past week
 * - "66": Past month / 30 days
 * - "99": All time (no restriction)
 */
export const getDateRange = (option: string) => {
  const now = new Date();
  //console.log(option);
  switch (option) {
    case "0":
      return new Date(now.getTime() - 24 * 60 * 60 * 1000); // Past 24 hours
    case "33":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Past week
    case "66":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // Past month / 30 days
    case "99":
      return "Class Creation"; // All time (no restriction)
    default:
      return null;
  }
};
/**
 * Formats a date range string for the given time range option
 *
 * The returned string is in the format "startDate - endDate" where startDate and endDate are in the format "MM/DD/YYYY".
 * If the option is invalid, the function returns "All Time".
 * If the option is "99", the function returns "Class Creation - endDate".
 *
 * @param option a string representing the time range to format. Valid options are:
 * - "0": Past 24 hours
 * - "33": Past week
 * - "66": Past month / 30 days
 * - "99": All time (no restriction)
 */
export const formatDateRange = (option: string) => {
  const now = new Date();
  const startDate = getDateRange(option);

  if (startDate === null) return "All Time";
  if (startDate === "Class Creation")
    return `${startDate} - ${now.toLocaleDateString()}`;
  return `${startDate.toLocaleDateString()} - ${now.toLocaleDateString()}`;
};

/**
 * Returns a date range object representing the start and end dates of the given time range
 *
 * The returned object is in the format { startDate: Date, endDate: Date }.
 * The startDate is the beginning of the time range specified by the option parameter.
 * The endDate is the current date.
 * If the option is "99", the startDate is set to a far past date so that the filter has no lower bound.
 *
 * @param option a string representing the time range to return. Valid options are:
 * - "0": Past 24 hours
 * - "33": Past week
 * - "66": Past month / 30 days
 * - "99": All time (no restriction)
 */
export const getDateRangeBounds = (option: string): DateRangeBounds => {
  const now = new Date();
  const start = getDateRange(option);
  const fallbackStartDate = new Date(
    now.getFullYear() - 100,
    now.getMonth(),
    now.getDate()
  );
  if (start === "Class Creation") {
    return { startDate: fallbackStartDate, endDate: now }; // No lower bound
  }

  return { startDate: start as Date, endDate: now };
};
