import React from "react";

const Badge = ({ disruptions }) => {
  return (
    <>
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
          disruptions
            ? "bg-red-100 text-red-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        <svg
          className={`mr-1.5 h-2 w-2 ${
            disruptions ? "text-red-400" : " text-green-400"
          }`}
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle cx={4} cy={4} r={3} />
        </svg>
        {disruptions ? "Not Operational" : "Operational"}
      </span>
    </>
  );
};

export default Badge;
