import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { MdDateRange } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MarsCard from "./MarsCard";

const MarsRover = () => {
  const API_KEY = "aSfPyVW8miE30LYg9OLtjGy9HRafPfcNRcnUST90";
  const API_BASE_URL =
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

  const [photos, setPhotos] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(3); // Default slides per view
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() - 10); // Set default selected date to today - 10 days
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  });

  // Function to fetch photos based on selected date
  const fetchPhotosByDate = async (date) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}?earth_date=${date}&api_key=${API_KEY}`
      );
      const data = await response.json();
      setPhotos(data.photos);
    } catch (error) {
      console.error("Error fetching Mars photos:", error);
    }
  };

  useEffect(() => {
    // Fetch the last photo's earth_date when component mounts
    const fetchLastPhotoDate = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}?sol=1000&api_key=${API_KEY}`
        );
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          const lastPhoto = data.photos[data.photos.length - 1];
          console.log("Last photo:", lastPhoto.earth_date);
          setSelectedDate(lastPhoto.earth_date);
          // Fetch photos based on the last photo's date
          fetchPhotosByDate(lastPhoto.earth_date);
        } else {
          console.log("No photos found.");
        }
      } catch (error) {
        console.error("Error fetching last photo:", error);
      }
    };

    fetchLastPhotoDate();
  }, []);

  // Determine slides per view based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setSlidesPerView(1);
      } else if (width < 768) {
        setSlidesPerView(2);
      } else if (width < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(4);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    fetchPhotosByDate(event.target.value); // Fetch photos when date is changed
  };

  return (
    <section id="mars">
      <div className="container relative justify-center bg-black">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="testimonials__heading text-4xl my-2 text-neutral-300 font-semibold text-center"
        >
          Mars Rover Photos
        </motion.h1>
        <motion.div className="date-picker-bar">
          {slidesPerView === 1 ? (
            <MdDateRange
              className="date-icon"
              style={{ color: "white", fontSize: "28px", cursor: "pointer" }}
            />
          ) : (
            <>
              <label htmlFor="datepicker" className="sr-only">
                Select a Date
              </label>
              <input
                type="date"
                id="datepicker"
                name="datepicker"
                className="date-input bg-gray-400"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileInView={{ opacity: 1 }}
          className="swiper_wrapper"
        >
          <div className="marscardDiv mt-10">
            <Swiper
              spaceBetween={10}
              slidesPerView={slidesPerView}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              scrollbar={{ draggable: true }}
              className="mySwiper flex gap-6 static"
            >
              {photos.map((photo) => (
                <SwiperSlide key={photo.id}>
                  <MarsCard
                    cameraName={photo.camera.name}
                    cameraFullName={photo.camera.full_name}
                    earthDate={photo.earth_date}
                    id={photo.id}
                    img_src={photo.img_src}
                    className="mySwiperCard"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              className="swiper-button-next"
              style={{ color: "white" }}
            ></div>
            <div
              className="swiper-button-prev"
              style={{ color: "white" }}
            ></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarsRover;
