import { motion } from "framer-motion";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext"; // Import useAuthContext hook

import APOD from "../components/APOD";
import ImageCollection from "../components/ImageCollection";
import Planet from "../components/Planet";
import MarsRover from "../components/Mars-Rover/MarsRover";

export default function Home() {
  const { user } = useAuthContext(); // Get user authentication status

  return (
    <div>
      <section className="pt-[72px] overflow-hidden relative" id="homeTop">
        <div className="container relative z-10 bg flex flex-col gap-2 justify-center items-center h-[calc(100vh-72px)] mx-auto px-4">
          <div className="absolute -top-12 right-6">
            {/* only render the News button based on user authentication if onlu user is loged in*/}
            {user && (
              <button className="p-[2px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"></div>
                <RouterLink to="/news">
                  <div className="px-14 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                    News
                  </div>
                </RouterLink>
              </button>
            )}
          </div>
          <motion.h1
            initial={{ opacity: 0, x: -600 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", bounce: 0.45, duration: 3 }}
            className="hero__title text-center text-2xl md:text-3xl lg:text-4xl font-semibold  items-center gap-2 text-white "
          >
            Experience the Marvels of the Universe with
            <span className="font-secondary ms-2">
              Lunar
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-400 to-green-200">
                Lore
              </span>
            </span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, x: 600 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", bounce: 0.45, duration: 3 }}
            className="hero__description text-center mt-3 md:mt-5 md:max-w-3xl  text-xl md:text-3xl lg:text-2xl text-white font-semibold"
          >
            Discover the Wonders of the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r font-semibold from-lime-600 via-lime-400 to-lime-200">
              Universe
            </span>
            , Engage with Fellow{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-400 font-bold">
              Space Enthusiasts
            </span>
            , and Stay Updated on the Latest Celestial Adventures.
          </motion.h2>
        </div>
      </section>
      <Planet />
      <APOD />
      <MarsRover />
      <ImageCollection />
    </div>
  );
}
