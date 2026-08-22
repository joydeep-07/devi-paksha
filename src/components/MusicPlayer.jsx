import React from "react";
import {
  ChevronDown,
  ListMusic,
  Music2,
  Pause,
  Play,
  Repeat2,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import PlayList from "./PlayList";

const MusicPlayer = ({
  cover,
  title = "Dugga Elo",
  artist = "Monali Thakur",
  isPlaying = false,
  onPlay,
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 z-[100] w-full max-w-[620px] -translate-x-1/2 px-3">
      {/* Top Pills */}
      <div className="mb-2 flex items-center justify-center gap-2">
       <PlayList/>

        <button
          className="
            flex h-9 items-center gap-2
            rounded-[var(--nav-radius)]
            border border-[var(--nav-border)]
            bg-transparent
            px-4
            text-xs font-semibold tracking-wider
            text-[var(--nav-text-muted)]
            shadow-[var(--nav-shadow)]
            backdrop-blur-2xl
            transition
            hover:bg-white/5
          "
        >
          <Music2 size={15} strokeWidth={1.8} />
          <span>DHAK</span>
        </button>
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
            h-[82px] w-[82px] shrink-0 overflow-hidden
            rounded-[18px]
            border border-[var(--nav-border)]
            bg-transparent
            shadow-lg
          "
        >
          {cover ? (
            <img
              src={cover}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src="https://i.pinimg.com/736x/7d/9f/b5/7d9fb5a1eadbd0572fdcda510db537f6.jpg"
              alt={title}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Song Information */}
        <div className="min-w-0 flex-1 self-stretch py-1">
          <div className="truncate text-[16px] font-bold text-[var(--nav-text)]">
            {title}
          </div>

          <div className="mt-1 truncate text-[13px] text-[var(--nav-text-subtle)]">
            {artist}
          </div>

          <div className="mt-3">
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-0 rounded-full bg-white/50" />
            </div>

            <div className="mt-2 flex justify-between text-[11px] font-medium text-[var(--nav-text-subtle)]">
              <span>0:00</span>
              <span>0:00</span>
            </div>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden shrink-0 items-center gap-5 sm:flex">
          <button className="text-[var(--nav-text-muted)] transition hover:text-[var(--nav-text)]">
            <Shuffle size={19} strokeWidth={1.8} />
          </button>

          <button className="text-[var(--nav-text-muted)] transition hover:text-[var(--nav-text)]">
            <SkipBack size={20} fill="currentColor" />
          </button>

          <button
            onClick={onPlay}
            className="
              flex h-12 w-12 items-center justify-center
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
              <Play size={21} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <button className="text-[var(--nav-text-muted)] transition hover:text-[var(--nav-text)]">
            <SkipForward size={20} fill="currentColor" />
          </button>

          <button className="text-[var(--nav-text-muted)] transition hover:text-[var(--nav-text)]">
            <Repeat2 size={20} strokeWidth={1.8} />
          </button>
        </div>

        {/* Mobile Play */}
        <button
          onClick={onPlay}
          className="
            flex h-11 w-11 shrink-0 items-center justify-center
            rounded-2xl
            bg-[var(--nav-text)]
            text-[var(--nav-bg)]
            shadow-lg
            transition
            hover:scale-105
            active:scale-95
            sm:hidden
          "
        >
          {isPlaying ? (
            <Pause size={19} fill="currentColor" />
          ) : (
            <Play size={19} fill="currentColor" className="ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
