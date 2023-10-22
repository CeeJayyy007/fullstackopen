import { useState } from "react";

const Display = ({ value }) => <h1>{value}</h1>;

const StatsDisplay = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
);

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Display value="Give Feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Display value="Statistics" />
      <StatsDisplay text="good" value={good} />
      <StatsDisplay text="neutral" value={neutral} />
      <StatsDisplay text="bad" value={bad} />
    </div>
  );
};

export default App;
