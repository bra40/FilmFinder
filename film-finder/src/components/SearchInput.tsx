import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="input-height rounded-md shadow-md ">
      <input
        type="text"
        value={value}
        placeholder="search for cast or crew..."
        className="w-full text-blue500 text-blue600 placeholder-blue300 bg-white border focus:border-blue500 focus:outline-none rounded-md p-2"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export default SearchInput;
