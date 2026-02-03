"use client";

import { useState, useEffect } from "react";

// Update props to accept bannerImages
export default function Carousel({ bannerImages }: { bannerImages: { image: string }[] }) {
  // Map bannerImages to a format similar to old slides, adding an 'id'
  const slides = bannerImages.map((img, index) => ({ id: index + 1, src: img.image }));

  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {
    // Only set up interval if there are slides
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setActiveSlide((current) => (current === slides.length ? 1 : current + 1));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [slides.length]); // Dependency on slides.length to re-run effect if images change

  const setSlide = (id: number) => {
    setActiveSlide(id);
  };

  const nextSlide = () => {
    setActiveSlide((current) => (current === slides.length ? 1 : current + 1));
  };

  const prevSlide = () => {
    setActiveSlide((current) => (current === 1 ? slides.length : current - 1));
  };

  // Render nothing if no slides
  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      {/* Slides */}
      <div className="relative overflow-hidden" style={{ height: "70vh" }}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              activeSlide === slide.id ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.src}
              className="w-full h-full object-cover"
              alt="Welcome image"
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      {slides.length > 1 && ( // Only show controls if more than one slide
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={prevSlide}
            className="bg-black bg-opacity-25 text-white p-2 rounded-full hover:bg-opacity-50 focus:outline-none cursor-pointer"
          >
            <i className="bi bi-chevron-left text-xl"></i>
          </button>
          <button
            onClick={nextSlide}
            className="bg-black bg-opacity-25 text-white p-2 rounded-full hover:bg-opacity-50 focus:outline-none cursor-pointer"
          >
            <i className="bi bi-chevron-right text-xl"></i>
          </button>
        </div>
      )}

      {/* Indicators */}
      {slides.length > 1 && ( // Only show indicators if more than one slide
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((slide) => (
            <button
              key={slide.id}
              onClick={() => setSlide(slide.id)}
              className={`w-3 h-3 rounded-full hover:bg-white focus:outline-none transition-colors duration-300 ${
                activeSlide === slide.id ? "bg-white" : "bg-white/50"
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}
