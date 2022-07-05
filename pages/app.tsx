import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  NextPage,
} from "next";
import {
  AppShell,
  Navbar,
  Header,
  Aside,
  Footer,
  UnstyledButton,
} from "@mantine/core";
import SignIn from "components/SignIn";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IconBrandGithub } from "@tabler/icons";
import { ActionIcon } from "@mantine/core";

import NextLink from "next/link";
import { repositoryUrl } from "contants";
import { useTranslation } from "next-i18next";
/* import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { useNavigate } from "react-router-dom"; */

const Dashboard = () => {
  const { t } = useTranslation("common");

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <span className="drawer-section-title">{t("Media files")}</span>
          <Navbar.Section>
            <UnstyledButton className="block" component="a">
              images
            </UnstyledButton>

            <NextLink href={"#"}>
              <UnstyledButton className="block" component="a">
                images
              </UnstyledButton>
            </NextLink>
            <NextLink href={"#"}>
              <UnstyledButton className="block" component="a">
                images
              </UnstyledButton>
            </NextLink>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <div className="flex justify-end items-center gap-2">
            <NextLink href={repositoryUrl} target="_blank" passHref>
              <ActionIcon
                variant="outline"
                size="lg"
                component="a"
                target={"_blank"}
              >
                <IconBrandGithub />
              </ActionIcon>
            </NextLink>
            <SignIn />
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {/* Your application here */}

      {/* <Outlet /> */}
    </AppShell>
  );
};

/* const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/app" element={<Dashboard />}>
        <Route path="/app" element={<p>Test</p>} />
        <Route path="/app/images" element={<p>images</p>} />
      </Route>
    </Routes>
  );
};

const ServerRouter = ({ location }: any) => {
  return (
    <StaticRouter location={location}>
      <AppRoutes />
    </StaticRouter>
  );
};

const ClientRouter = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}; */

const AppBase: NextPage<any> = ({ location }) => {
  return <Dashboard />;
};

export default AppBase;

// export async function getStaticProps({ locale }: GetStaticPropsContext) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale ?? "en", ["common", "footer"])),
//       // Will be passed to the page component as props
//     },
//   };
// }

export async function getServerSideProps({
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
}
