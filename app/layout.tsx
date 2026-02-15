import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { StoreProvider } from "@/components/providers/store-provider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "ecommerco.ai",
  description: "Multi-store WooCommerce control center"
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <QueryProvider>
            <StoreProvider>{props.children}</StoreProvider>
          </QueryProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
