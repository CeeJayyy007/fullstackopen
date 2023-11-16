import { useEffect } from "react";
import Anecdotelist from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdotesForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdotelist />
      <AnecdoteForm />
    </div>
  );
};

export default App;
