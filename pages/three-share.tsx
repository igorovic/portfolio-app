import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("../features/three-scene/ThreeScene"), {
  ssr: false,
  suspense: false,
});

const ThreeEditor: NextPage = () => {
  return (
    <>
      <Head>
        <title>3D share</title>
        <meta name="description" content="share preview of your 3D projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThreeScene />
    </>
  );
};

export default ThreeEditor;
