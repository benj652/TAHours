import { useState } from "react";

export const SearchFilter = () => {
  const [selected, setSelected] = useState();
  const handleSelect = async (e) => {
    setSelected(e);
  };

  return (
    <div className="mb-6 w-full">
      <input
        type="range"
        min={0}
        max="100"
        defaultValue="25"
        className="w-full range range-lg mb-4 mt-4"
        step="25"
      />
      <div className="flex w-full justify-between px-2 text-xs">
        <span>Today</span>
        <span>This Week</span>
        <span>This Month</span>
        <span>This Semester</span>
        <span>This Year</span>
      </div>
    </div>
  );
};
