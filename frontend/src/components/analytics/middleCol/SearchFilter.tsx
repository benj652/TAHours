import { useState } from "react";

export const SearchFilter = () => {
  const [selected, setSelected] = useState();
  const handleSelect = async (e) => {
    setSelected(e);
  };

  return (
    <div className="mb-6">
      <input
        type="range"
        min={0}
        max="99"
        defaultValue="0"
        className="w-full range range-lg mb-4 mt-4"
        step="33"
      />
      <div className="flex w-full justify-between px-2 text-xs">
        <span>Today</span>
        <span>This Week</span>
        <span>This Month</span>
        <span>This Semester</span>
      </div>
    </div>
  );
};
