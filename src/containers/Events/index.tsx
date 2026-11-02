"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import OffcanvasPanel from "@/components/OffcanvasPanel";
import PageHeader from "@/components/PageHeader";
import { SORT_OPTIONS } from "@/data/eventFilters";
import { EVENTS, PAGE_HEADER_IMAGES } from "@/data/events";
import EventsFilters from "./sections/EventsFilters";

// TODO: search, filters, sort and "load more" are UI only for now – connect to API later
export default function EventsPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="Discover Events"
        subtitle="Browse concerts, festivals, conferences and more — find your next experience."
        breadcrumbs={[{ label: "Discover Events" }]}
        image={PAGE_HEADER_IMAGES.events}
      />

      <section className="cc-section pt-4 pt-lg-5">
        <div className="container">
          <div className="row g-4">
            {/* Sidebar filters (desktop) */}
            <aside className="col-lg-3 d-none d-lg-block">
              <div className="cc-filter-card cc-sticky-filters p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="h6 fw-semibold mb-0">
                    <i className="bi bi-sliders me-2" />
                    Filters
                  </h2>
                  <button type="button" className="btn btn-link btn-sm p-0 text-decoration-none">
                    Reset
                  </button>
                </div>
                <EventsFilters idPrefix="sidebar" />
              </div>
            </aside>

            {/* Results */}
            <div className="col-12 col-lg-9">
              {/* Toolbar */}
              <div className="row g-2 align-items-center mb-3">
                <div className="col-12 col-md">
                  <form className="input-group cc-input-pill" role="search" onSubmit={(e) => e.preventDefault()}>
                    <span className="input-group-text">
                      <i className="bi bi-search" />
                    </span>
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search events, venues or cities..."
                      aria-label="Search events"
                    />
                  </form>
                </div>

                <div className="col-auto d-lg-none">
                  <button
                    type="button"
                    className="btn btn-outline-cc px-3 py-2 d-inline-flex align-items-center gap-2"
                    onClick={() => setFiltersOpen(true)}
                  >
                    <i className="bi bi-sliders" />
                    Filters
                  </button>
                </div>

                <div className="col col-md-auto">
                  <select
                    className="form-select cc-select-pill"
                    defaultValue={SORT_OPTIONS[0].value}
                    aria-label="Sort events"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="small text-body-secondary mb-4">
                Showing <span className="fw-semibold text-body">{EVENTS.length}</span> events
              </p>

              {/* Grid */}
              <div className="row g-4">
                {EVENTS.map((event) => (
                  <div className="col-12 col-sm-6 col-xl-4" key={event.id}>
                    <EventCard event={event} />
                  </div>
                ))}
              </div>

              <div className="text-center mt-5">
                <button type="button" className="btn btn-outline-cc px-5 py-2">
                  Load More Events
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters drawer (mobile / tablet) */}
      <OffcanvasPanel
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filters"
        hideFrom="lg"
        footer={
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-cc flex-grow-1">
              Reset
            </button>
            <button
              type="button"
              className="btn btn-gradient flex-grow-1"
              onClick={() => setFiltersOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        }
      >
        <EventsFilters idPrefix="drawer" />
      </OffcanvasPanel>
    </>
  );
}
