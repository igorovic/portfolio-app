import NextLink from "next/link";
import { ActionIcon, Header } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";

import { repositoryUrl } from "contants";
import SignIn from "components/SignIn";
function AppShellHeader() {
  return (
    <Header height={60} p="xs">
      <div className="flex justify-end items-center gap-2">
        <NextLink href={repositoryUrl} target="_blank" passHref>
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
        <SignIn />
      </div>
    </Header>
  );
}

export default AppShellHeader;
