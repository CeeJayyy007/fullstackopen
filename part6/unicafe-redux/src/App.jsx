import store from "./store/store";

const Display = ({ value }) => <h1>{value}</h1>;

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  const average = (good - bad) / all;

  const positive = good / all;

  if (all !== 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={all ? all : 0} />
          <StatisticLine text="Average" value={average ? average : 0} />
          <StatisticLine
            text="Positive"
            value={`${positive ? positive : 0} %`}
          />
        </tbody>
      </table>
    );
  }

  return <h4>No feedback given</h4>;
};

const App = () => {
  const handleGood = () => store.dispatch({ type: "GOOD" });

  const handleNeutral = () => store.dispatch({ type: "NEUTRAL" });

  const handleBad = () => store.dispatch({ type: "BAD" });

  const handleZero = () => store.dispatch({ type: "ZERO" });

  // redux store values
  const good = store.getState().good;
  const neutral = store.getState().neutral;
  const bad = store.getState().bad;

  return (
    <div>
      <Display value="Give Feedback" />
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />
      <Button handleClick={handleZero} text="Zero" />
      <Display value="Statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
