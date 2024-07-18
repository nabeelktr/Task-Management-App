import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";
import TopBar from "@/components/TopBar";

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
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
