import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";

export const fontSans = GeistSans;
export const fontMono = localFont({
  src: "../assets/fonts/PaperMono-Regular.woff2",
  variable: "--font-paper-mono",
  weight: "400",
  display: "swap",
});
