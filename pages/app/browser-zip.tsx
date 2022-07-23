import { Suspense } from "react";
import dynamic from "next/dynamic";
import { GetStaticPropsContext, NextPage } from "next";
import AppShellLayout from "components/layout/appshellLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const BrowserZip = dynamic(
  () => import("../../features/browser-zip/BrowserZip"),
  {
    suspense: true,
  }
);
const BrowserZipPage: NextPage<any> = () => {
  return (
    <AppShellLayout>
      <Suspense fallback={<p>...loading</p>}>
        <BrowserZip />
      </Suspense>
    </AppShellLayout>
  );
};

export default BrowserZipPage;

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
