import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Heardle</title>
        <meta
          name="description"
          content="Guess popular songs by 1 second clips"
        />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
