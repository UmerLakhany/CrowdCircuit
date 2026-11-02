import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryDetailsPage from "@/containers/CategoryDetails";
import { CATEGORIES, getCategoryBySlug } from "@/data/categories";

type Props = {
  params: Promise<{ slug: string }>;
};

// Pre-render a page for every category
export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category not found – CrowdCircuit" };

  return {
    title: `${category.name} Events – CrowdCircuit`,
    description: category.description,
  };
}

export default async function CategoryDetails({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return <CategoryDetailsPage category={category} />;
}
