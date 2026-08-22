import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ListMusic, Music2 } from "lucide-react";
import gsap from "gsap";
import { mahalaya, pujo } from "../utils/music";

const PlayList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [playlist, setPlaylist] = useState("pujo");

  const popupRef = useRef(null);
  const listRef = useRef(null);
  const trackerRef = useRef(null);
  const scrollListRef = useRef(null); // Ref for the red border container

  const currentPlaylist = playlist === "pujo" ? pujo : mahalaya;

  // Animate Popup Entrance and Exit
  useEffect(() => {
    if (isOpen && popupRef.current) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" },
      );
    }
  }, [isOpen]);

  // Animate Tab Content / List Switch
  useEffect(() => {
    if (isOpen && listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" },
      );
    }
  }, [playlist, isOpen]);

  // Handle Cursor Motion strictly bounded to the red border container
  const handleMouseMove = (e) => {
    if (!scrollListRef.current || !trackerRef.current || !popupRef.current)
      return;

    const scrollRect = scrollListRef.current.getBoundingClientRect();
    const popupRect = popupRef.current.getBoundingClientRect();
    const trackerHeight = 10; // h-[10px]

    // Cursor position relative to the scroll container
    const relativeYToScroll = e.clientY - scrollRect.top;

    // Clamp the Y relative to the red border container top and bottom bounds
    const clampedYToScroll = Math.max(
      0,
      Math.min(
        scrollRect.height - trackerHeight,
        relativeYToScroll - trackerHeight / 2,
      ),
    );

    // Convert the clamped Y position relative to popupRef for accurate GSAP positioning
    const finalY = scrollRect.top - popupRect.top + clampedYToScroll;

    gsap.to(trackerRef.current, {
      y: finalY,
      duration: 0.15,
      ease: "power2.out",
    });
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 items-center gap-2 rounded-[var(--nav-radius)] border border-[var(--nav-border)] bg-transparent px-4 text-xs font-semibold tracking-wider text-[var(--nav-text-muted)] shadow-[var(--nav-shadow)] backdrop-blur-2xl transition hover:bg-white/5"
      >
        <ListMusic size={15} strokeWidth={1.8} />
        <span>PUJA RADIO</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Centered Popup relative to Music Player */}
      {isOpen && (
        <div
          ref={popupRef}
          onMouseMove={handleMouseMove}
          className="absolute bottom-full bg-gray-900/20 left-1/2 mb-4 w-full max-w-[580px] -translate-x-1/2 overflow-hidden rounded-2xl border border-[var(--nav-border)] shadow-2xl backdrop-blur-2xl z-[110]"
        >
          {/* Vertical Tracking Indicator (Extreme Right: 10px high, 3px wide) */}
          <div
            ref={trackerRef}
            className="absolute right-0 top-0 h-[25px] w-[2px] rounded-l bg-amber-400 pointer-events-none z-20 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
          />

          {/* Playlist Header */}
          <div className="border-b border-white/10 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-white/40">
                  PLAYLIST
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  {playlist === "pujo" ? "Puja Radio" : "Mahalaya"}
                </p>
              </div>
              <Music2 size={17} strokeWidth={1.5} className="text-amber-300" />
            </div>

            {/* Playlist Switch */}
            <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => setPlaylist("pujo")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-[10px] font-semibold tracking-wider transition ${
                  playlist === "pujo"
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <ListMusic size={13} />
                PUJA RADIO
              </button>

              <button
                onClick={() => setPlaylist("mahalaya")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-[10px] font-semibold tracking-wider transition ${
                  playlist === "mahalaya"
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <Music2 size={13} />
                MAHALAYA
              </button>
            </div>
          </div>

          {/* Songs List */}
          <div
            ref={scrollListRef}
            className="max-h-72 overflow-y-auto"
          >
            {currentPlaylist.length > 0 ? (
              <div ref={listRef} className="flex flex-col">
                {currentPlaylist.map((song, index) => (
                  <button
                    key={index}
                    className="group flex px-4 w-full items-center gap-4 py-3 text-left transition hover:bg-white/10"
                  >
                    {/* Cover */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/5">
                      {song.cover ? (
                        <img
                          src={song.cover}
                          alt={song.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling?.classList.remove(
                              "hidden",
                            );
                          }}
                        />
                      ) : null}

                      {/* Fallback Icon */}
                      <div
                        className={`flex h-full w-full items-center justify-center bg-white/10 ${
                          song.cover ? "hidden" : ""
                        }`}
                      >
                        <Music2 size={18} className="text-white/40" />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white/90">
                        {song.title}
                      </p>
                      <p className="mt-1 truncate text-xs text-white/40">
                        {song.artist}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
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
