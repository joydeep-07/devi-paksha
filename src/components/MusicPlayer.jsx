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

  return (
    <div className="fixed bottom-4 left-1/2 z-[100] w-full max-w-[620px] -translate-x-1/2 px-3">
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

      {/* Player */}
      <div
        className="
          flex h-30 w-full items-center gap-4
          rounded-xl
          border border-[var(--nav-border)]
          bg-transparent
          px-4 py-4
          shadow-[var(--nav-shadow)]
          backdrop-blur-2xl
          sm:px-5
        "
      >
        {/* Cover */}
        <div
          className="
            h-[82px] w-[82px]
            shrink-0
            overflow-hidden
            rounded-[18px]
            border border-[var(--nav-border)]
            bg-transparent
            shadow-lg
          "
        >
          <img
            src={
              currentSong?.cover ||
              "https://i.pinimg.com/736x/7d/9f/b5/7d9fb5a1eadbd0572fdcda510db537f6.jpg"
            }
            alt={currentSong?.title || "Music"}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Song Information */}
        <div className="min-w-0 flex-1 self-stretch py-1">
          <div className="truncate text-[16px] font-bold text-[var(--nav-text)]">
            {currentSong?.title || "Dugga Elo"}
          </div>

          <div className="mt-1 truncate text-[13px] text-[var(--nav-text-subtle)]">
            {currentSong?.artist || "Monali Thakur"}
          </div>

          {/* Progress */}
          <div className="mt-3">
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white/50 transition-[width] duration-100"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            {/* Time */}
            <div className="mt-2 flex justify-between text-[11px] font-medium text-[var(--nav-text-subtle)]">
              <span>{formatTime(currentTime)}</span>

              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden shrink-0 items-center gap-5 sm:flex">
          {/* Shuffle */}
          <button
            className="
              text-[var(--nav-text-muted)]
              transition
              hover:text-[var(--nav-text)]
            "
          >
            <Shuffle size={19} strokeWidth={1.8} />
          </button>

          {/* Previous */}
          <button
            onClick={onPrevious}
            className="
              text-[var(--nav-text-muted)]
              transition
              hover:text-[var(--nav-text)]
              active:scale-90
            "
          >
            <SkipBack size={20} fill="currentColor" />
          </button>

          {/* Play / Pause */}
          <button
            onClick={onPlay}
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              text-[var(--nav-text)]
              transition
              hover:scale-105
              active:scale-95
            "
          >
            {isPlaying ? (
              <Pause size={21} fill="currentColor" />
            ) : (
              <Play size={21} fill="currentColor" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={onNext}
            className="
              text-[var(--nav-text-muted)]
              transition
              hover:text-[var(--nav-text)]
              active:scale-90
            "
          >
            <SkipForward size={20} fill="currentColor" />
          </button>

          {/* Repeat */}
          <button
            className="
              text-[var(--nav-text-muted)]
              transition
              hover:text-[var(--nav-text)]
            "
          >
            <Repeat2 size={20} strokeWidth={1.8} />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 sm:hidden">
          {/* Previous */}
          <button onClick={onPrevious} className="text-[var(--nav-text-muted)]">
            <SkipBack size={18} fill="currentColor" />
          </button>

          {/* Play / Pause */}
          <button
            onClick={onPlay}
            className="
              flex h-11 w-11
              shrink-0
              items-center justify-center
              rounded-2xl
              bg-[var(--nav-text)]
              text-[var(--nav-bg)]
              shadow-lg
              transition
              hover:scale-105
              active:scale-95
            "
          >
            {isPlaying ? (
              <Pause size={19} fill="currentColor" />
            ) : (
              <Play size={19} fill="currentColor" />
            )}
          </button>

          {/* Next */}
          <button onClick={onNext} className="text-[var(--nav-text-muted)]">
            <SkipForward size={18} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
