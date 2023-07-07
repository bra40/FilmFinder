import React from "react";

interface AutocompleteResultsProps {
  results: { name: string; person_id: number }[];
  onItemClick: (item: { name: string; person_id: number }) => void;
}

const AutocompleteResults: React.FC<AutocompleteResultsProps> = ({
  results,
  onItemClick,
}) => {
  return (
    <div className="mt-2 rounded-md shadow-md">
      <ul>
        {results.map((result, index) => (
          <li
            key={index}
            className={`py-1 px-2 cursor-pointer bg-blue400 text-white500 hover:bg-blue300 hover:text-white600 transition duration-200 ${
              index === 0 ? "rounded-tl-md rounded-tr-md" : ""
            } ${
              index === results.length - 1 ? "rounded-bl-md rounded-br-md" : ""
            }`}
            onClick={() => onItemClick(result)}
          >
            {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutocompleteResults;
