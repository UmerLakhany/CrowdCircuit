"use client";

import { SubmitEvent, useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SearchBar({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened, close on Escape
  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    // TODO: connect to search API / results page
    console.log("Search:", query.trim());
  };

  return (
    <div
      className={`cc-search-panel border-bottom py-3 ${open ? "is-open" : ""}`}
      inert={!open}
    >
      <div className="container">
        <form
          className="cc-search-form d-flex align-items-center gap-2 mx-auto rounded-pill p-1 ps-3"
          onSubmit={handleSubmit}
          role="search"
        >
          <i className="bi bi-search text-body-secondary" />
          <input
            ref={inputRef}
            type="search"
            className="form-control border-0 bg-transparent shadow-none"
            placeholder="Search events, categories or cities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search events"
          />
          <button type="submit" className="btn btn-gradient px-4">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
