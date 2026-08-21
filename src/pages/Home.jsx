import React from "react";
import Navbar from "../layouts/Navbar";
import MusicPlayer from "../components/MusicPlayer";

const Home = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
        <Navbar/>
      <img
        src="./images/night.png"
        loading="lazy"
        alt="dugga dugga"
        className="h-full w-full object-cover object-left md:object-left lg:object-center"
      />
      <MusicPlayer/>
    </div>
  );
};

export default Home;
