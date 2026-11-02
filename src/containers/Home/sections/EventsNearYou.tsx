"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import SectionHeader from "@/components/SectionHeader";
import { CITIES } from "@/data/categories";
import { EVENTS } from "@/data/events";

export default function EventsNearYou() {
  // TODO: default to the customer's saved / detected location
  const [city, setCity] = useState(CITIES[0]);
  const nearby = EVENTS.filter((event) => event.city === city).slice(0, 4);

  return (
    <section className="cc-section">
      <div className="container">
        <SectionHeader
          eyebrow="Near You"
          title={`Events in ${city}`}
          subtitle="Pick a city to see what's happening around you."
        />

        {/* City filter */}
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

        {nearby.length > 0 ? (
          <div className="row g-4">
            {nearby.map((event) => (
              <div className="col-12 col-sm-6 col-lg-3" key={event.id}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="cc-glass text-center p-5">
            <i className="bi bi-calendar-x fs-1 text-body-secondary" />
            <p className="text-body-secondary mt-3 mb-0">
              No events in {city} yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
