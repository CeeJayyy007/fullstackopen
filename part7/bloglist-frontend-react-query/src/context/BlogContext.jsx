/* eslint-disable indent */
import { createContext, useReducer, useContext } from "react";

const initialState = [];

const blogReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload;
    case "CREATE":
      return "";
    default:
      return state;
  }
};

const BlogContext = createContext();

export const BlogContextProvider = (props) => {
  const [blog, blogDispatch] = useReducer(blogReducer, initialState);

  return (
    <BlogContext.Provider value={[blog, blogDispatch]}>
      {props.children}
    </BlogContext.Provider>
  );
};

export const useBlogValue = () => {
  const blogAndDispatch = useContext(BlogContext);
  return blogAndDispatch[0];
};

export const useBlogDispatch = () => {
  const blogAndDispatch = useContext(BlogContext);
  return blogAndDispatch[1];
};

export default BlogContext;
