import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import {
  //createGetInitialProps,
  ServerStyles,
  createStylesServer,
} from "@mantine/next";
import { emCache } from "lib/emotionCache";

//const getInitialProps = createGetInitialProps();
const stylesServer = createStylesServer(emCache);
class MyDocument extends Document {
  //static getInitialProps = getInitialProps;

  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles
          html={initialProps.html}
          server={stylesServer}
          key="styles"
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
          <meta name="emotion-insertion-point3" content="" />
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
