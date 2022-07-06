import NextLink from "next/link";
import { UnstyledButton } from "@mantine/core";
interface NavLinkProps {
  text: string;
  href: string;
}
function NavLink({ text, href }: NavLinkProps) {
  return (
    <NextLink href={href}>
      <UnstyledButton
        className="block hover:bg-slate-100"
        //@ts-ignore errors since @react/type@18.0.4
        component="a"
      >
        <span className="text-ellipsis overflow-hidden whitespace-nowrap">
          {text}
        </span>
      </UnstyledButton>
    </NextLink>
  );
}

export default NavLink;
