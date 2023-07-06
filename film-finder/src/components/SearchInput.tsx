import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="p-2 rounded-md shadow-md ">
      <input
        type="text"
        value={value}
        placeholder="Search for cast or crew..."
        className="w-full text-base text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-md p-2"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export default SearchInput;
