import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { notification } from "../reducers/notificationReducer";

const Anecdotelist = () => {
  const dispatch = useDispatch();

  const stateAnecdotes = useSelector(({ anecdotes, filter }) => {
    return filter === ""
      ? anecdotes
      : anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        );
  });

  const sortedAnecdotes = stateAnecdotes
    .slice()
    .sort((a, b) => b.votes - a.votes);

  const vote = (anecdote) => {
    const id = anecdote.id;
    const content = anecdote.content;

    dispatch(voteAnecdote(id, anecdote));
    dispatch(notification(`You voted for '${content}'`, 5));
  };

  return sortedAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default Anecdotelist;
