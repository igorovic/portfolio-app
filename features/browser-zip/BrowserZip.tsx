import { Button } from "@mantine/core";
import LinkBlank from "components/LinkBlank";
import { useCallback, useState } from "react";
import JSZip from "jszip";

function BrowserZip() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const dlZip = useCallback(() => {
    const jsZip = new JSZip();
    fetch("/api/zip/download?file=archive1")
      .then((r) => r.arrayBuffer())
      .then(async (buf) => {
        const zip = await jsZip.loadAsync(buf);
<<<<<<< HEAD
        console.log(zip);
        const greetings = await zip.file("greetings.json")?.async("string");
        console.log(greetings);
=======
        console.debug(zip);
        const greetings = await zip.file("greetings.json")?.async("string");
        console.debug(greetings);
>>>>>>> be07679 (feat: extract zip in browser)
        const corgi = await zip.file("corgi.jpeg")?.async("blob");
        if (corgi) {
          setImgSrc(URL.createObjectURL(corgi));
        }
      });
  }, []);
  return (
    <div>
      <p>
        This will uncompress a zip archive in the browser using&nbsp;
        <LinkBlank href="https://www.npmjs.com/package/jszip">
          <code>jsZip</code>
        </LinkBlank>
      </p>
      <p>all the process is executed in the browser</p>
      <Button onClick={dlZip} className="my-2">
        Uncompress
      </Button>
      <div>
        {imgSrc ? (
          //eslint-disable-next-line @next/next/no-img-element
          <img src={imgSrc} alt="image" />
        ) : null}
      </div>
    </div>
  );
}

export default BrowserZip;
