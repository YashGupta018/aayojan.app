import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ayojan.app - Event Planning, Discovery & Vendor Operating System",
  description: "India's one-stop event planning platform. AI-guided checklists, transparent budget allocation, verified venues and vendors, and quote comparison.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1F2023]">
        <AppProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
