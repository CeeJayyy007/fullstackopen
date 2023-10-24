import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import phonebookService from "./services/phonebook";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState();

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

    //validate that the person's name and number exists
    const nameAndNumberExists = persons.find(
      (person) =>
        person.name === personObject.name &&
        person.number === personObject.number
    );

    //validate that the person's name exists
    const personNameExists = persons.find(
      (person) => person.name === personObject.name
    );

    //validate that the person's number exists
    const personNumberExists = persons.find(
      (person) => person.number === personObject.number
    );

    const confirmUpdate = (person) => {
      if (
        window.confirm(
          `${personNameExists.name} is already added to phonebook, do you want to replace the old number ${personNameExists.number} with this new one?`
        )
      ) {
        phonebookService
          .update(personNameExists.id, personObject)
          .then((returnedData) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedData.id ? person : returnedData
              )
            );
            setMessage(`Updated ${returnedData.name}'s number`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setErrorMessage(
              `${error.message} - Information of '${person.name}' has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
    };

    // check if name and number exists and show alert
    nameAndNumberExists
      ? alert(
          `${nameAndNumberExists.name} is already added to phonebook with number ${nameAndNumberExists.number}`
        )
      : personNumberExists && personNameExists
      ? alert(
          `${personNumberExists.name} is already added to phonebook with number ${personNumberExists.number}`
        )
      : // check if only the number already exists and show alert
      !personNameExists && personNumberExists
      ? alert(
          `${personNumberExists.name} is already added to phonebook with number ${personNumberExists.number}`
        )
      : // update existing record if only the name exists
      personNameExists && !personNumberExists
      ? confirmUpdate(personNameExists)
      : // create new record if new record does not exist
        phonebookService.create(personObject).then((returnedData) => {
          setPersons(persons.concat(returnedData));
          setMessage(`Added ${returnedData.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        });
  };

  const handleDeleteOf = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      phonebookService
        .deletePerson(id)
        .then((returnedData) => {
          console.log(returnedData);
          setPersons(persons.filter((person) => person.id !== id));
          setMessage(`${name} has been successfully removed from server`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `${error.message} - Information of '${name}' has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((p) => p.id !== id));
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
      {message ? <Notification message={message} status="success" /> : ""}
      {errorMessage ? (
        <Notification message={errorMessage} status="error" />
      ) : (
        ""
      )}
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
