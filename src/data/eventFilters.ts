export const SORT_OPTIONS = [
  { value: "upcoming", label: "Upcoming Dates" },
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest Added" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

export const DATE_FILTERS = [
  { value: "any", label: "Any Date" },
  { value: "next-7-days", label: "Next 7 Days" },
  { value: "this-month", label: "This Month" },
  { value: "next-month", label: "Next Month" },
] as const;

export const PRICE_STEP = 500;
