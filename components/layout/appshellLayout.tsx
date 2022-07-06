import { AppShell } from "@mantine/core";
import AppShellHeader from "components/appshell/Header";
import AppShellNavbar from "components/appshell/Navbar";
import { PropsWithChildren } from "react";

function AppShellLayout({ children }: PropsWithChildren<any>) {
  return (
    <AppShell
      padding="md"
      navbar={<AppShellNavbar />}
      header={<AppShellHeader />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}

export default AppShellLayout;
