import React from "react";

const Badge = ({ statusMessage }) => {
  let bgColor, textColor;

  switch (statusMessage) {
    case "Good Service":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      break;
    case "Minor Delays":
      bgColor = "bg-orange-100";
      textColor = "text-orange-800";
      break;
    case "Severe Delays":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      break;
    default:
      bgColor = "bg-gray-100";
      textColor = "text-gray-800";
  }

  return (
    <>
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${bgColor} ${textColor}`}
      >
        <svg
          className={`mr-1.5 h-2 w-2 ${textColor}`}
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle cx={4} cy={4} r={3} />
        </svg>
        {statusMessage}
      </span>
    </>
  );
};

export default Badge;
