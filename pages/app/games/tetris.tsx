import { GetStaticPropsContext, NextPage } from "next";
import AppShellLayout from "components/layout/appshellLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
//import MediaPreview from "components/MediaPreview";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TetrisGame = dynamic(
  () => import("../../../components/games/tetris/Tetris"),
  {
    suspense: true,
  }
);
const TetrisPage: NextPage<any> = () => {
  return (
    <AppShellLayout>
      <Suspense fallback={<p>...loading</p>}>
        <TetrisGame />
      </Suspense>
    </AppShellLayout>
  );
};

export default TetrisPage;

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
