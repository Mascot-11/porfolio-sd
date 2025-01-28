import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientToastContainer from "./components/ClientToastContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shreeyush Dhungana - Portfolio",
  description:
    "Personal portfolio of Shreeyush Dhungana, showcasing education, skills, and professional experience.",
  keywords: ["portfolio", "education", "QA", "software development", "Nepal"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ClientToastContainer />
      </body>
    </html>
  );
}
