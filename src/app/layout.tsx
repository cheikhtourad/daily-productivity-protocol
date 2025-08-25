import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { TasksProvider } from "@/contexts/TasksContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "البروتوكول اليومي - نظام الإنتاجية الشامل",
  description: "تطبيق إدارة البروتوكول اليومي مع منهجيات علمية مثبتة لكل نشاط",
  keywords: "إنتاجية، بروتوكول يومي، بوموردو، منهجية، تنظيم الوقت",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <AuthProvider>
            <TasksProvider>
              {children}
            </TasksProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
