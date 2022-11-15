import React from "react";
import NextLink from "next/link";
import { ActionIcon, Header, Burger, MediaQuery } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";

import { repositoryUrl } from "contants";
import SignIn from "components/SignIn";
import { useNavbarOpened } from "./store";

function AppShellHeader() {
  const [opened, setOpened] = useNavbarOpened();

  return (
    <Header height={60} p="xs">
      <div className="flex">
        <MediaQuery largerThan={"md"} styles={{ visibility: "hidden" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

        <div className="flex flex-1 justify-end items-center gap-2">
          <NextLink href={repositoryUrl} target="_blank" passHref legacyBehavior>
            <ActionIcon
              variant="outline"
              size="lg"
              //@ts-ignore errors since @react/type@18.0.4
              component="a"
              target={"_blank"}
            >
              <IconBrandGithub />
            </ActionIcon>
          </NextLink>
          {/* <SignIn /> */}
        </div>
      </div>
    </Header>
  );
}

export default AppShellHeader;
