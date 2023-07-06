import React from "react";

interface Person {
  name: string;
  id: number;
}

interface PersonItemProps {
  person: Person;
  onClick: (person: Person) => void;
}

const PersonItem: React.FC<PersonItemProps> = ({ person, onClick }) => {
  const handleClick = () => {
    onClick(person);
  };

  return <li onClick={handleClick}>{person.name}</li>;
};

export default PersonItem;
