import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import GuessProvider from "~/context/guess";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
  };
  useEffect(() => {
    window.addEventListener("resize", documentHeight);
    documentHeight();

    return () => window.removeEventListener("resize", documentHeight);
  }, []);

  return (
    <div id="app">
      <ClerkProvider
        {...pageProps}
        appearance={{
          baseTheme: dark,
        }}
      >
        <GuessProvider>
          <Head>
            <title>Heardle</title>
            <meta
              name="description"
              content="Guess popular songs by 1 second clips"
            />
            <link rel="icon" href="/logo.svg" />
          </Head>
          <div>
            <Toaster />
          </div>
          <Component {...pageProps} />
        </GuessProvider>
      </ClerkProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
