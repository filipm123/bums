import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { AuthProvider } from "./Context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bums",
  description: "Easy way to manage your projects",
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <html className="flex flex-col min-h-screen" lang="en">
          <body className={inter.className}>
            <Header />
            {children}
          </body>
        </html>
      </AuthProvider>
    </ThemeProvider>
  );
}
