import React, { useState, useEffect } from "react";
import { BannerImages } from "../assets/image"

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-20 flex justify-center">
      <div className="w-11/12 sm:w-4/5 md:w-4/5 lg:w-3/4 flex items-center justify-center">
        <img
          src={BannerImages[currentIndex]}
          alt={`Banner ${currentIndex + 1}`}
          className="w-full max-h-[80vh] object-cover rounded-2xl shadow-xl 
transition-all duration-1000 ease-in-out 
opacity-100 scale-100"
        />
      </div>
    </div>
  );
}

export default Banner;
