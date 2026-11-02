"use client";

import { SubmitEvent, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import InputField from "@/components/Input";
import SelectField from "@/components/SelectField";
import { CATEGORIES, CITIES } from "@/data/categories";
import { EVENTS, HERO_IMAGE, HOME_STATS } from "@/data/events";
import { formatCount, formatPrice, formatShortDate } from "@/utils/format";

type Option = { id?: number | string; name: string };

type SearchValues = {
  keyword: string;
};

const LOCATION_OPTIONS: Option[] = CITIES.map((city) => ({ id: city, name: city }));
const CATEGORY_OPTIONS: Option[] = CATEGORIES.map((c) => ({ id: c.slug, name: c.name }));

// Event shown in the floating card on the hero image
const SPOTLIGHT = EVENTS[0];

export default function HeroSection() {
  const [location, setLocation] = useState<Option | null>(null);
  const [category, setCategory] = useState<Option | null>(null);

  const {
    register,
    formState: { errors },
  } = useForm<SearchValues>({ defaultValues: { keyword: "" } });

  // TODO: UI only for now – navigate to /events with these filters later
  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="cc-hero overflow-hidden py-5">
      <div className="container py-lg-4">
        <div className="row align-items-center g-5">
          {/* Text */}
          <div className="col-12 col-lg-6 text-center text-lg-start">
            <span className="cc-pill-soft badge rounded-pill px-3 py-2 mb-4 d-inline-flex align-items-center gap-2">
              <i className="bi bi-stars" />
              Every Event. Every Connection. One Circuit.
            </span>

            <h1 className="display-4 fw-bold mb-3">
              Discover Experiences{" "}
              <span className="text-gradient">Worth Remembering.</span>
            </h1>
            <p className="lead text-body-secondary mb-4 mb-lg-5">
              Find the best concerts, festivals, conferences, and live
              experiences happening around you. Explore events and secure your
              tickets in just a few clicks.
            </p>

            {/* Stats */}
            <div className="row g-3">
              {HOME_STATS.map((stat) => (
                <div className="col-6 col-sm-3" key={stat.label}>
                  <p className="h3 fw-bold text-gradient mb-0">{stat.value}</p>
                  <p className="small text-body-secondary mb-0">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image with floating cards (desktop only) */}
          <div className="col-lg-6 d-none d-lg-block">
            <div className="position-relative ps-4">
              <div className="cc-hero-media ratio ratio-4x3">
                <Image
                  src={HERO_IMAGE}
                  alt="Crowd enjoying a live concert"
                  fill
                  priority
                  sizes="(min-width: 992px) 600px, 100vw"
                  className="object-fit-cover"
                />
              </div>

              <div className="cc-hero-float cc-hero-float-start d-flex align-items-center gap-3 p-3">
                <span className="cc-category-icon flex-shrink-0">
                  <i className="bi bi-ticket-perforated" />
                </span>
                <div className="lh-sm">
                  <p className="fw-semibold small mb-1">{SPOTLIGHT.title}</p>
                  <p className="small text-body-secondary mb-0">
                    {formatShortDate(SPOTLIGHT.date)} · From {formatPrice(SPOTLIGHT.price)}
                  </p>
                </div>
              </div>

              <div className="cc-hero-float cc-hero-float-end d-flex align-items-center gap-2 px-3 py-2">
                <i className="bi bi-people-fill text-gradient fs-5" />
                <span className="small fw-semibold">
                  {formatCount(SPOTLIGHT.attendees)} going
                </span>
              </div>
            </div>
          </div>

          {/* Search card */}
          <div className="col-12">
            <form
              className="cc-panel cc-field-flush p-3 p-md-4"
              onSubmit={onSubmit}
              role="search"
            >
              <div className="row g-3 align-items-start">
                <div className="col-12 col-lg-4">
                  <InputField
                    name="keyword"
                    placeholder="Search events..."
                    register={register}
                    errors={errors}
                    startAdornment={<i className="bi bi-search" />}
                  />
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <SelectField
                    placeholder="Location"
                    options={LOCATION_OPTIONS}
                    selected={location}
                    onSelect={setLocation}
                  />
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <SelectField
                    placeholder="Category"
                    options={CATEGORY_OPTIONS}
                    selected={category}
                    onSelect={setCategory}
                  />
                </div>
                <div className="col-12 col-lg-2 d-grid">
                  <button type="submit" className="btn btn-gradient py-2">
                    Explore Events
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
