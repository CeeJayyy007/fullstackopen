const PhoneRecord = ({ person, handleDelete }) => {
  const { name, number } = person;
  return (
    <div>
      {name} {number}
      {"   "}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

const Persons = ({ persons, newFilter, handleDelete }) => {
  //retrieve filtered records into an array
  const filteredPhonebook = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter)
  );

  return filteredPhonebook.map((person) => (
    <PhoneRecord
      key={person.id}
      person={person}
      handleDelete={() => handleDelete(person.id, person.name)}
    />
  ));
};

export default Persons;
