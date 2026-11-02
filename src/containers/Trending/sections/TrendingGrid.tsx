"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import { TRENDING_EVENTS, TRENDING_RANGES } from "@/data/trending";

// TODO: range tabs are UI only for now – connect to API later
export default function TrendingGrid() {
  const [range, setRange] = useState<string>(TRENDING_RANGES[1].value);

  return (
    <section className="cc-section cc-section-alt">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-4 mb-lg-5">
          <div>
            <p className="cc-eyebrow mb-2">Leaderboard</p>
            <h2 className="h1 fw-bold mb-2">All Trending Events</h2>
            <p className="text-body-secondary mb-0">
              Ranked by bookings and interest from the CrowdCircuit community.
            </p>
          </div>

          {/* Time range tabs */}
          <div className="d-flex flex-wrap gap-2" role="group" aria-label="Trending time range">
            {TRENDING_RANGES.map((item) => (
              <button
                type="button"
                key={item.value}
                className={`btn btn-outline-cc px-3 ${range === item.value ? "active" : ""}`}
                onClick={() => setRange(item.value)}
                aria-pressed={range === item.value}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="row g-4">
          {TRENDING_EVENTS.map((event, index) => (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={event.id}>
              <EventCard
                event={event}
                badge={{ label: `#${index + 1} Trending`, icon: "bi-fire" }}
                showAttendees
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
