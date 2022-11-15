import * as THREE from "three";

import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Center,
  softShadows,
  Sky,
  useHelper,
} from "@react-three/drei";
import { MeshPhongMaterial } from "three";
softShadows();
function Box(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

const Ground = () => {
  const ref = useRef<THREE.Mesh>(null!);
  return (
    <>
      <mesh
        ref={ref}
        scale={20}
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <planeGeometry />
        {/* <shadowMaterial transparent={false} opacity={0.5} /> */}
        <meshStandardMaterial color="#9BB9EB" />
        <lineSegments>
          <bufferGeometry
            //@ts-ignore
            setFromPoints={[
              new THREE.Vector3(1, 2, 3),
              new THREE.Vector3(1, 2, 3),
            ]}
          />
          <lineBasicMaterial color="#000000" opacity={1} />
        </lineSegments>
      </mesh>
      {/* <mesh scale={20} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry />
        <shadowMaterial transparent={true} opacity={0.5} />
      </mesh> */}
    </>
  );
};

const Debug = () => {
  const { camera } = useThree();
  console.debug(camera);
  return null;
};

function Editor3D() {
  return (
    <Canvas
      shadows
      /* raycaster={{ params: { Line: { threshold: 0.15 } } }}
      camera={{ position: [-10, 10, 10], fov: 20 }} */
    >
      <ambientLight intensity={0.5} />
      <OrbitControls makeDefault={true} maxDistance={50} minDistance={3} />

      {/* <pointLight position={[10, 10, 10]} /> */}
      <directionalLight
        castShadow
        position={[2.5, 5, 5]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
        //{...props}
      />
      <Box position={[0, 1.2, 0]} />
      <Ground />
      <Debug />
    </Canvas>
  );
}

export default Editor3D;
