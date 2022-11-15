import { Button } from "@mantine/core";
import { SignatureComponent } from "@syncfusion/ej2-react-inputs";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { useCallback, useRef, useState } from "react";
function Signature() {
  const signRef = useRef<SignatureComponent | null>(null);
  const dialogRef = useRef<DialogComponent | null>(null);
  const [visibility, setDialogVisibility] = useState(false);
  const getSignature = useCallback(() => {
    const s = signRef.current?.getSignature();
    console.debug(2);
    if (s && dialogRef.current) {
      dialogRef.current.content = s;
      setDialogVisibility(true);
    }
  }, []);
  const clearSignature = useCallback(() => {
    signRef.current?.clear();
    dialogClose();
  }, []);

  function onOverlayClick() {
    setDialogVisibility(false);
  }
  function dialogClose() {
    setDialogVisibility(false);
  }

  return (
    <div id="dialog-target">
      <div className="flex gap-4">
        <Button onClick={getSignature}>get Signature</Button>
        <Button onClick={clearSignature}>clear Signature</Button>
      </div>
      <div className="border-2 mt-4 rounded-md">
        <SignatureComponent
          ref={signRef}
          id="signature"
          className="w-full"
        ></SignatureComponent>
      </div>
      <DialogComponent
        ref={dialogRef}
        //width="250px"
        isModal={true}
        target="#dialog-target"
        visible={visibility}
        close={dialogClose}
        overlayClick={onOverlayClick}
      >
        This is a modal Dialog{" "}
      </DialogComponent>
    </div>
  );
}

export default Signature;
