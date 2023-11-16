import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,

  reducers: {
    setVote(state, action) {
      const id = action.payload.id;
      const anecdoteToChange = action.payload;

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },

    appendAnecdote(state, action) {
      return [...state, action.payload];
    },

    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { setVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (id, content) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, content);
    dispatch(setVote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
