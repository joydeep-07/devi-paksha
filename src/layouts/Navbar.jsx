import React, { useState, useEffect } from "react";
import { Coffee, Disc3, Music2, UsersRound } from "lucide-react";

const TARGET_DATE = new Date("2026-10-16T00:00:00+05:30"); // October 16, 2026 IST

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState({
    timeStr: "-- : --",
    period: "am",
  });
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    const updateNavbarData = () => {
      const now = new Date();

      // 1. Format IST Time
      const timeFormatter = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const formattedParts = timeFormatter.formatToParts(now);
      const hours =
        formattedParts.find((p) => p.type === "hour")?.value || "00";
      const minutes =
        formattedParts.find((p) => p.type === "minute")?.value || "00";
      const dayPeriod =
        formattedParts.find((p) => p.type === "dayPeriod")?.value || "am";

      setCurrentTime({
        timeStr: `${hours} : ${minutes}`,
        period: dayPeriod.toLowerCase(),
      });

      // 2. Calculate remaining days to Oct 16, 2026
      const diffInMs = TARGET_DATE.getTime() - now.getTime();
      const diffInDays = Math.max(
        0,
        Math.ceil(diffInMs / (1000 * 60 * 60 * 24)),
      );
      setDaysRemaining(diffInDays);
    };

    updateNavbarData();
    const interval = setInterval(updateNavbarData, 1000);

    return () => clearInterval(interval);
  }, []);

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
          px-5
          text-xs font-medium text-[var(--nav-text)]
          shadow-sm
          backdrop-blur-[var(--nav-blur)]
        "
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold">{currentTime.timeStr}</span>

          <span className="uppercase text-[var(--nav-text-muted)]">
            {currentTime.period}
          </span>

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
          px-8
          shadow-sm
          backdrop-blur-[var(--nav-blur)]
          md:flex
        "
      >
        <div className="flex items-center gap-4 text-xs font-medium text-[var(--nav-text)]">
          {/* <div className="flex items-center gap-2">
            <span
              className="
                h-2.5 w-2.5 rounded-full
                bg-[var(--online)]
                shadow-[0_0_10px_var(--online)]
              "
            />

            <span className="uppercase">274 online</span>
          </div> */}

          {/* <span className="h-5 w-px bg-white/30" /> */}

          <span className="uppercase text-[var(--nav-text-muted)]">
            <span className="text-[var(--nav-text)]">{daysRemaining}</span> days
            until Durga Pujo
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
            px-2
            shadow-sm
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
            px-2
            shadow-sm
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
