import type { Metadata } from "next";
import NotFoundPage from "@/containers/NotFound";

export const metadata: Metadata = {
  title: "Page Not Found – CrowdCircuit",
};

export default function NotFound() {
  return <NotFoundPage />;
}
