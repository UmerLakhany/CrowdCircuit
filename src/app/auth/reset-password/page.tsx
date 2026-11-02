import { Suspense } from "react";
import type { Metadata } from "next";
import ResetPasswordPage from "@/containers/Auth/ResetPassword";

export const metadata: Metadata = {
  title: "Reset Password – CrowdCircuit",
};

// Suspense is required because the page reads ?token from the URL (useSearchParams)
export default function ResetPassword() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordPage />
    </Suspense>
  );
}
