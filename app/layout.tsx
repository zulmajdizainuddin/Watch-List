import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Watchlist",
  description: "Personal anime / movies / series watchlist"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-white">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

