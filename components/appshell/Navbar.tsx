import { Navbar, NavbarProps } from "@mantine/core";
import { useTranslation } from "next-i18next";

import NavLink from "./NavLink";
import { useNavbarOpened } from "./store";

type AppShellNavbarProps = Omit<NavbarProps, "children">;
function AppShellNavbar(props: AppShellNavbarProps) {
  const { t } = useTranslation("appshell");
  const [opened] = useNavbarOpened();
  const links = [{ text: t("Image preview"), href: "/app/media-preview" }].map(
    (props) => <NavLink key={props.href} {...props} />
  );

  return (
    <Navbar hidden={!opened} p="xs" {...props}>
      <span className="drawer-section-title">{t("Media files")}</span>
      <Navbar.Section>{links}</Navbar.Section>
    </Navbar>
  );
}

export default AppShellNavbar;
