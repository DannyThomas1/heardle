// In `pages/_document.js`
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://w.soundcloud.com/player/api.js"
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
