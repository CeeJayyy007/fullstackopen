import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((initialData) => {
      setPersons(initialData);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const personAlreadyExists = persons.find(
      (person) =>
        person.name === personObject.name ||
        person.number === personObject.number
    );

    //check if the person already exists
    personAlreadyExists
      ? alert(
          `${personAlreadyExists.name} is already added to phonebook with number ${personAlreadyExists.number}`
        )
      : phonebookService.create(personObject).then((returnedData) => {
          setPersons(persons.concat(returnedData));
          setNewName("");
          setNewNumber("");
        });
  };

  const handleDeleteOf = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      phonebookService.deletePerson(id).then((returnedData) => {
        console.log(returnedData);
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter} />
      <h3>Add a new record</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        newFilter={newFilter}
        handleDelete={handleDeleteOf}
      />
    </div>
  );
};

export default App;
