import { Navbar } from "@mantine/core";
import { useTranslation } from "next-i18next";
import NavLink from "./NavLink";

function AppShellNavbar() {
  const { t } = useTranslation("appshell");
  const links = [{ text: t("Image preview"), href: "/app/media-preview" }].map(
    (props) => <NavLink key={props.href} {...props} />
  );

  return (
    <Navbar width={{ base: 300 }} height={500} p="xs">
      <span className="drawer-section-title">{t("Media files")}</span>
      <Navbar.Section>{links}</Navbar.Section>
    </Navbar>
  );
}

export default AppShellNavbar;
