import { Suspense } from "react";
import type { Metadata } from "next";
import VerifyEmailPage from "@/containers/Auth/VerifyEmail";

export const metadata: Metadata = {
  title: "Verify Email – CrowdCircuit",
};

// Suspense is required because the page reads ?email from the URL (useSearchParams)
export default function VerifyEmail() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailPage />
    </Suspense>
  );
}
