import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { Providers } from "./Provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} bg-blue-100`}>
        <div className="min-w-full min-h-screen overflow-hidden text-black bg-blue-100">
          <TopBar />
          <SideBar />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
