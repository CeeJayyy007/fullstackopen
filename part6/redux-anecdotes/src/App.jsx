import Anecdotelist from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdotesForm";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotelist />
      <AnecdoteForm />
    </div>
  );
};

export default App;
