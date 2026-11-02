import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/data/categories";
import { route } from "@/data/routes";

type Props = {
  category: Category;
};

// Large photo card for a category (categories page)
export default function CategoryImageCard({ category }: Props) {
  return (
    <Link
      href={route.categoryDetails(category.slug)}
      className="cc-category-image-card d-block position-relative overflow-hidden h-100 text-reset"
    >
      <div className="ratio ratio-4x3">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
          className="object-fit-cover"
        />
      </div>
      <div className="cc-category-image-overlay" />

      {/* Content over the photo */}
      <div className="position-absolute top-0 start-0 end-0 bottom-0 d-flex flex-column justify-content-between p-3 p-lg-4">
        <div className="d-flex justify-content-between align-items-start">
          <span className="cc-category-icon">
            <i className={`bi ${category.icon}`} />
          </span>
          <span className="cc-badge badge rounded-pill">{category.eventCount} events</span>
        </div>

        <div>
          <h3 className="h5 fw-semibold text-white mb-1">{category.name}</h3>
          <p className="small text-white opacity-75 mb-2 cc-line-clamp-2">
            {category.description}
          </p>
          <span className="cc-category-image-link small fw-semibold d-inline-flex align-items-center gap-1">
            Explore events
            <i className="bi bi-arrow-right" />
          </span>
        </div>
      </div>
    </Link>
  );
}
