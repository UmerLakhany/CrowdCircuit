import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import BootstrapJs from "@/components/bootstrap-js/bootstrapjs";
import { ToasterContainer } from "@/components/Toaster";
import Header from "@/core/comman/header";
import Footer from "@/core/comman/footer";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CrowdCircuit – Every Event. Every Connection.",
  description:
    "Discover concerts, festivals, conferences and live experiences. Book tickets in a few clicks.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-bs-theme="dark" className={poppins.variable}>
      <body className="min-vh-100 d-flex flex-column">
        <Header />
        <main className="flex-grow-1">{children}</main>
        <Footer />
        <ToasterContainer />
        <BootstrapJs />
      </body>
    </html>
  );
}
