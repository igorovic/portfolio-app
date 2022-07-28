import "../styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import store from "lib/app/store";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
const emCache = createEmotionCache({
  key: "mantine",
  prepend: false,
});
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>demo dyve.ch</title>
      </Head>
      <Provider store={store}>
        <MantineProvider
          withGlobalStyles={true}
          withNormalizeCSS={false}
          emotionCache={emCache}
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "light",
          }}
        >
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </MantineProvider>
      </Provider>
    </>
  );
}

export default appWithTranslation(MyApp);
