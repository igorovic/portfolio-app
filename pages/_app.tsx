import "../styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import store from "lib/app/store";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { emCache } from "../lib/emotionCache";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      {/* <Head>
        <title>demo dyve.ch</title>
        <meta name="emotion-insertion-point" content="" />
      </Head> */}
      <Provider store={store}>
        <SessionProvider session={session}>
          <MantineProvider
            emotionCache={emCache}
            withGlobalStyles={true}
            withNormalizeCSS={false}
            theme={{
              /** Put your mantine theme override here */
              colorScheme: "light",
            }}
          >
            <Component {...pageProps} />
          </MantineProvider>
        </SessionProvider>
      </Provider>
    </>
  );
}

export default appWithTranslation(MyApp);
