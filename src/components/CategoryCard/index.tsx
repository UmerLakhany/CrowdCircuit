import Link from "next/link";
import type { Category } from "@/data/categories";

type Props = {
  category: Category;
};

export default function CategoryCard({ category }: Props) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="cc-category-card d-flex flex-column align-items-start h-100 p-3 p-lg-4 text-reset"
    >
      <span className="cc-category-icon mb-3">
        <i className={`bi ${category.icon}`} />
      </span>
      <h3 className="h6 fw-semibold mb-1">{category.name}</h3>
      <span className="small text-body-secondary">
        {category.eventCount} events
      </span>
      <i className="bi bi-arrow-up-right cc-category-arrow" />
    </Link>
  );
}
