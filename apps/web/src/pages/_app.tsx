import type { AppType } from "next/app";
import { trpc } from "@/utils/trpc";
import Head from "next/head";
import "@/styles/fonts.css";
import "@/styles/globals.css";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta title="color-scheme" content="dark only" />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(App);
