import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "mongoose-to-erd — live demo",
  description:
    "Turn Mongoose schemas into entity-relationship diagrams, automatically.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <Analytics packageName="mongoose-to-erd" />
      </body>
    </html>
  );
}
