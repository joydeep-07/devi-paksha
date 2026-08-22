import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../layouts/Navbar";
import MusicPlayer from "../components/MusicPlayer";
import { pujo, mahalaya } from "../utils/music";

// Mobile images
import morningTall from "../assets/images/morning_tall.png";
import dayTall from "../assets/images/day_tall.png";
import eveningTall from "../assets/images/evening_tall.png";
import nightTall from "../assets/images/night_tall.png";

// Desktop images
import morning from "../assets/images/morning.png";
import day from "../assets/images/day.png";
import evening from "../assets/images/evening.png";
import night from "../assets/images/night.png";

const Home = () => {
  const audioRef = useRef(null);

  const [playlist, setPlaylist] = useState("pujo");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Music progress
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentPlaylist = playlist === "pujo" ? pujo : mahalaya;

  const currentSong = currentPlaylist[currentIndex];

  // --------------------------------
  // Load current song
  // --------------------------------
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentSong) {
      setCurrentTime(0);
      setDuration(0);
      return;
    }

    audio.src = currentSong.src;
    audio.load();

    setCurrentTime(0);
    setDuration(0);

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
    }
  }, [currentSong]);

  // --------------------------------
  // Play / Pause
  // --------------------------------
  const handlePlay = () => {
    const audio = audioRef.current;

    if (!audio || !currentSong) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Audio playback failed:", error);
        });
    }
  };

  // --------------------------------
  // Next
  // --------------------------------
  const handleNext = () => {
    if (!currentPlaylist.length) return;

    setCurrentIndex((prev) => {
      if (prev >= currentPlaylist.length - 1) {
        return 0;
      }

      return prev + 1;
    });

    setIsPlaying(true);
  };

  // --------------------------------
  // Previous
  // --------------------------------
  const handlePrevious = () => {
    if (!currentPlaylist.length) return;

    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return currentPlaylist.length - 1;
      }

      return prev - 1;
    });

    setIsPlaying(true);
  };

  // --------------------------------
  // Select song
  // --------------------------------
  const handleSelectSong = (song) => {
    const index = currentPlaylist.findIndex((item) => item.src === song.src);

    if (index === -1) return;

    setCurrentIndex(index);
    setIsPlaying(true);
  };

  // --------------------------------
  // Song ended
  // --------------------------------
  const handleEnded = () => {
    handleNext();
  };

  // --------------------------------
  // Playlist change
  // --------------------------------
  const handlePlaylistChange = (newPlaylist) => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setPlaylist(newPlaylist);
    setCurrentIndex(0);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  };

  // --------------------------------
  // Audio metadata loaded
  // --------------------------------
  const handleLoadedMetadata = (e) => {
    setDuration(e.currentTarget.duration);
  };

  // --------------------------------
  // Audio time update
  // --------------------------------
  const handleTimeUpdate = (e) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  // --------------------------------
  // Get IST hour
  // --------------------------------
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

  // --------------------------------
  // Background image
  // --------------------------------
  const { mobileImage, desktopImage } = useMemo(() => {
    const hour = getISTHour();

    // 4 AM - 6 AM
    if (hour >= 4 && hour < 6) {
      return {
        mobileImage: morningTall,
        desktopImage: morning,
      };
    }

    // 6 AM - 4 PM
    if (hour >= 6 && hour < 16) {
      return {
        mobileImage: dayTall,
        desktopImage: day,
      };
    }

    // 4 PM - 8 PM
    if (hour >= 16 && hour < 20) {
      return {
        mobileImage: eveningTall,
        desktopImage: evening,
      };
    }

    // 8 PM - 4 AM
    return {
      mobileImage: nightTall,
      desktopImage: night,
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Navbar />

      {/* Title */}
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

      {/* Background */}
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileImage} />

        <img
          src={desktopImage}
          loading="lazy"
          alt="dugga dugga"
          className="
            h-full
            w-full
            object-cover
            object-left
            lg:object-center
          "
        />
      </picture>

      {/* Audio */}
      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* Music Player */}
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlay={handlePlay}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSelectSong={handleSelectSong}
        playlist={playlist}
        setPlaylist={handlePlaylistChange}
      />
    </div>
  );
};

export default Home;
