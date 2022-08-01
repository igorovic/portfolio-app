import DropZone from "components/dropzone/DropZone";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import Script from "next/script";
import { useCallback, useEffect } from "react";
import { pdfUrlObject } from "./store";
const adboeLocale: Record<string, string> = {
  fr: "fr-FR",
  en: "en-US",
};
function PdfEmbed() {
  const { locale } = useRouter();
  const [pdfUrlObj, setPdfUrlObj] = useAtom(pdfUrlObject);
  console.debug(pdfUrlObj);
  let adobeDCView: any;
  const onDrop = useCallback(
    (files: FileList) => {
      console.debug(files);
      if (!adobeDCView || files.length === 0) return;
      const file = files[0];
      const fileObjUrl = URL.createObjectURL(new Blob([file]));
      setPdfUrlObj(fileObjUrl);
      const reader = new FileReader();
      reader.onloadend = function (e) {
        if (!e.target) {
          console.error("No file", e);
          return;
        }

        var filePromise = Promise.resolve(e.target?.result);
        adobeDCView?.previewFile(
          {
            content: {
              promise: filePromise,
            },
            metaData: { fileName: file.name },
          },
          {
            embedMode: "SIZED_CONTAINER",
          }
        );
      };
      reader.readAsArrayBuffer(file);
    },
    [adobeDCView, setPdfUrlObj]
  );

  const adobeDCViewReady = () => {
    //@ts-expect-error
    adobeDCView = new AdobeDC.View({
      clientId: `${process.env.NEXT_PUBLIC_ADOBE_APIKEY_PDFEMBED}`,
      divId: "adobe-dc-view",
      locale: locale ? adboeLocale[locale] : "en-US",
    });
    adobeDCView.registerCallback(
      /* Type of call back */
      //@ts-expect-error
      AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
      /* call back function */
      function (event: any) {
        console.log(event);
      },
      /* options to control the callback execution */
      {
        /* Enable PDF analytics events on user interaction. */
        //enablePDFAnalytics: true,
      }
    );
  };

  useEffect(() => {
    document.addEventListener("adobe_dc_view_sdk.ready", adobeDCViewReady);
    return () =>
      document.removeEventListener("adobe_dc_view_sdk.ready", adobeDCViewReady);
  });

  return (
    <>
      <Script src="https://documentcloud.adobe.com/view-sdk/main.js" />
      <DropZone onDrop={onDrop} label="drag and drop pdf here" />
      <div id="adobe-dc-view" className="mt-4 h-full"></div>
    </>
  );
}

export default PdfEmbed;
