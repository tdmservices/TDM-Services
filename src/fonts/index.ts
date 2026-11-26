import localFont from "next/font/local";

/**
 * The site's two typefaces, served from files in this folder.
 *
 * They used to come from next/font/google, which downloads them from Google
 * while the site is being built. When the build server could not reach Google,
 * the whole deployment failed. With the files in the repository the build
 * needs nothing from outside.
 *
 * Both are variable fonts (one file covers every weight) under the SIL Open
 * Font Licence: Montserrat (Latin) and Noto Sans Arabic (Arabic).
 */
export const montserrat = localFont({
  src: "./montserrat-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-montserrat",
});

export const notoArabic = localFont({
  src: "./noto-sans-arabic-arabic-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-noto-ar",
});
