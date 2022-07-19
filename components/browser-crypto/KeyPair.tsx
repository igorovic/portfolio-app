import { Button } from "@mantine/core";
import { useCallback } from "react";

/**
 * # Notes
 * There is no proper way to generate public private key in the browser.
 * The private key can not be exported which makes sens.
 * Wondering what are the practical use cases for crypto and crypto.subtle ?
 */
function KeyPair() {
  const genKeyPair = useCallback(async () => {
    if (typeof window === "undefined") return;
    let rsaKeyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      /* {
        name: "ECDSA",
        namedCurve: "P-521",
      }, */
      true,
      ["encrypt", "decrypt"]
    );
    console.debug("keyPair", rsaKeyPair);
    const expPub = await window.crypto.subtle.exportKey(
      "spki",
      rsaKeyPair.publicKey
    );
    try {
      const expPriv = await window.crypto.subtle.exportKey(
        "spki",
        rsaKeyPair.privateKey
      );
    } catch (e: any) {
      console.warn("Trying to export private key fails as expected!");
      console.warn("\t\u2937 with error: %o", e);
    }
    console.debug("public", expPub);
  }, []);
  return (
    <div>
      <Button onClick={() => genKeyPair()}>test RSA keypair</Button>
    </div>
  );
}

export default KeyPair;
