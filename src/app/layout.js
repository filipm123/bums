"use client";
import { Figtree } from "next/font/google";
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
import React, { useEffect, useState, useContext } from "react";

import Player from "./components/Player";
const inter = Figtree({ subsets: ["latin"] });

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
