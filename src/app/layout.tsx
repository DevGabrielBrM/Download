import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "FeedbackFlow — Turn Customer Feedback into Product Insights",
  description:
    "AI-powered customer feedback analyzer that transforms scattered online reviews into actionable bug reports and feature requests.",
  keywords: [
    "feedback",
    "reviews",
    "sentiment analysis",
    "customer feedback",
    "product insights",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}