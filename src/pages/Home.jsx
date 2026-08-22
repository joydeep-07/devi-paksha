import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../layouts/Navbar";
import MusicPlayer from "../components/MusicPlayer";
import { pujo, mahalaya } from "../utils/music";
import { getCountdown } from "../utils/countdown";
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

  // Track background image loading state
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Which playlist the user is currently browsing
  const [playlist, setPlaylist] = useState("pujo");

  // Which song is actually playing
  const [playingSong, setPlayingSong] = useState(pujo[0]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Music progress
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentPlaylist = playlist === "pujo" ? pujo : mahalaya;

  // --------------------------------
  // Load ONLY when playing song changes
  // --------------------------------
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !playingSong) return;

    audio.src = playingSong.src;
    audio.load();

    setCurrentTime(0);
    setDuration(0);

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
    }
  }, [playingSong]);

  // --------------------------------
  // Play / Pause
  // --------------------------------
  const handlePlay = () => {
    const audio = audioRef.current;

    if (!audio || !playingSong) return;

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

    const nextIndex =
      currentIndex >= currentPlaylist.length - 1 ? 0 : currentIndex + 1;

    const nextSong = currentPlaylist[nextIndex];

    setCurrentIndex(nextIndex);
    setPlayingSong(nextSong);
    setIsPlaying(true);
  };

  // --------------------------------
  // Previous
  // --------------------------------
  const handlePrevious = () => {
    if (!currentPlaylist.length) return;

    const previousIndex =
      currentIndex <= 0 ? currentPlaylist.length - 1 : currentIndex - 1;

    const previousSong = currentPlaylist[previousIndex];

    setCurrentIndex(previousIndex);
    setPlayingSong(previousSong);
    setIsPlaying(true);
  };

  // --------------------------------
  // Select song from playlist
  // --------------------------------
  const handleSelectSong = (song) => {
    const index = currentPlaylist.findIndex((item) => item.src === song.src);

    if (index === -1) return;

    setCurrentIndex(index);
    setPlayingSong(song);
    setIsPlaying(true);
  };

  // --------------------------------
  // Song ended
  // --------------------------------
  const handleEnded = () => {
    handleNext();
  };

  // --------------------------------
  // Change playlist
  // --------------------------------
  const handlePlaylistChange = (newPlaylist) => {
    setPlaylist(newPlaylist);
  };

  // --------------------------------
  // Audio metadata
  // --------------------------------
  const handleLoadedMetadata = (e) => {
    setDuration(e.currentTarget.duration);
  };

  // --------------------------------
  // Audio progress
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
    return {
      mobileImage: nightTall,
      desktopImage: night,
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-900">
      <Navbar />

      {/* Skeleton Screen (visible until background image loads) */}
      {!isImageLoaded && (
        <div className="absolute inset-0 z-0 bg-slate-800 animate-pulse flex flex-col justify-center items-center">
          <div className="w-1/2 h-16 bg-slate-700/50 rounded-lg mb-4"></div>
          <div className="w-1/4 h-4 bg-slate-700/50 rounded-lg"></div>
        </div>
      )}

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

      <p className="absolute top-[170px] font-medium left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-[10px] font-light text-white/70 uppercase md:hidden">
        {getCountdown()} days Remaining
      </p>

      {/* Background */}
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileImage} />

        <img
          src={desktopImage}
          loading="eager"
          onLoad={() => setIsImageLoaded(true)}
          alt="dugga dugga"
          className={`
            h-full
            w-full
            object-cover
            object-left
            contrast-97
            lg:object-center
            transition-opacity
            duration-500
            ${isImageLoaded ? "opacity-100" : "opacity-0"}
          `}
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
        currentSong={playingSong}
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
