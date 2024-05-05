import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Earth3D from "../../public/Earth";

const Earth = () => {
  const [zoomLimits] = useState({ minZoom: 0, maxZoom: 5 });

  return (
    <div
      className="mx-1 mt-3 mr-0 grid grid-cols-1 gap-1 sm:grid-cols-12 bg-gray-950"
      id="earth"
    >
      <div class="min-h-[100px] sm:col-span-6 -ml-1 flex items-center justify-center">
        <Canvas>
          <ambientLight intensity={1} />
          <OrbitControls
            enableZoom={false}
            enableRotate={false}
            minDistance={zoomLimits.minZoom}
            maxDistance={zoomLimits.maxZoom}
            position={[0, 0, 20]}
          />
          <Suspense fallback={null}>
            <Earth3D />
          </Suspense>
          <Environment preset="sunset" />
        </Canvas>
      </div>
      <div class="min-h-[100px] text-white sm:col-span-6 sm:text-right text-center flex flex-col justify-center w-full lg:w-3/4">
        <p className="earthCustuom ">Our Planet Is Changing</p>
        <p className="earthText my-5 mr-1">
          See our impact on the Earth from a new perspective through 37 years of
          satellite imagery in Timelapse in Google Earth. Timelapse is one
          example of how Earth Engine can help gain insight into petabyte-scale
          datasets.
        </p>

        <div className="my-3">
          <button className="p-[2px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"></div>
            <a href="https://earth.google.com/web/@-8.40654841,-74.55101122,178.16746035a,121319.96573629d,35y,359.998737h,0t,0r/c/Cg9qDQgBEAEZAAAAAAAA8D8">
              <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                Explore Timelapse
              </div>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Earth;
