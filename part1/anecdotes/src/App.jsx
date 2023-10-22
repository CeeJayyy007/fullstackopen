import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Display = ({ text, anecdotes, vote, anecdotesIndex }) => {
  return (
    <div>
      <h1>{text}</h1>
      {anecdotes[anecdotesIndex]}
      {` has ${vote[anecdotesIndex]} votes`}
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));

  const getRandomNumber = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const handleNext = () => {
    setSelected(getRandomNumber());
  };

  const handleVote = () => {
    const anecdotesVotes = [...vote];
    anecdotesVotes[selected] += 1;

    setVote(anecdotesVotes);
  };

  const getMaxVotes = () => {
    const maxVoteIndex = vote.indexOf(Math.max(...vote));
    return maxVoteIndex;
  };

  return (
    <div>
      <Display
        text="Anecdote of the day"
        anecdotes={anecdotes}
        vote={vote}
        anecdotesIndex={selected}
      />
      <Button text="Vote" handleClick={handleVote} />
      <Button text="Next Anectode" handleClick={handleNext} />
      <Display
        text="Anecdote with most votes"
        anecdotes={anecdotes}
        vote={vote}
        anecdotesIndex={getMaxVotes()}
      />
    </div>
  );
};

export default App;
