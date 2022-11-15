import { Suspense, useLayoutEffect } from "react";
import { GetStaticPropsContext, NextPage } from "next";
import AppShellLayout from "components/layout/appshellLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import "./signature.module.css";
import { registerLicense } from "@syncfusion/ej2-base";
// Registering Syncfusion license key
registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY ?? "");
//DOCS: https://ej2.syncfusion.com/react/documentation/signature/open-save/
const SignatureComponent = dynamic(() => import("../../features/signature"), {
  suspense: true,
});
const SignaturePage: NextPage<any> = () => {
  return (
    <AppShellLayout>
      <Suspense fallback={<p>...loading</p>}>
        <SignatureComponent />
      </Suspense>
    </AppShellLayout>
  );
};

export default SignaturePage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "footer",
        "appshell",
      ])),
      // Will be passed to the page component as props
    },
  };
}
