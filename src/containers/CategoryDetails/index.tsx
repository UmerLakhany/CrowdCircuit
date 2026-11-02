import PageHeader from "@/components/PageHeader";
import { CATEGORIES, type Category } from "@/data/categories";
import { EVENTS } from "@/data/events";
import { route } from "@/data/routes";
import { formatPrice } from "@/utils/format";
import CategoryEvents from "./sections/CategoryEvents";
import OtherCategories from "./sections/OtherCategories";

type Props = {
  category: Category;
};

const OTHER_CATEGORIES_COUNT = 4;

export default function CategoryDetailsPage({ category }: Props) {
  const events = EVENTS.filter((event) => event.category === category.name);
  const cities = new Set(events.map((event) => event.city));
  const lowestPrice = events.length > 0 ? Math.min(...events.map((event) => event.price)) : null;

  // Next categories after this one (wraps around the list)
  const index = CATEGORIES.findIndex((item) => item.slug === category.slug);
  const otherCategories = Array.from(
    { length: Math.min(OTHER_CATEGORIES_COUNT, CATEGORIES.length - 1) },
    (_, i) => CATEGORIES[(index + 1 + i) % CATEGORIES.length]
  );

  const stats = [
    { icon: category.icon, label: `${category.eventCount} events` },
    ...(cities.size > 0
      ? [{ icon: "bi-geo-alt", label: `${cities.size} ${cities.size === 1 ? "city" : "cities"}` }]
      : []),
    ...(lowestPrice !== null
      ? [{ icon: "bi-ticket-perforated", label: `From ${formatPrice(lowestPrice)}` }]
      : []),
  ];

  return (
    <>
      <PageHeader
        title={category.name}
        subtitle={category.description}
        breadcrumbs={[
          { label: "Categories", href: route.categories },
          { label: category.name },
        ]}
        image={category.image}
      >
        <ul className="list-unstyled d-flex flex-wrap gap-2 mt-4 mb-0">
          {stats.map((stat) => (
            <li className="cc-hero-chip" key={stat.label}>
              <i className={`bi ${stat.icon}`} />
              {stat.label}
            </li>
          ))}
        </ul>
      </PageHeader>

      <CategoryEvents category={category} events={events} />
      <OtherCategories categories={otherCategories} />
    </>
  );
}
