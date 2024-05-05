import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import NewsCard from "./NewsCard";

// const apiKey = "421e3619dca8af72bc6d68f205ada4a9";
const apiKey = "261222f94b1d7410989d04f16fad06a1";

console.log("News: " + apiKey);

const SpaceNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const keywords = ["spaceship", "nasa", "Moon"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const promises = keywords.map(async (keyword) => {
          const response = await axios.get(
            `https://gnews.io/api/v4/search?q=${keyword}+exploration&lang=en&max=5&apikey=${apiKey}`
          );
          return response.data.articles;
        });

        const results = await Promise.all(promises);
        const allNews = results.flat();
        setNews(allNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="news">
      <div
        className={`container px-4 mx-auto py-2 ${
          loading && "flex flex-col items-center"
        }`}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="testimonials__heading text-4xl mb-8 text-neutral-300 text-center"
        >
          - Latest Astronomy updates -
        </motion.h1>

        {loading && (
          <div className="rays flex items-center after:w-40 after:h-40 justify-center"></div>
        )}
        {!loading && (
          <>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="news flex flex-col gap-6">
                {news.map((item, idx) => (
                  <NewsCard
                    key={idx}
                    title={item.title}
                    description={item.description}
                    img={item.image}
                    link={item.url}
                  />
                ))}
              </div>
            </motion.p>
          </>
        )}
      </div>
    </section>
  );
};

export default SpaceNews;
