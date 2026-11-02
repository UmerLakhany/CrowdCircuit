import CategoryCard from "@/components/CategoryCard";
import SectionHeader from "@/components/SectionHeader";
import { CATEGORIES } from "@/data/categories";

export default function BrowseCategories() {
  return (
    <section className="cc-section cc-section-alt">
      <div className="container">
        <SectionHeader
          eyebrow="Categories"
          title="Browse by Category"
          subtitle="From live music to tech summits, find events that match your vibe."
          action={{ label: "All Categories", href: "/categories" }}
        />

        <div className="row g-3 g-lg-4">
          {CATEGORIES.map((category) => (
            <div className="col-6 col-md-4 col-lg-3" key={category.slug}>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
