import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export default function Earth(props) {
  const { nodes, materials } = useGLTF("/earth.gltf");
  const earthGroupRef = useRef();

  useFrame(() => {
    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <group
      ref={earthGroupRef}
      position={[0, -2.65, 0.3]}
      {...props}
      dispose={null}
    >
      <group scale={[3.3, 3.3, 3.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials.heightmap_ref_group}
          scale={1.6}
        />
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials.heightmap_ref_group}
          scale={1.6}
        />
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.heightmap_ref_group}
          scale={1.6}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials.heightmap_ref_group}
          scale={1.6}
        />
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials.heightmap_ref_group}
          scale={1.6}
        />
        <mesh
          geometry={nodes.Object_7.geometry}
          material={materials.heightmap_ref_group}
          scale={1.6}
        />
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials.heightmap_ref_group}
          scale={1.6}
        />
        <mesh
          geometry={nodes.Object_9.geometry}
          material={materials.heightmap_ref_group}
          scale={1.6}
        />
        <mesh
          geometry={nodes.Object_10.geometry}
          material={materials.heightmap_ref_group}
          scale={1.6}
        />
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials.heightmap_ref_group}
          scale={1.6}
        />
        <mesh
          geometry={nodes.Object_12.geometry}
          material={materials.heightmap_ref_group}
          scale={1.6}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/earth.gltf");
