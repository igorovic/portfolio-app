import Link from "next/link";
import { PropsWithChildren } from "react";

interface LinkBlankProps {
  href: string;
}

function LinkBlank({ href, children }: PropsWithChildren<LinkBlankProps>) {
  return (
    <Link href={href} target={"_blank"}>
      {children}
    </Link>
  );
}

export default LinkBlank;
