import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Title from "./components/Title";
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

  // add person to phonebook
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

  // delete phonebook record
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

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  return (
    <div>
      <Title name="Phonebook" />
      {message && <Notification message={message} />}
      {errorMessage && <Notification message={errorMessage} error={true} />}
      <Filter
        handleFilterChange={handleChange(setNewFilter)}
        newFilter={newFilter}
      />
      <Title name="Add a new record" />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleChange(setNewName)}
        handleNumberChange={handleChange(setNewNumber)}
      />
      <Title name="Numbers" />
      <Persons
        persons={persons}
        newFilter={newFilter}
        handleDelete={handleDeleteOf}
      />
    </div>
  );
};

export default App;
