import React, { useRef, useState } from "react";
import { Music2 } from "lucide-react";

const Dhak = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleDhak = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/dhak.mp3");
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <button
        onClick={toggleDhak}
        className={`
          flex h-9 items-center gap-2
          rounded-[var(--nav-radius)]
          border border-[var(--nav-border)]
          px-4
          text-xs font-semibold tracking-wider
          shadow-[var(--nav-shadow)]
          backdrop-blur-2xl
          transition
          ${
            isPlaying
              ? "bg-white/10 text-amber-300"
              : "bg-transparent text-[var(--nav-text-muted)] hover:bg-white/5"
          }
        `}
      >
        <Music2
          size={15}
          strokeWidth={1.8}
          className={isPlaying ? "" : ""}
        />

        <span>{isPlaying ? "DHAK" : "DHAK"}</span>
      </button>
    </div>
  );
};

export default Dhak;
