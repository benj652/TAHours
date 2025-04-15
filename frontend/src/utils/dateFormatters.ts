import { DateRangeBounds } from "@/types";

export const dateOptions = {
  0: "Today",
  33: "Past Week",
  66: "Past Month",
  99: "All Time",
};

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
export const formatDateRange = (option: string) => {
  const now = new Date();
  const startDate = getDateRange(option);

  if (startDate === null) return "All Time";
  if (startDate === "Class Creation")
    return `${startDate} - ${now.toLocaleDateString()}`;
  return `${startDate.toLocaleDateString()} - ${now.toLocaleDateString()}`;
};

export const getDateRangeBounds = (option: string): DateRangeBounds => {
  const now = new Date();
  const start = getDateRange(option);
  const fallbackStartDate = new Date(
    now.getFullYear() - 100,
    now.getMonth(),
    now.getDate(),
  );
  if (start === "Class Creation") {
    return { startDate: fallbackStartDate, endDate: now }; // No lower bound
  }

  return { startDate: start as Date, endDate: now };
};
