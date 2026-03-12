import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { cookies } from "next/headers";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "BK — bloodykheeng | Full Stack Developer & UI/UX Designer",
  description:
    "Full Stack Developer specializing in Next.js, React.js, Laravel, and MySQL. UI/UX Designer. Based in Kampala, Uganda.",
  keywords: [
    "Full Stack Developer", "Next.js", "React", "Laravel",
    "Uganda", "bloodykheeng", "BK", "UI UX Designer",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultTheme = cookieStore.get("theme");

  return (
    <html lang="en">
      <body className={`${syne.variable} ${jakarta.variable} antialiased`}>
        <ThemeProvider defaultTheme={defaultTheme?.value}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}