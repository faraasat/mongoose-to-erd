import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import { TopNav } from "@/components/topnav";
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
        <TopNav pkg="mongoose-to-erd" />
        {children}
        <Analytics packageName="mongoose-to-erd" />
      </body>
    </html>
  );
}
