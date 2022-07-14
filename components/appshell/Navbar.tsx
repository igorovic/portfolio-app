import { Navbar, NavbarProps } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { Accordion } from "@mantine/core";

import NavLink from "./NavLink";
import { useNavbarOpened } from "./store";
import { useRouter } from "next/router";

type AppLink = { text: string; href: string };

type AppLinkComponentProps = {
  links: AppLink[];
};

const AppLinkComponent = ({ links }: AppLinkComponentProps) => {
  return (
    <>
      {links.map((props) => (
        <NavLink key={props.href} {...props} />
      ))}
    </>
  );
};

type AppShellNavbarProps = Omit<NavbarProps, "children">;
function AppShellNavbar(props: AppShellNavbarProps) {
  const { pathname } = useRouter();
  const { t } = useTranslation("appshell");
  const [opened] = useNavbarOpened();
  const medias = [{ text: t("Image preview"), href: "/app/media-preview" }];
  const socials = [{ text: "Instagram", href: "/app/instagram" }];
  const canvas = [{ text: "Canva", href: "/app/canva" }];
  let initialItem = 0;
  [...medias, ...socials, ...canvas]
    .map((S) => S.href)
    .some((s, idx) => {
      initialItem = idx;
      return s.startsWith(pathname);
    });

  return (
    <Navbar hidden={!opened} p="xs" {...props}>
      {/* <span className="drawer-section-title">{t("Media files")}</span> */}
      <Navbar.Section>
        <Accordion initialItem={initialItem}>
          <Accordion.Item sx={{ border: 0 }} label="Media files">
            <AppLinkComponent links={medias} />
          </Accordion.Item>
          <Accordion.Item sx={{ border: 0 }} label="Socials">
            <AppLinkComponent links={socials} />
          </Accordion.Item>
          <Accordion.Item sx={{ border: 0 }} label="Canva">
            <AppLinkComponent links={canvas} />
          </Accordion.Item>
        </Accordion>
      </Navbar.Section>
    </Navbar>
  );
}

export default AppShellNavbar;
