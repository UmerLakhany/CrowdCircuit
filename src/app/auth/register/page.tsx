import type { Metadata } from "next";
import RegisterPage from "@/containers/Auth/Register";

export const metadata: Metadata = {
  title: "Create Account – CrowdCircuit",
};

export default function Register() {
  return <RegisterPage />;
}
