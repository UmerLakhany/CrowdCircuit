"use client";

import { useState } from "react";
import { CATEGORIES, CITIES } from "@/data/categories";
import { DATE_FILTERS, PRICE_STEP } from "@/data/eventFilters";
import { countEventsByCategory, MAX_EVENT_PRICE } from "@/utils/events";
import { formatPrice } from "@/utils/format";

type Props = {
  // Rendered twice (sidebar + mobile drawer), so input ids need a prefix
  idPrefix: string;
};

const CATEGORY_COUNTS = countEventsByCategory();

// TODO: UI only for now – filter values are not applied to the results yet
export default function EventsFilters({ idPrefix }: Props) {
  // Local UI state only (so the active city button and price label update)
  const [city, setCity] = useState("");
  const [maxPrice, setMaxPrice] = useState(MAX_EVENT_PRICE);

  return (
    <div className="d-flex flex-column gap-4">
      {/* Category */}
      <fieldset>
        <legend className="cc-filter-title">Category</legend>
        <div className="d-flex flex-column gap-2">
          {CATEGORIES.map((category) => {
            const id = `${idPrefix}-cat-${category.slug}`;
            return (
              <div className="form-check d-flex align-items-center mb-0" key={category.slug}>
                <input className="form-check-input mt-0" type="checkbox" id={id} />
                <label
                  className="form-check-label small ms-2 flex-grow-1 d-flex justify-content-between gap-2"
                  htmlFor={id}
                >
                  <span>{category.name}</span>
                  <span className="text-body-secondary">
                    {CATEGORY_COUNTS[category.slug] ?? 0}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Location */}
      <fieldset>
        <legend className="cc-filter-title">Location</legend>
        <div className="d-flex flex-wrap gap-2">
          {["", ...CITIES].map((item) => (
            <button
              type="button"
              key={item || "all"}
              className={`btn btn-outline-cc btn-sm px-3 ${city === item ? "active" : ""}`}
              onClick={() => setCity(item)}
              aria-pressed={city === item}
            >
              {item || "All Cities"}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Date */}
      <fieldset>
        <legend className="cc-filter-title">Date</legend>
        <div className="d-flex flex-column gap-2">
          {DATE_FILTERS.map((option, index) => {
            const id = `${idPrefix}-date-${option.value}`;
            return (
              <div className="form-check mb-0" key={option.value}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={`${idPrefix}-date`}
                  id={id}
                  defaultChecked={index === 0}
                />
                <label className="form-check-label small" htmlFor={id}>
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Price */}
      <fieldset>
        <legend className="cc-filter-title d-flex justify-content-between align-items-center">
          <span>Max Price</span>
          <span className="small fw-semibold text-gradient">{formatPrice(maxPrice)}</span>
        </legend>
        <input
          type="range"
          className="form-range"
          min={PRICE_STEP}
          max={MAX_EVENT_PRICE}
          step={PRICE_STEP}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          aria-label="Maximum ticket price"
        />
        <div className="d-flex justify-content-between small text-body-secondary">
          <span>{formatPrice(PRICE_STEP)}</span>
          <span>{formatPrice(MAX_EVENT_PRICE)}</span>
        </div>
      </fieldset>
    </div>
  );
}
