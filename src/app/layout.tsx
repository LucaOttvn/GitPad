import type { Metadata } from "next";
import "./globals.css";
import { ViewTransition } from "react";
import ToolBar from "../components/toolbar/ToolBar";
import { ToasterProvider } from "../components/ToasterProvider";
import Providers from "../components/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "GitPad",
  icons: {
    icon: "/icons/GitPad.png",
    apple: "/icons/GitPad.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <ViewTransition enter="slide-in" exit="slide-out">
            {children}
            <ToolBar />
            <ToasterProvider />
          </ViewTransition>
        </Providers>
      </body>
    </html>
  );
}
