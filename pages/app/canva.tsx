import { Suspense } from "react";
import { GetStaticPropsContext, NextPage } from "next";
import AppShellLayout from "components/layout/appshellLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

const CanvaComponent = dynamic(() => import("../../features/canva/canva"), {
  suspense: true,
});
const CanvaPage: NextPage<any> = () => {
  return (
    <AppShellLayout>
      <p className="pb-4">Playing with HTML Canvas</p>
      <Suspense fallback={<p>...loading</p>}>
        <CanvaComponent />
      </Suspense>
    </AppShellLayout>
  );
};

export default CanvaPage;

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
