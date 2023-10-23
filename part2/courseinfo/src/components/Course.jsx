const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Total = ({ parts }) => {
  console.log(parts);
  return (
    <h3>
      Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
    </h3>
  );
};

const CourseTitle = ({ name }) => <h3>{name}</h3>;

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <>
      <CourseTitle name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
};

export default Course;
