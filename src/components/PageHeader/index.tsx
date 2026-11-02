import Image from "next/image";
import Link from "next/link";
import { route } from "@/data/routes";

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  // Optional background photo (switches banner to dark overlay + white text)
  image?: string;
};

// Page title banner with breadcrumb (used on inner pages)
export default function PageHeader({ title, subtitle, breadcrumbs = [], image }: Props) {
  return (
    <section
      className={`cc-page-header position-relative overflow-hidden py-5 ${
        image ? "cc-page-header-image" : ""
      }`}
    >
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-fit-cover"
          />
          <div className="cc-page-header-overlay" />
        </>
      )}

      <div className="container position-relative py-lg-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb small mb-3">
            <li className="breadcrumb-item">
              <Link href={route.home}>Home</Link>
            </li>
            {breadcrumbs.map((crumb) =>
              crumb.href ? (
                <li className="breadcrumb-item" key={crumb.label}>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </li>
              ) : (
                <li className="breadcrumb-item active" aria-current="page" key={crumb.label}>
                  {crumb.label}
                </li>
              )
            )}
          </ol>
        </nav>

        <h1 className="display-5 fw-bold mb-2">{title}</h1>
        {subtitle && (
          <p className="lead text-body-secondary mb-0 cc-page-header-text">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
