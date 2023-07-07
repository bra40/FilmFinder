import React, { useState, useEffect } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  selectedName: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  selectedName,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    setInputValue(selectedName);
  }, [selectedName]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const handleInputClick = () => {
    if (selectedName && !inputValue) {
      setInputValue(selectedName);
      onChange(selectedName);
    }
  };

  return (
    <div className="input-height rounded-md shadow-md">
      <input
        type="text"
        value={inputValue}
        placeholder="search for cast or crew..."
        className="w-full text-blue500 text-blue600 placeholder-blue300 bg-white border focus:border-blue500 focus:outline-none rounded-md p-2"
        onChange={handleInputChange}
        onClick={handleInputClick}
      />
    </div>
  );
};

export default SearchInput;
