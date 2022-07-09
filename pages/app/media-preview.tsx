import { GetStaticPropsContext, NextPage } from "next";
import AppShellLayout from "components/layout/appshellLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
//import MediaPreview from "components/MediaPreview";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ImagePreview = dynamic(
  () => import("../../components/image-preview/ImagePreview"),
  {
    suspense: true,
  }
);
const MediaPreviewPage: NextPage<any> = () => {
  return (
    <AppShellLayout>
      <Suspense fallback={<p>...loading</p>}>
        <ImagePreview />
      </Suspense>
    </AppShellLayout>
  );
};

export default MediaPreviewPage;

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
