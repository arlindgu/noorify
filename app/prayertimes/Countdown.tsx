"use client";
import { useEffect, useState } from "react";

export default function Countdown({ targetTime }: { targetTime: number }) {
  const target = new Date(targetTime);
  const [remaining, setRemaining] = useState(calculateTimeRemaining(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(calculateTimeRemaining(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  if (remaining.hours === null) {
    return <></>;
  }

  return (
    <span>
      {remaining.hours.toString().padStart(2, "0")}:
      {remaining.minutes.toString().padStart(2, "0")}:
      {remaining.seconds.toString().padStart(2, "0")}
    </span>
  );
}

function calculateTimeRemaining(targetTime: Date) {
  const now = new Date();
  const diff = targetTime.getTime() - now.getTime();

  if (diff < 0) {
    return { hours: null, minutes: null, seconds: null };
  }

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}