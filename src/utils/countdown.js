const TARGET_DATE = new Date("2026-10-16T00:00:00+05:30");

export const getCountdown = () => {
  const now = new Date();

  const diffInMs = TARGET_DATE.getTime() - now.getTime();

  const days = Math.max(
    0,
    Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
  );

  return days;
};

