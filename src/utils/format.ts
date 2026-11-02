// Dates are stored as "YYYY-MM-DD" and formatted in UTC so server and
// client render the same text (no hydration mismatch).
const toDate = (isoDate: string) => new Date(`${isoDate}T00:00:00Z`);

export const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(toDate(isoDate));

export const formatShortDate = (isoDate: string) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(toDate(isoDate));

export const getDayMonth = (isoDate: string) => {
  const date = toDate(isoDate);
  return {
    day: date.getUTCDate(),
    month: new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone: "UTC",
    }).format(date),
  };
};

export const formatPrice = (amount: number) =>
  `PKR ${amount.toLocaleString("en-US")}`;

// 2400 -> "2.4K"
export const formatCount = (value: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
