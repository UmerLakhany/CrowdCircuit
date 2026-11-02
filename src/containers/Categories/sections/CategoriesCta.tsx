import Link from "next/link";
import { route } from "@/data/routes";

export default function CategoriesCta() {
  return (
    <section className="cc-section">
      <div className="container">
        <div className="cc-newsletter p-4 p-md-5">
          <div className="row align-items-center g-4 position-relative">
            <div className="col-12 col-lg-8 text-center text-lg-start">
              <h2 className="fw-bold mb-2">Can&apos;t decide where to start?</h2>
              <p className="text-body-secondary mb-0">
                Browse every upcoming event across all categories, cities and dates in
                one place.
              </p>
            </div>
            <div className="col-12 col-lg-4 d-flex flex-column flex-sm-row justify-content-center justify-content-lg-end gap-2">
              <Link href={route.events} className="btn btn-light rounded-pill px-4 py-2 fw-semibold">
                Discover Events
              </Link>
              <Link
                href={route.trending}
                className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold"
              >
                See Trending
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
