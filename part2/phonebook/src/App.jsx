import { useState } from "react";

const PhoneRecord = ({ person }) => {
  const { name, number } = person;
  return (
    <div>
      {name} {number}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const personAlreadyExists = persons.find(
      (person) =>
        person.name === personObject.name ||
        person.number === personObject.number
    );

    personAlreadyExists
      ? alert(
          `${personAlreadyExists.name} is already added to phonebook with number ${personAlreadyExists.number}`
        )
      : setPersons(persons.concat(personObject));

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} required />
        </div>
        <div>
          Number:{" "}
          <input value={newNumber} onChange={handleNumberChange} required />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person) => (
        <PhoneRecord key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
