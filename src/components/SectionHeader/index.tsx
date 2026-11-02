import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
};

export default function SectionHeader({ eyebrow, title, subtitle, action }: Props) {
  return (
    <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-4 mb-lg-5">
      <div>
        {eyebrow && <p className="cc-eyebrow mb-2">{eyebrow}</p>}
        <h2 className="h1 fw-bold mb-2">{title}</h2>
        {subtitle && <p className="text-body-secondary mb-0">{subtitle}</p>}
      </div>

      {action && (
        <Link
          href={action.href}
          className="btn btn-outline-cc px-4 d-inline-flex align-items-center gap-2 align-self-start align-self-md-end flex-shrink-0"
        >
          {action.label}
          <i className="bi bi-arrow-right" />
        </Link>
      )}
    </div>
  );
}
