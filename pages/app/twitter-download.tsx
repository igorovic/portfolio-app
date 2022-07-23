import { Suspense } from "react";
import dynamic from "next/dynamic";
import { GetStaticPropsContext, NextPage } from "next";
import AppShellLayout from "components/layout/appshellLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const TwitterDl = dynamic(
  () => import("../../components/twitter-download/TwitterDl"),
  {
    suspense: true,
  }
);
const TwitterDownloadPage: NextPage<any> = () => {
  return (
    <AppShellLayout>
      <Suspense fallback={<p>...loading</p>}>
        <TwitterDl />
      </Suspense>
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
        "twitter-download/tdl",
      ])),
      // Will be passed to the page component as props
    },
  };
}
