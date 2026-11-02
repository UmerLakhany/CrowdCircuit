"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import InputField from "@/components/Input";
import SelectField from "@/components/SelectField";
import { CATEGORIES, CITIES } from "@/data/categories";
import { HERO_IMAGE, HOME_STATS } from "@/data/events";

type Option = { id?: number | string; name: string };

type SearchValues = {
  keyword: string;
};

const LOCATION_OPTIONS: Option[] = CITIES.map((city) => ({ id: city, name: city }));
const CATEGORY_OPTIONS: Option[] = CATEGORIES.map((c) => ({ id: c.slug, name: c.name }));

export default function HeroSection() {
  const [location, setLocation] = useState<Option | null>(null);
  const [category, setCategory] = useState<Option | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchValues>({ defaultValues: { keyword: "" } });

  const onSubmit = (data: SearchValues) => {
    // TODO: navigate to /events with these filters
    console.log("Hero search:", {
      keyword: data.keyword.trim(),
      location: location?.name ?? null,
      category: category?.id ?? null,
    });
  };

  return (
    <section className="cc-hero position-relative overflow-hidden">
      {/* Background image + overlays */}
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-fit-cover cc-hero-bg"
      />
      <div className="cc-hero-overlay" />

      <div className="container position-relative py-5">
        <div className="row justify-content-center text-center py-lg-5">
          <div className="col-12 col-lg-10 col-xl-9">
            <span className="cc-badge badge rounded-pill px-3 py-2 mb-4 d-inline-flex align-items-center gap-2">
              <i className="bi bi-stars" />
              Every Event. Every Connection. One Circuit.
            </span>

            <h1 className="display-4 fw-bold mb-3">
              Discover Experiences{" "}
              <span className="text-gradient">Worth Remembering.</span>
            </h1>
            <p className="lead text-body-secondary mx-auto mb-5 cc-hero-text">
              Find the best concerts, festivals, conferences, and live
              experiences happening around you. Explore events and secure your
              tickets in just a few clicks.
            </p>

            {/* Search card */}
            <form
              className="cc-glass cc-field-flush p-3 p-md-4 text-start"
              onSubmit={handleSubmit(onSubmit)}
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

            {/* Stats */}
            <div className="row g-3 mt-4 mt-lg-5">
              {HOME_STATS.map((stat) => (
                <div className="col-6 col-md-3" key={stat.label}>
                  <p className="h3 fw-bold text-gradient mb-0">{stat.value}</p>
                  <p className="small text-body-secondary mb-0">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
