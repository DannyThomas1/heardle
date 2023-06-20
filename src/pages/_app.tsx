import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import SongProvider from "~/context/context";
import GuessProvider from "~/context/guess";
import { useEffect } from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
  const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
  };
  useEffect(() => {
    window.addEventListener("resize", documentHeight);
    documentHeight();
  }, []);

  return (
    <div id="app">
      <ClerkProvider
        {...pageProps}
        appearance={{
          baseTheme: dark,
        }}
      >
        <SongProvider>
          <GuessProvider>
            <Head>
              <title>Heardle</title>
              <meta
                name="description"
                content="Guess popular songs by 1 second clips"
              />
              <link rel="icon" href="/logo.svg" />
            </Head>
            <Component {...pageProps} />
          </GuessProvider>
        </SongProvider>
      </ClerkProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
