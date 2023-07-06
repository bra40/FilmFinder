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
      <ul className="py-2">
        {results.map((result, index) => (
          <li
            key={index}
            className="py-1 px-2 cursor-pointer hover:bg-gray-100 transition duration-200"
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
