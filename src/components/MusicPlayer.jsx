import React from "react";
import {
  Pause,
  Play,
  Repeat2,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import PlayList from "./PlayList";
import Dhak from "./Dhak";
import devi from "../assets/images/devi.jpg";

const MusicPlayer = ({
  currentSong,
  isPlaying,
  currentTime = 0,
  duration = 0,
  onPlay,
  onNext,
  onPrevious,
  onSelectSong,
  playlist,
  setPlaylist,
}) => {
  // --------------------------------
  // Format seconds
  // --------------------------------
  const formatTime = (time) => {
    if (!time || !Number.isFinite(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // --------------------------------
  // Progress percentage
  // --------------------------------
  const progress =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  // Same cover logic as the playlist:
  // use song cover if available, otherwise use devi.jpg
  const currentCover = currentSong?.cover || devi;

  return (
    <div className="fixed bottom-2 left-1/2 z-[100] w-full max-w-[620px] -translate-x-1/2 px-2 sm:bottom-4 sm:px-3">
      {/* Top Pills */}
      <div className="mb-2 flex items-center justify-center gap-2">
        <PlayList
          playlist={playlist}
          setPlaylist={setPlaylist}
          onSelectSong={onSelectSong}
          currentSong={currentSong}
        />

        <Dhak />
      </div>

      {/* Player Card */}
      <div
        className="
          flex w-full items-center gap-3 rounded-full overflow-hidden md:rounded-lg
          border border-[var(--nav-border)]
          bg-black/40 backdrop-blur-2xl
          p-2.5 shadow-[var(--nav-shadow)]
          sm:gap-4 sm:p-4
        "
      >
        {/* Cover Art */}
        <div
          className="
            h-16 w-16 shrink-0 overflow-hidden
            rounded-full md:rounded-lg border border-[var(--nav-border)]
            bg-transparent shadow-md
            sm:h-[72px] sm:w-[72px] 
          "
        >
          <img
            src={currentCover}
            alt={currentSong?.title || "Music"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Song Information & Progress Bar */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="truncate text-sm font-bold text-[var(--nav-text)] sm:text-base">
            {currentSong?.title || "Dugga Elo"}
          </div>

          <div className="truncate text-xs text-[var(--nav-text-subtle)] sm:text-sm">
            {currentSong?.artist || "Monali Thakur"}
          </div>

          {/* Progress */}
          <div className="mt-2 w-full">
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/20 sm:h-[3px]">
              <div
                className="h-full rounded-full bg-white/70 transition-[width] duration-100"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            {/* Time Indicators */}
            <div className="mt-1 flex justify-between text-[10px] font-medium text-[var(--nav-text-subtle)] sm:text-[11px]">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Desktop Controls (Tablet/Desktop) */}
        <div className="hidden shrink-0 items-center gap-4 sm:flex">
          {/* <button
            aria-label="Shuffle"
            className="text-[var(--nav-text-muted)] transition hover:text-[var(--nav-text)]"
          >
            <Shuffle size={18} strokeWidth={1.8} />
          </button> */}

          <button
            onClick={onPrevious}
            aria-label="Previous"
            className="text-[var(--nav-text-muted)] transition hover:text-[var(--nav-text)] active:scale-90"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>

          <button
            onClick={onPlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[var(--nav-text)] transition hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <button
            onClick={onNext}
            aria-label="Next"
            className="text-[var(--nav-text-muted)] transition hover:text-[var(--nav-text)] active:scale-90"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>

          {/* <button
            aria-label="Repeat"
            className="text-[var(--nav-text-muted)] transition hover:text-[var(--nav-text)]"
          >
            <Repeat2 size={19} strokeWidth={1.8} />
          </button> */}
        </div>

        {/* Mobile Controls */}
        <div className="flex shrink-0 items-center gap-1 sm:hidden">
          <button
            onClick={onPrevious}
            aria-label="Previous"
            className="p-2 text-[var(--nav-text-muted)] active:scale-90"
          >
            <SkipBack size={18} fill="currentColor" />
          </button>

          <button
            onClick={onPlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-[var(--nav-text)] active:scale-90"
          >
            {isPlaying ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <button
            onClick={onNext}
            aria-label="Next"
            className="p-2 text-[var(--nav-text-muted)] active:scale-90"
          >
            <SkipForward size={18} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
