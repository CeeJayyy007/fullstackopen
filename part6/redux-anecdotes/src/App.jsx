import Anecdotelist from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdotesForm";
import Filter from "./components/Filter";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotelist />
      <AnecdoteForm />
    </div>
  );
};

export default App;
