import React from "react";
import { Coffee, Disc3, Music2, UsersRound } from "lucide-react";

const Navbar = () => {
  return (
    <nav
      className="
        absolute top-0 left-0 z-50 flex w-full items-center justify-between
        px-[var(--nav-px)] py-4
        md:px-[var(--nav-px-md)]
        lg:px-[var(--nav-px-lg)]
      "
    >
      {/* Left — Time */}
      <div
        className="
          flex h-[var(--nav-height)] items-center
          rounded-[var(--nav-radius)]
          border border-[var(--nav-border)]
          bg-[var(--nav-bg)]/80
          px-5
          text-xs font-medium text-[var(--nav-text)]
          shadow-[var(--nav-shadow)]
          backdrop-blur-[var(--nav-blur)]
        "
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold">12 : 06</span>

          <span className="uppercase text-[var(--nav-text-muted)]">am</span>

          <span className="text-[var(--nav-text-subtle)]">IST</span>
        </div>
      </div>

      {/* Center — Online + Countdown */}
      <div
        className="
          absolute left-1/2 hidden
          h-[var(--nav-height)]
          -translate-x-1/2
          items-center
          rounded-[var(--nav-radius)]
          border border-[var(--nav-border)]
          bg-[var(--nav-bg)]/80
          px-8
          shadow-[var(--nav-shadow)]
          backdrop-blur-[var(--nav-blur)]
          md:flex
        "
      >
        <div className="flex items-center gap-4 text-xs font-medium text-[var(--nav-text)]">
          <div className="flex items-center gap-2">
            <span
              className="
                h-2.5 w-2.5 rounded-full
                bg-[var(--online)]
                shadow-[0_0_10px_var(--online)]
              "
            />

            <span className="uppercase">274 online</span>
          </div>

          <span className="h-5 w-px bg-white/30" />

          <span className="uppercase text-[var(--nav-text-muted)]">
            <span className="text-[var(--nav-text)]">55</span> days until Durga
            Pujo
          </span>
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex h-[var(--nav-height)] items-center gap-[var(--nav-gap)]">
        {/* Music */}
        <div
          className="
            flex h-[var(--nav-height)] items-center
            gap-1
            rounded-[var(--nav-radius)]
            border border-[var(--nav-border)]
            bg-[var(--nav-bg)]/80
            px-2
            shadow-[var(--nav-shadow)]
            backdrop-blur-[var(--nav-blur)]
          "
        >
          <button
            className="
              flex h-[var(--nav-button-size)] w-[var(--nav-button-size)]
              items-center justify-center
              rounded-full
              text-[var(--nav-text)]
              transition
              hover:bg-[var(--nav-hover)]
            "
          >
            <Disc3 size={16} />
          </button>

          <button
            className="
              flex h-[var(--nav-button-size)] w-[var(--nav-button-size)]
              items-center justify-center
              rounded-full
              text-[var(--nav-text)]
              transition
              hover:bg-[var(--nav-hover)]
            "
          >
            <Music2 size={16} />
          </button>
        </div>

        {/* User / Coffee */}
        <div
          className="
            flex h-[var(--nav-height)] items-center
            gap-1
            rounded-[var(--nav-radius)]
            border border-[var(--nav-border)]
            bg-[var(--nav-bg)]/80
            px-2
            shadow-[var(--nav-shadow)]
            backdrop-blur-[var(--nav-blur)]
          "
        >
          <button
            className="
              flex h-[var(--nav-button-size)] w-[var(--nav-button-size)]
              items-center justify-center
              rounded-full
              text-[var(--nav-text)]
              transition
              hover:bg-[var(--nav-hover)]
            "
          >
            <UsersRound size={16} />
          </button>

          <button
            className="
              flex h-[var(--nav-button-size)] w-[var(--nav-button-size)]
              items-center justify-center
              rounded-full
              text-[var(--nav-text)]
              transition
              hover:bg-[var(--nav-hover)]
            "
          >
            <Coffee size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
