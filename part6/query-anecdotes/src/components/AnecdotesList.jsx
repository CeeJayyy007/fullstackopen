import { useNotificationDispatch } from "../context/NotificationContext";

const AnecdoteList = ({ anecdotes, updateAnecdoteMutation }) => {
  const dispatch = useNotificationDispatch();

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: "SHOW", payload: `You voted for '${anecdote.content}` });
    setInterval(() => {
      dispatch({ type: "HIDE" });
    }, 5000);
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
