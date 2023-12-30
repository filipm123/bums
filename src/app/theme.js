"use client";
import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  typography: {
    fontFamily: "inherit",
    button: {
      textTransform: "capitalize",
    },
  },
  palette: {
    mode: "dark", // Enable dark mode
    primary: {
      main: "#ffffff",
      secondary: "#ffffff",
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.9)", // Set your desired background color and opacity
        },
      },
    },
  },
});

export default theme;
