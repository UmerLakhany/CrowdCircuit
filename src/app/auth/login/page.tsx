import type { Metadata } from "next";
import LoginPage from "@/containers/Auth/Login";

export const metadata: Metadata = {
  title: "Sign In – CrowdCircuit",
};

export default function Login() {
  return <LoginPage />;
}
