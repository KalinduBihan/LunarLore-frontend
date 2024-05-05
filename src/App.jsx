import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa6";
import { useAuthContext } from "./hooks/useAuthContext";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import News from "./pages/News";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { user } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const shimmerElement = document.querySelector(".animate-shimmer");

      if (scroll > 172) {
        shimmerElement?.classList.remove("hidden");
        shimmerElement?.classList.add("inline-flex");
      } else {
        shimmerElement?.classList.add("hidden");
        shimmerElement?.classList.remove("inline-flex");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="upArrow fixed hidden z-50 bottom-4 right-6 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      >
        <FaArrowUp />
      </button>
      <NavBar />
      <div className="mt-0 py-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
