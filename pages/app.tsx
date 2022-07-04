import { NextPage } from "next";
import { AppShell, Navbar, Header, Aside, Footer } from "@mantine/core";
import SignIn from "components/SignIn";
const AppBase: NextPage = () => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          {/* navigation */}
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <div className="flex justify-end">
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
      <p>app comes here</p>
    </AppShell>
  );
};

export default AppBase;
