import Document, { Html, Head, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();
class MyDocument extends Document {
  static getInitialProps = getInitialProps;
  render() {
    return (
      <Html data-theme="light">
        <Head>
          <link rel="icon" type="image/png" href="/favicon.png" />
          <meta name="description" content="base project" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
