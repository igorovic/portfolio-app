import { Button, Avatar, UnstyledButton } from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";
import { IconUser } from "@tabler/icons";
import { Menu } from "@mantine/core";
import { forwardRef } from "react";
import { Divider } from "@mantine/core";

const MenuControl = forwardRef<any, any>((props, ref) => {
  return (
    <UnstyledButton ref={ref} {...props}>
      <Avatar radius={"xl"}>
        <IconUser />
      </Avatar>
    </UnstyledButton>
  );
});

MenuControl.displayName = "MenuControl";

function SignIn() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Menu control={<MenuControl />}>
        <Menu.Label className="font-semibold text-center">
          {session.user?.email}
        </Menu.Label>
        <Divider />
        <UnstyledButton className="mx-4" onClick={() => signOut()}>
          Sign out
        </UnstyledButton>
      </Menu>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}

export default SignIn;
