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

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (good || bad || neutral !== 0) {
    return (
      <div>
        <Display value="Statistics" />
        <StatsDisplay text="Good" value={good} />
        <StatsDisplay text="Neutral" value={neutral} />
        <StatsDisplay text="Bad" value={bad} />
        <StatsDisplay text="All" value={all} />
        <StatsDisplay text="Average" value={average} />
        <StatsDisplay text="Positive" value={`${positive} %`} />
      </div>
    );
  }

  return <h3>No feedback given</h3>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  const all = good + neutral + bad;

  const average = (good - bad) / all;

  const positive = good / all;

  return (
    <div>
      <Display value="Give Feedback" />
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
