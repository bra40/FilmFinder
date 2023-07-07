import React, { useState } from "react";
import SearchAutocomplete from "./SearchAutocomplete";
import ModeDropdown from "./ModeDropdown";
import MovieResults from "./MovieResults";
import { AutocompleteItem } from "./types";



const MovieSearchGUI = (): JSX.Element => {
  const [selectedPerson, setSelectedPerson] = useState<AutocompleteItem>(
    {} as AutocompleteItem
  );
  const [selectedPersonName, setSelectedPersonName] = useState("");


  const [mode, setMode] = useState("writer");

  const handlePersonSelect = (person: AutocompleteItem) => {
    setSelectedPerson(person);
    setSelectedPersonName(person.name);
  };


  const handleModeChange = (value: string) => {
    setMode(value);
  };

  return (
    <div className="bg-offWhite500 text-blue600 min-h-screen p-8">
      <div className="grid grid-cols-2 gap-8 h-full">
        <div className="col-span-1">
          <div className="flex items-start">
            <div className="flex-grow">
              <SearchAutocomplete
                onSelect={handlePersonSelect}
                selectedPersonName={selectedPersonName}
              />
            </div>
            <div>
              <ModeDropdown value={mode} onChange={handleModeChange} />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          {selectedPerson && (
            <MovieResults personId={selectedPerson.person_id} mode={mode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieSearchGUI;
