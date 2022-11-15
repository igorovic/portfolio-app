import { GetStaticPropsContext, NextPage } from "next";
import AppShellLayout from "components/layout/appshellLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
//import MediaPreview from "components/MediaPreview";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const InstagramComponent = dynamic(
  () => import("../../components/instagram/instagram"),
  {
    suspense: true,
  }
);
const InstagramPage: NextPage<any> = () => {
  return (
    <AppShellLayout>
      <Suspense fallback={<p>...loading</p>}>
        <InstagramComponent />
      </Suspense>
    </AppShellLayout>
  );
};

export default InstagramPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "footer",
        "appshell",
        "instagram",
      ])),
      // Will be passed to the page component as props
    },
  };
}
