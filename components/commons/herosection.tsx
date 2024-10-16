"use client";
import { useEffect, useState } from "react";
import {CircularProgress} from "../helpers/progressbar";

export function HeroSectionProgressBarSection() {
  const [progress, setProgress] = useState(0);
  const MAX_PROGRESS = 85;
  const TOTAL_TIME = 8000; // Time in milliseconds for each step

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= MAX_PROGRESS) {
          clearInterval(interval);
          return MAX_PROGRESS;
        }
        return prev + 1; 
      });
    }, TOTAL_TIME/85);

    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array to run effect once on mount

  return (
    <div className="p-4 text-progress-green flex h-32 w-64">
      <CircularProgress percentage={progress} />
      <div className="h-full flex justify-center items-center text-3xl font-black">ATS SCORE</div>
    </div>
  );
}
