import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { trpc } from "@/utils/trpc";
import Head from "next/head";
import "@/styles/fonts.css";
import "@/styles/globals.css";
import { Protect } from "@/components";

const App = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps<{ session: Session }>) => {
  return (
    <>
      <Head>
        <meta title="color-scheme" content="dark only" />
      </Head>

      <SessionProvider session={session}>
        <Protect>
          <Component {...pageProps} />
        </Protect>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(App);
