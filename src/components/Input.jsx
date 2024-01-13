import React, { useState } from "react";

const Input = ({ onSearch, value }) => {
  const handleInputChange = (event) => {
    const term = event.target.value;
    onSearch(term);
  };

  return (
    <>
      <div className="mb-4 max-w-md ml-auto mr-auto mt-8">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="line"
        >
          Line
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="line"
          type="text"
          placeholder="Enter Line"
          value={value}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default Input;
