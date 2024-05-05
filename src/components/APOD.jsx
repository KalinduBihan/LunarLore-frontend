import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Apod = () => {
  const [nasaApod, setNasaApod] = useState(null);
  const [shortenedVersion, setShortenedVersion] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const apiKey = import.meta.env.VITE_NASA_API_KEY;
  console.log(`APOD: ${apiKey}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
        );
        setNasaApod(response.data);
        const explanation = response.data.explanation;
        setShortenedVersion(
          explanation
            .split("")
            .filter((_, idx) =>
              isVisible ? idx < explanation.split("").length : idx < 600
            )
            .join("")
        );
      } catch (error) {
        console.error("Error fetching APOD:", error);
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [apiKey, isVisible]);

  return (
    <div id="apod">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="apod__heading text-4xl mt-3 mx-1 text-neutral-300 bg-gray-950 font-semibold text-center"
      >
        Astronomy Picture Of The Day
      </motion.p>
      <div class="sm:mx-1 mx-1 grid grid-cols-1 gap-0 sm:grid-cols-12 bg-gray-950">
        <div class="min-h-[400px] rounded-lg sm:col-span-5 flex items-center justify-center text-center">
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="apod__content"
          >
            {nasaApod && (
              <div className="text-neutral-300 text-center font-medium text-xl">
                <p className="mb-2 text-3xl">{nasaApod.title}</p>
                <p className="mb-4">-{nasaApod.date}-</p>
                <p className="text-justify mx-2">
                  {shortenedVersion.length > 0 && shortenedVersion}
                </p>
                <br />
                <span
                  onClick={() => setIsVisible((prev) => !prev)}
                  className="-mt-6 block cursor-pointer text-md text-gray-500"
                >
                  {isVisible
                    ? " Click here to hide"
                    : " Click here to see more"}
                </span>
              </div>
            )}
          </motion.aside>
        </div>
        <div class="min-h-[400px] sm:col-span-7 ">
          {nasaApod && (
            <div class="aspect-w-1 aspect-h-1">
              <embed
                className="object-fit my-2 sm:mx-4 ml-1 h-96 custom-hw"
                src={nasaApod.hdurl}
                type=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Apod;
