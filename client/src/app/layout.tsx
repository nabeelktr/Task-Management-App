"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import TopBar from "../components/TopBar";
import { persistor, store } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { ModalProvider } from "../hooks/useModal";

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
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div className="min-w-full min-h-screen overflow-hidden text-black bg-blue-100">
              <ModalProvider>
                <TopBar />
                {children}
                <Toaster position="top-center" />
              </ModalProvider>
            </div>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
