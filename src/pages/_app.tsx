import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import SongProvider from "~/context/context";
import GuessProvider from "~/context/guess";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
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
    </>
  );
};

export default api.withTRPC(MyApp);
