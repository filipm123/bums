import { Inter } from "next/font/google";
import "./globals.css";
import "@fontsource/noto-sans/300.css";
import "@fontsource/noto-sans/400.css";
import "@fontsource/noto-sans/500.css";
import "@fontsource/noto-sans/700.css";
import Header from "./components/Header";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { AuthProvider } from "./Context/UserContext";
import { TrackProvider } from "./Context/TracksContext";
import { PlayerProvider } from "./Context/PlayerContext";

import Script from "next/script";
import * as THREE from "three";
import Player from "./components/Player";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bums",
  description: "Easy way to manage your projects",
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <TrackProvider>
          <PlayerProvider>
            <html className="flex flex-col" lang="en">
              <body className={`${inter.className}`}>
                {children}
                <Player />
              </body>
            </html>
          </PlayerProvider>
        </TrackProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
