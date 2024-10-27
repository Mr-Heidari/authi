import type { Metadata } from "next";
import{Roboto_Condensed}from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/utils/providers/rqprovider";
import NetworkStatusProvider from "@/utils/providers/NetworkStatusProvider";

const roboto=Roboto_Condensed({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Authi",
  description: "high security authentication system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased px-[3%] p-[1%] max-md:p-[3%]`}
      >
        <ReactQueryProvider>
          <main className="w-full h-full">
            <NetworkStatusProvider>{children}</NetworkStatusProvider>
          </main>
        </ReactQueryProvider>
        <Toaster
          position="bottom-left"
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#ffe7e7",
              color: "#d82828",
            },

            // Default options for specific types
            success: {
              duration: 5000,
              style: {
                background: "#acffac",
                color: "#0dae0d",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
