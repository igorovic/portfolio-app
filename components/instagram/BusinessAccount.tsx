import React from "react";
import { Button } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { useSession } from "next-auth/react";
import {
  getFacebookPermissions,
  getSessionProvider,
} from "lib/core/browser/api-client";
import { Maybe } from "types";
import SignIn from "components/SignIn";
import { Permission } from "lib/facebook/types";
import { useRouter } from "next/router";

type Provider = {
  provider: string | null;
};

const BusinessAccount = () => {
  const { t } = useTranslation("instagram");
  const { push } = useRouter();
  const { data: session } = useSession();
  const [provider, setProvider] = React.useState<string>();
  const [fbPermissions, setFbPermissions] = React.useState<Permission[]>([]);
  const sessionProvider = React.useMemo(async () => {
    if (session) {
      return (await getSessionProvider()) as Maybe<Provider>;
    }
  }, [session]);
  sessionProvider.then((p) => {
    if (p && p.provider) setProvider(p.provider);
  });

  const permissions = React.useMemo(async () => {
    return await getFacebookPermissions();
  }, []);
  permissions.then((P) => {
    if (P && P.permissions) {
      setFbPermissions(P.permissions);
    }
  });
  const grantedPageList = fbPermissions.some(
    (P) => P.permission === "pages_show_list" && P.status === "granted"
  );
  const grantedInstagramBasic = fbPermissions.some(
    (P) => P.permission === "instagram_basic" && P.status === "granted"
  );

  if (provider !== "facebook" || !session) {
    return (
      <>
        <p className="text-gray-500">You need to connect with facebook first</p>
        <SignIn />
      </>
    );
  }

  if (!grantedPageList || !grantedInstagramBasic) {
    return (
      <>
        <p>This page requires the permission to list business Pages</p>
        <Button
          onClick={() => {
            push("/api/facebook/rerequest");
          }}
        >
          grant instagram permissions
        </Button>
      </>
    );
  }

  return null;
};

export default BusinessAccount;
