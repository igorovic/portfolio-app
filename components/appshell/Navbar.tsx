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
  const socials = [
    { text: "Instagram", href: "/app/instagram" },
    { text: "Twitter downloaded", href: "/app/twitter-download" },
  ];
  const canvas = [{ text: "Canva", href: "/app/canva" }];
  let initialItem = "0";
  [...medias, ...socials, ...canvas]
    .map((S) => S.href)
    .some((s, idx) => {
      initialItem = String(idx);
      return s.startsWith(pathname);
    });

  return (
    <Navbar hidden={!opened} p="xs" {...props}>
      {/* <span className="drawer-section-title">{t("Media files")}</span> */}
      <Navbar.Section>
        <Accordion defaultValue={initialItem}>
          <Accordion.Item sx={{ border: 0 }} value="0">
            <Accordion.Control>Media files</Accordion.Control>
            <Accordion.Panel>
              <AppLinkComponent links={medias} />
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item sx={{ border: 0 }} value="1">
            <Accordion.Control>Socials</Accordion.Control>
            <Accordion.Panel>
              <AppLinkComponent links={socials} />
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item sx={{ border: 0 }} value="2">
            <Accordion.Control>Canva</Accordion.Control>
            <Accordion.Panel>
              <AppLinkComponent links={canvas} />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Navbar.Section>
    </Navbar>
  );
}

export default AppShellNavbar;
