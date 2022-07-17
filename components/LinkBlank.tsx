import Link from "next/link";
import { PropsWithChildren } from "react";

interface LinkBlankProps {
  href: string;
}

function LinkBlank({ href, children }: PropsWithChildren<LinkBlankProps>) {
  return (
    <Link href={href}>
      <a target={"_blank"} rel="noreferrer">
        {children}
      </a>
    </Link>
  );
}

export default LinkBlank;
