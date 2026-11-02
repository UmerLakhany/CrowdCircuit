import CategoryImageCard from "@/components/CategoryImageCard";
import SectionHeader from "@/components/SectionHeader";
import { CATEGORIES } from "@/data/categories";

export default function AllCategories() {
  return (
    <section className="cc-section">
      <div className="container">
        <SectionHeader
          eyebrow="Browse"
          title="All Categories"
          subtitle={`${CATEGORIES.length} categories to explore — pick one and find your next experience.`}
        />

        <div className="row g-3 g-lg-4">
          {CATEGORIES.map((category) => (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={category.slug}>
              <CategoryImageCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
