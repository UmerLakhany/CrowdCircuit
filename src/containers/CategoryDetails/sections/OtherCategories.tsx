import CategoryCard from "@/components/CategoryCard";
import SectionHeader from "@/components/SectionHeader";
import type { Category } from "@/data/categories";
import { route } from "@/data/routes";

type Props = {
  categories: Category[];
};

export default function OtherCategories({ categories }: Props) {
  if (categories.length === 0) return null;

  return (
    <section className="cc-section cc-section-alt">
      <div className="container">
        <SectionHeader
          eyebrow="Keep exploring"
          title="Other Categories"
          subtitle="Discover more experiences beyond this category."
          action={{ label: "All Categories", href: route.categories }}
        />

        <div className="row g-3 g-lg-4">
          {categories.map((category) => (
            <div className="col-6 col-lg-3" key={category.slug}>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
