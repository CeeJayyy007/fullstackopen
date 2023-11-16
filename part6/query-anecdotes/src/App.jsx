import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import {
  getAnecdotes,
  createAnecdote,
  updateAnecdote,
} from "./services/requests";
import AnecdoteList from "./components/AnecdotesList";
import { useNotificationDispatch } from "./context/NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const hideNotification = () => {
    setInterval(() => {
      dispatch({ type: "HIDE" });
    }, 5000);
  };

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,

    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));

      dispatch({ type: "SHOW", payload: `You created '${content}' anecdote` });
      hideNotification();
    },

    onError: (error) => {
      const errorMessage = error.response.data.error;
      dispatch({ type: "SHOW", payload: errorMessage });
      hideNotification();
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,

    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) =>
          anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
        )
      );

      dispatch({
        type: "SHOW",
        payload: `You voted for '${updatedAnecdote.content}`,
      });
      hideNotification();
    },
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />
      <AnecdoteList
        anecdotes={anecdotes}
        updateAnecdoteMutation={updateAnecdoteMutation}
      />
    </div>
  );
};

export default App;
