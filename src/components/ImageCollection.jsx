import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PreviewImage = ({ imageName }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axios.get(
          `https://images-api.nasa.gov/asset/${imageName}`
        );
        const items = response.data.collection.items;
        if (items.length > 0) {
          const imageUrl = items.find((item) =>
            item.href.includes("~orig")
          )?.href;
          setImageUrl(imageUrl || "");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchImageData();
  }, [imageName]);

  return (
    <div>
      {imageUrl ? <img src={imageUrl} alt="" /> : <p>No image found</p>}
    </div>
  );
};

const ImageCollection = () => {
  const imageArray = [
    "PIA18033",
    "PIA25165",
    "GSFC_20171208_Archive_e001427",
    "as9-21-3199",
    "iss040e083604",
    "KSC-06pd2763",
    "PIA14114",
    "as11-40-5902",
    "as12-46-6813",
    "PIA00404",
    "PIA00342",
    "hubble-observes-one-of-a-kind-star-nicknamed-nasty_17754652960_o",
    "as12-46-6729",
    "9303730",
    "PIA04921",
    "PIA00271",
    "PIA25626",
    "as09-21-3212",
    "as12-46-6729",
    "S91-32389",
  ];

  return (
    <div className="imgContainer" id="gallery">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="testimonials__heading text-4xl mb-4 text-neutral-300 font-semibold text-center"
      >
        Gallery
      </motion.h1>
      <div className="photo-gallery">
        {[...Array(Math.ceil(imageArray.length / 4))].map((_, rowIndex) => (
          <div className="imgColumn" key={rowIndex}>
            {imageArray
              .slice(rowIndex * 5, rowIndex * 5 + 5)
              .map((imageName, index) => (
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="photo" key={index}>
                    <PreviewImage imageName={imageName} />
                  </div>
                </motion.p>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCollection;
