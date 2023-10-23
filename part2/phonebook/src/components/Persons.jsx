const PhoneRecord = ({ person }) => {
  const { name, number } = person;
  return (
    <div>
      {name} {number}
    </div>
  );
};

const Persons = ({ persons, newFilter }) => {
  //retrieve filtered records into an array
  const filteredPhonebook = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter)
  );

  return filteredPhonebook.map((person) => (
    <PhoneRecord key={person.id} person={person} />
  ));
};

export default Persons;
