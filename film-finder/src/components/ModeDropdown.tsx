import React from "react";

interface ModeDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const ModeDropdown: React.FC<ModeDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="h-full rounded-md shadow-md">
      <select
        value={value}
        className="h-full w-full py-2.5 text-blue500 text-white500 bg-blue300 border border-gray-300 focus:border-blue500 focus:outline-none rounded-md p-2"
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="director">director</option>
        <option value="writer">writer</option>
        <option value="actor">actor</option>
      </select>
    </div>
  );
};

export default ModeDropdown;
