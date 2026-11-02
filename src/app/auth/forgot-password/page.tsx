import type { Metadata } from "next";
import ForgotPasswordPage from "@/containers/Auth/ForgotPassword";

export const metadata: Metadata = {
  title: "Forgot Password – CrowdCircuit",
};

export default function ForgotPassword() {
  return <ForgotPasswordPage />;
}
