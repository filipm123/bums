import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Player from "./components/Player";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { AuthProvider } from "./Context/UserContext";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bums",
  description: "Easy way to manage your projects",
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <html className="flex flex-col h-full" lang="en">
          <head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" />
          </head>
          <body className={`${inter.className} overflow-auto`}>
            <Header />
            {children}
          </body>
        </html>
      </AuthProvider>
    </ThemeProvider>
  );
}
