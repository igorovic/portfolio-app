import { GetStaticPropsContext, NextPage } from "next";
import AppShellLayout from "components/layout/appshellLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
//import MediaPreview from "components/MediaPreview";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TwitterDl = dynamic(
  () => import("../../components/twitter-download/TwitterDl"),
  {
    suspense: true,
  }
);
const TwitterDownloadPage: NextPage<any> = () => {
  return (
    <AppShellLayout>
      <Suspense fallback={<p>...loading</p>}></Suspense>
      <TwitterDl />
    </AppShellLayout>
  );
};

export default TwitterDownloadPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "footer",
        "appshell",
        "validation-errors",
      ])),
      // Will be passed to the page component as props
    },
  };
}
