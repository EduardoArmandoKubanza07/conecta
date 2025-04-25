import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "white";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "medium", color = "primary", className = "" }) => {
  const sizeMap = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  const colorMap = {
    primary: "border-primary/20 border-t-primary",
    secondary: "border-secondary/20 border-t-secondary",
    white: "border-white/20 border-t-white",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          ${sizeMap[size]}
          ${colorMap[color]}
          animate-spin rounded-full border-4
          ease-linear
        `}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
