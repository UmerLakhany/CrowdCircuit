"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import SectionHeader from "@/components/SectionHeader";
import { CITIES } from "@/data/categories";
import { EVENTS } from "@/data/events";

// TODO: UI only for now – city buttons don't filter yet (connect to API / user location later)
const NEARBY_EVENTS = EVENTS.slice(4, 8);

export default function EventsNearYou() {
  // Local UI state only, so the selected city button is highlighted
  const [city, setCity] = useState(CITIES[0]);

  return (
    <section className="cc-section">
      <div className="container">
        <SectionHeader
          eyebrow="Near You"
          title="Events Near You"
          subtitle="Pick a city to see what's happening around you."
        />

        {/* City selector */}
        <div className="d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Choose city">
          {CITIES.map((item) => (
            <button
              key={item}
              type="button"
              className={`btn btn-outline-cc px-4 ${item === city ? "active" : ""}`}
              onClick={() => setCity(item)}
              aria-pressed={item === city}
            >
              <i className="bi bi-geo-alt me-2" />
              {item}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {NEARBY_EVENTS.map((event) => (
            <div className="col-12 col-sm-6 col-lg-3" key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
