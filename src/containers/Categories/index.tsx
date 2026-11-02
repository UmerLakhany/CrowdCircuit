import PageHeader from "@/components/PageHeader";
import { PAGE_HEADER_IMAGES } from "@/data/events";
import AllCategories from "./sections/AllCategories";
import CategoriesCta from "./sections/CategoriesCta";
import CategorySpotlight from "./sections/CategorySpotlight";

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        title="Categories"
        subtitle="Explore events by type — from live music and festivals to tech summits and workshops."
        breadcrumbs={[{ label: "Categories" }]}
        image={PAGE_HEADER_IMAGES.categories}
      />
      <AllCategories />
      <CategorySpotlight />
      <CategoriesCta />
    </>
  );
}
