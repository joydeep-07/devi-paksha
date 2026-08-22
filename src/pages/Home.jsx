import React, { useMemo } from "react";
import Navbar from "../layouts/Navbar";
import MusicPlayer from "../components/MusicPlayer";

// Mobile (tall) images
import morningTall from "../assets/images/morning_tall.png";
import dayTall from "../assets/images/day_tall.png";
import eveningTall from "../assets/images/evening_tall.png";
import nightTall from "../assets/images/night_tall.png";

// Laptop / Desktop images
import morning from "../assets/images/morning.png";
import day from "../assets/images/day.png";
import evening from "../assets/images/evening.png";
import night from "../assets/images/night.png";

const Home = () => {
  // Get current hour in IST (0–23)
  const getISTHour = () => {
    return parseInt(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        hour12: false,
      }),
      10,
    );
  };

  // Choose both mobile + desktop images based on IST hour
  const { mobileImage, desktopImage } = useMemo(() => {
    const hour = getISTHour();

    // Morning only 4 AM – 6 AM
    if (hour >= 4 && hour < 6) {
      return { mobileImage: morningTall, desktopImage: morning };
    }
    // Day from 6 AM onwards
    if (hour >= 6 && hour < 16) {
      return { mobileImage: dayTall, desktopImage: day };
    }
    // Evening
    if (hour >= 16 && hour < 20) {
      return { mobileImage: eveningTall, desktopImage: evening };
    }
    // Night: 20–23 and 0–3
    return { mobileImage: nightTall, desktopImage: night };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Navbar />

      <h1
        className="
          absolute
          top-[100px]
          left-1/2
          z-10
          -translate-x-1/2
          whitespace-nowrap
          text-6xl
          font-light
          text-amber-300
          md:text-7xl
          lg:text-[130px]
          font-bengali
        "
      >
        দুগ্গা এলো
      </h1>

      <picture>
        {/* Mobile */}
        <source media="(max-width: 767px)" srcSet={mobileImage} />

        {/* Tablet + Desktop */}
        <img
          src={desktopImage}
          loading="lazy"
          alt="dugga dugga"
          className="h-full w-full object-cover object-left lg:object-center"
        />
      </picture>

      <MusicPlayer />
    </div>
  );
};

export default Home;
