import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
import { removeNotification } from "../utils/helpers";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(createAnecdote(content));
    dispatch(showNotification(`You created '${content}' anecdote`));
    removeNotification(dispatch);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" placeholder="Enter new anecdote here" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
