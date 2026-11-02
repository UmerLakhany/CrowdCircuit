import type { Metadata } from "next";
import TrendingPage from "@/containers/Trending";

export const metadata: Metadata = {
  title: "Trending Events – CrowdCircuit",
  description: "The most popular and highly attended events on CrowdCircuit right now.",
};

export default function Trending() {
  return <TrendingPage />;
}
