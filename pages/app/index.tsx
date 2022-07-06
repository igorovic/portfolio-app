import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  NextPage,
} from "next";
import AppShellLayout from "components/layout/appshellLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const AppBase: NextPage<any> = () => {
  return (
    <AppShellLayout>
      <p>app component</p>
    </AppShellLayout>
  );
};

export default AppBase;

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

/* export async function getServerSideProps({
  locale,
  req,
}: GetServerSidePropsContext) {
  return {
    props: {
      location: req.url,
      ...(await serverSideTranslations(locale ?? "en", ["common", "footer"])),
      // Will be passed to the page component as props
    },
  };
} */
