import React from "react";

interface CircularProgressProps {
  percentage: number;
  label?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
}) => {
  const circleRadius = 45;
  const circumference = 2 * Math.PI * circleRadius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center">
      {/* SVG Circle */}
      <svg width={120} height={120} className="relative">
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          fill="transparent"
          stroke="#d9d9d9"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          fill="transparent"
          stroke="#3DD973"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
          transform="rotate(-90 60 60)"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className="text-2xl font-bold fill-progress-green"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};


