import { Suspense } from "react";
import { GetStaticPropsContext, NextPage } from "next";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AppShellLayout from "components/layout/appshellLayout";

const PdfEmbed = dynamic(() => import("../../features/pdf-embed/PdfEmbed"), {
  suspense: true,
});

const PdfEmbedPage: NextPage<any> = () => {
  return (
    <AppShellLayout>
      <Suspense fallback={<p>...loading</p>}>
        <PdfEmbed />
      </Suspense>
    </AppShellLayout>
  );
};

export default PdfEmbedPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "footer",
        "appshell",
      ])),
      // Will be passed to the page component as props
    },
  };
}
