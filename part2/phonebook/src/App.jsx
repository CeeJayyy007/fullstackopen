import { useState } from "react";

const PhoneRecord = ({ name }) => <div>{name}</div>;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      id: persons.length + 1,
    };

    const personAlreadyExists = persons.find(
      (person) => person.name === personObject.name
    );

    personAlreadyExists
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(personObject));

    setNewName("");
  };

  const handlePhonebookChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name:{" "}
          <input value={newName} onChange={handlePhonebookChange} required />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person) => (
        <PhoneRecord key={person.id} name={person.name} />
      ))}
    </div>
  );
};

export default App;
