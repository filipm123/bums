import { Inter } from "next/font/google";
import "./globals.css";
import "@fontsource/noto-sans/300.css";
import "@fontsource/noto-sans/400.css";
import "@fontsource/noto-sans/500.css";
import "@fontsource/noto-sans/700.css";
import Header from "./components/Header";
import Player from "./components/Player";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { AuthProvider } from "./Context/UserContext";
import Script from "next/script";
import * as THREE from "three";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bums",
  description: "Easy way to manage your projects",
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <html className="flex flex-col" lang="en">
          <body className={`${inter.className}`}>{children}</body>
        </html>
      </AuthProvider>
    </ThemeProvider>
  );
}
