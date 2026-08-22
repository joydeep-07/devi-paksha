import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ListMusic, Music2 } from "lucide-react";
import gsap from "gsap";
import { mahalaya, pujo } from "../utils/music";
import devi from "../assets/images/devi.jpg";

const PlayList = ({ playlist, setPlaylist, onSelectSong, currentSong }) => {
  const [isOpen, setIsOpen] = useState(false);

  const popupRef = useRef(null);
  const listRef = useRef(null);
  const trackerRef = useRef(null);
  const scrollListRef = useRef(null);

  const currentPlaylist = playlist === "pujo" ? pujo : mahalaya;

  useEffect(() => {
    if (isOpen && popupRef.current) {
      gsap.fromTo(
        popupRef.current,
        {
          opacity: 0,
          y: 15,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
        },
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && listRef.current) {
      // Clear any running tweens to prevent stuttering
      gsap.killTweensOf(listRef.current.children);

      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" },
      );
    }
  }, [isOpen]);

  const handleMouseMove = (e) => {
    if (!scrollListRef.current || !trackerRef.current || !popupRef.current) {
      return;
    }

    const scrollRect = scrollListRef.current.getBoundingClientRect();

    const popupRect = popupRef.current.getBoundingClientRect();

    const trackerHeight = 10;

    const relativeYToScroll = e.clientY - scrollRect.top;

    const clampedYToScroll = Math.max(
      0,
      Math.min(
        scrollRect.height - trackerHeight,
        relativeYToScroll - trackerHeight / 2,
      ),
    );

    const finalY = scrollRect.top - popupRect.top + clampedYToScroll;

    gsap.to(trackerRef.current, {
      y: finalY,
      duration: 0.15,
      ease: "power2.out",
    });
  };

  const handleSongSelect = (song) => {
    onSelectSong(song);
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          flex h-9 items-center gap-2
          rounded-[var(--nav-radius)]
          border border-[var(--nav-border)]
          bg-transparent
          px-4
          text-xs font-semibold
          tracking-wider
          text-[var(--nav-text-muted)]
          shadow-[var(--nav-shadow)]
          backdrop-blur-2xl
          transition
          hover:bg-white/5
        "
      >
        <ListMusic size={15} strokeWidth={1.8} />

        <span>{playlist === "pujo" ? "PUJA RADIO" : "MAHALAYA"}</span>

        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Popup */}
      {isOpen && (
        <div
          ref={popupRef}
          onMouseMove={handleMouseMove}
          className="
            absolute bottom-full left-1/2 z-[110]
            mb-4 w-[calc(100%-2rem)] max-w-[580px]
            -translate-x-1/2
            overflow-hidden
            rounded-2xl
            border border-[var(--nav-border)]
            bg-gray-900/30
            shadow-2xl
            backdrop-blur-2xl
          "
        >
          {/* Tracker */}
          <div
            ref={trackerRef}
            className="
            md:block hidden
              pointer-events-none
              absolute right-0 top-0 z-20
              h-[25px] w-[2px]
              rounded-l
              bg-amber-400
              shadow-[0_0_8px_rgba(251,191,36,0.8)]
            "
          />

          {/* Header */}
          <div className="px-4 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-white/40">
                  PLAYLIST
                </p>

                {/* <p className="mt-1 text-[10px] uppercase font-medium text-white">
                  {playlist === "pujo" ? "Puja Radio" : "Mahalaya"}
                </p> */}
              </div>

              <Music2 size={17} strokeWidth={1.5} className="text-amber-300" />
            </div>

            {/* Playlist Switch */}
            <div className="flex border-b border-white/20 p-1">
              <button
                onClick={() => setPlaylist("pujo")}
                className={`
                  flex flex-1 items-center
                  justify-center gap-2
                
                  text-[10px] font-semibold
                  tracking-wider transition
                  ${playlist === "pujo" ? " text-amber-300" : "text-white/40"}
                `}
              >
                <ListMusic size={13} />
                PUJA RADIO
              </button>

              <button
                onClick={() => setPlaylist("mahalaya")}
                className={`
                  flex flex-1 items-center
                  justify-center gap-2
                  rounded-lg py-2
                  text-[10px] font-semibold
                  tracking-wider transition
                 ${playlist === "pujo" ? " text-white/40" : "text-amber-300"}
                `}
              >
                <Music2 size={13} />
                MAHALAYA
              </button>
            </div>
          </div>

          {/* Songs */}
          <div ref={scrollListRef} className="h-72 overflow-y-auto">
            {currentPlaylist.length > 0 ? (
              <div ref={listRef} className="flex flex-col">
                {currentPlaylist.map((song, index) => {
                  const isCurrent = currentSong?.src === song.src;

                  return (
                    <button
                      key={index}
                      onClick={() => handleSongSelect(song)}
                      className={`
                        group flex w-full
                        items-center gap-4
                        px-4 py-3
                        text-left
                        transition
                        ${isCurrent ? "bg-white/10" : ""}
                      `}
                    >
                      {/* Cover */}
                      <div
                        className="
                          flex h-12 w-12
                          shrink-0
                          items-center justify-center
                          overflow-hidden
                          rounded-lg
                          bg-white/5
                        "
                      >
                        {song.cover ? (
                          <img
                            src={song.cover}
                            alt={song.title}
                            className="
                              h-full w-full
                              object-cover
                              transition-transform
                              duration-500
                            "
                          />
                        ) : (
                          <img
                            src={devi}
                            alt={song.title}
                            className="
                              h-full w-full
                              object-cover
                              transition-transform
                              duration-500
                             
                            "
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1">
                        <p
                          className={` truncate text-sm font-medium transition-colors duration-200  ${isCurrent ? "text-amber-300" : "text-white/90 group-hover:text-amber-200"} `}
                        >
                          {song.title}
                        </p>

                        <p className="mt-1 truncate text-xs text-white/40">
                          {song.artist}
                        </p>
                      </div>

                      {/* Playing indicator */}
                      {isCurrent && (
                        <div className="flex items-end gap-[2px]">
                          <span className="h-2 w-[2px] animate-pulse bg-amber-300" />
                          <span className="h-4 w-[2px] animate-pulse bg-amber-300" />
                          <span className="h-3 w-[2px] animate-pulse bg-amber-300" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col h-72 items-center justify-center py-10">
                <Music2
                  size={22}
                  strokeWidth={1.5}
                  className="mb-3 text-white/20"
                />

                <p className="text-xs text-white/40">
                  No Mahalaya tracks added yet
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PlayList;
