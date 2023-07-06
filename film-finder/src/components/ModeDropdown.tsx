import React from "react";

interface ModeDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const ModeDropdown: React.FC<ModeDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="mt-2">
      <select
        value={value}
        className="border border-gray-300 rounded-md p-2 text-base text-gray-800 bg-white"
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="director">Director</option>
        <option value="writer">Writer</option>
        <option value="actor">Actor</option>
      </select>
    </div>
  );
};

export default ModeDropdown;
