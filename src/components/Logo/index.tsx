import Image from "next/image";
import Link from "next/link";

type Props = {
  height?: number;
  className?: string;
};

// public/logo.png is 1021x244 (transparent), keep the same ratio
const RATIO = 1021 / 244;

export default function Logo({ height = 48, className = "" }: Props) {
  return (
    <Link
      href="/"
      className={`d-inline-flex align-items-center flex-shrink-0 ${className}`}
      aria-label="CrowdCircuit home"
    >
      {/* unoptimized: serve the original PNG so it stays sharp and never shows a stale cached copy */}
      <Image
        src="/logo.png"
        alt="CrowdCircuit"
        width={Math.round(height * RATIO)}
        height={height}
        style={{ width: "auto" }}
        unoptimized
        priority
      />
    </Link>
  );
}
