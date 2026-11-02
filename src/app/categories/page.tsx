import type { Metadata } from "next";
import CategoriesPage from "@/containers/Categories";

export const metadata: Metadata = {
  title: "Categories – CrowdCircuit",
  description:
    "Explore events by category: music, festivals, sports, technology, business, arts, food and education.",
};

export default function Categories() {
  return <CategoriesPage />;
}
