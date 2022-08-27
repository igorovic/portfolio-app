import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyles, createStylesServer } from "@mantine/next";
import { emCache } from "lib/emotionCache";

const stylesServer = createStylesServer(emCache());

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    // Add your app specific logic here

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles
          html={initialProps.html}
          server={stylesServer}
          key="mantine"
        />,
      ],
    };
  }
  render() {
    return (
      <Html data-theme="light">
        <Head>
          <link rel="icon" type="image/png" href="/favicon.png" />
          <meta name="description" content="dyve.ch demo app" />
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
