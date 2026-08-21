import React from "react";

const Home = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <img
        src="./images/night.png"
        loading="lazy"
        alt="dugga dugga"
        className="h-full w-full object-cover object-left md:object-left lg:object-center"
      />
    </div>
  );
};

export default Home;
