import React from "react";
import Navbar from "../layouts/Navbar";
import MusicPlayer from "../components/MusicPlayer";

const Home = () => {
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
        <source
          media="(max-width: 767px)"
          srcSet="./images/night_tall.png"
        />

        {/* Tablet + Desktop */}
        <img
          src="./images/night.png"
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