import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReactQueryProvider from "../../lib/react-query-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sanctuary",
  description: "Created by Richard Davis for the eyes of Solace employees",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {children}
          <div id="portal-root"></div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
