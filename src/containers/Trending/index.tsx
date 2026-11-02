import PageHeader from "@/components/PageHeader";
import { PAGE_HEADER_IMAGES } from "@/data/events";
import { TRENDING_STATS } from "@/data/trending";
import HotCategories from "./sections/HotCategories";
import TrendingGrid from "./sections/TrendingGrid";
import TrendingSpotlight from "./sections/TrendingSpotlight";

export default function TrendingPage() {
  return (
    <>
      <PageHeader
        title="Trending Events"
        subtitle="See what's hot right now — the most popular and highly attended events across Pakistan."
        breadcrumbs={[{ label: "Trending" }]}
        image={PAGE_HEADER_IMAGES.trending}
      >
        <ul className="list-unstyled d-flex flex-wrap gap-2 mt-4 mb-0">
          {TRENDING_STATS.map((stat) => (
            <li className="cc-hero-chip" key={stat.label}>
              <i className={`bi ${stat.icon}`} />
              {stat.label}
            </li>
          ))}
        </ul>
      </PageHeader>

      <TrendingSpotlight />
      <TrendingGrid />
      <HotCategories />
    </>
  );
}
