import Image from "next/image";
import Link from "next/link";

type Props = {
  height?: number;
  className?: string;
};

// Cropped logo is 1420x340, keep the same ratio
const RATIO = 1420 / 340;

export default function Logo({ height = 44, className = "" }: Props) {
  return (
    <Link
      href="/"
      className={`d-inline-flex align-items-center flex-shrink-0 ${className}`}
      aria-label="CrowdCircuit home"
    >
      <Image
        src="/logo-header.png"
        alt="CrowdCircuit"
        width={Math.round(height * RATIO)}
        height={height}
        style={{ height, width: "auto" }}
        priority
      />
    </Link>
  );
}
