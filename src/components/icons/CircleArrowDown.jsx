import React from "react";

// Simple circular down arrow icon, customizable via props
export default function CircleArrowDown({
  size = 24,
  strokeWidth = 2,
  className = "",
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l4 4 4-4" />
      <path d="M12 8v8" />
    </svg>
  );
}
