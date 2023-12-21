"use client";
import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  typography: {
    fontFamily: "inherit",
  },
  palette: {
    mode: "dark", // Enable dark mode
    primary: {
      main: "#ffffff",
      secondary:"#ffffff"
    },
  },
});

export default theme;
