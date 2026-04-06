import {
  IBM_Plex_Mono as FontMono,
  Instrument_Serif as FontSerif,
} from "next/font/google";

export const fontMono = FontMono({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontSerif = FontSerif({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-serif",
});
