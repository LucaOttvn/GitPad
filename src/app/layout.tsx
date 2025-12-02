import type {Metadata} from "next";
import "./globals.css";
import {ViewTransition} from "react";
import ToolBar from "../components/toolbar/ToolBar";
import {ToasterProvider} from "../components/ToasterProvider";

export const metadata: Metadata = {
  title: "GitPad",
  icons: {
    icon: "/icons/GitPad.png",
    apple: "/icons/GitPad.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ViewTransition enter="slide-in" exit="slide-out">
          {children}
          <ToolBar />
          <ToasterProvider />
        </ViewTransition>
      </body>
    </html>
  );
}
