import { Button } from "@mantine/core";
import { useEffect, useRef } from "react";
import Scene from "./sceneEngine";

/**
 * Client only component
 */
function ThreeScene() {
  const sceneRef = useRef(Scene);
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (containerRef.current) {
      scene.init(containerRef.current);
    }

    return () => {
      scene.dispose();
    };
  });
  return (
    <main ref={containerRef} id="container" className="relative">
      <div className="sticky bottom-0">
        <Button
          onClick={() => {
            const objs = JSON.parse(
              window.localStorage.getItem("url_obj_store") ?? "[]"
            ) as string[];
            objs.forEach((blobUrl) => {
              try {
                fetch(blobUrl)
                  .then((r) => console.debug(r))
                  .catch((err) => console.info(err));
              } catch (err) {
                console.info(err);
              }
            });
          }}
        >
          test
        </Button>
        <Button>toggle render</Button>
      </div>
    </main>
  );
}

export default ThreeScene;
