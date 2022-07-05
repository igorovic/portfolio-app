import { Button, Avatar, UnstyledButton } from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";

import { IconUser } from "@tabler/icons";
import { Menu } from "@mantine/core";
import { forwardRef } from "react";
import { Divider } from "@mantine/core";

import { useTranslation } from "next-i18next";

interface MenuProps {
  user?: Record<string, string | null | undefined>;
}
const MenuControl = forwardRef<any, MenuProps>(({ user, ...props }, ref) => {
  return (
    <UnstyledButton ref={ref} {...props}>
      <Avatar radius={"xl"} src={user?.image}>
        <IconUser />
      </Avatar>
    </UnstyledButton>
  );
});

MenuControl.displayName = "MenuControl";

function SignIn() {
  const { data: session } = useSession();
  const { t } = useTranslation("common");
  console.debug(session?.user);
  if (session) {
    return (
      <Menu control={<MenuControl user={session?.user} />}>
        <Menu.Label className="font-semibold text-center">
          {session.user?.email}
        </Menu.Label>
        <Divider />
        <UnstyledButton className="mx-4" onClick={() => signOut()}>
          {t("signout")}
        </UnstyledButton>
      </Menu>
    );
  }
  return (
    <>
      <Button onClick={() => signIn()}>{t("signin")}</Button>
    </>
  );
}

export default SignIn;
