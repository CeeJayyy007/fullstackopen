import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const useBlogFunctions = (setNotification, errorHandler, navigate) => {
  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      setNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`);
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (exception) => {
      const error = exception.response.data.error;
      errorHandler(error, "Error creating blog");
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      );
    },
    onError: (exception) => {
      const error = exception.response.data.error;
      errorHandler(error, "Error updating blog");
    },
  });

  const commentMutation = useMutation({
    mutationFn: (params) => blogService.comment(...params),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      setNotification("Comment added successfully!");
    },
    onError: (exception) => {
      const error = exception.response.data.error;
      errorHandler(error, "Error updating blog");
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      navigate("/");
    },
    onError: (exception) => {
      const error = exception.response.data.error;
      errorHandler(error, "Error deleting blog");
    },
  });

  const createBlog = async ({ blogFormRef, ...newBlogObject }) => {
    blogFormRef.current.toggleVisibility();
    await newBlogMutation.mutate(newBlogObject);
  };

  const updateLikes = async (blogToUpdate) => {
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    };

    await updateBlogMutation.mutate(updatedBlog);
  };

  const addComment = async (comment, id) => {
    await commentMutation.mutate([comment, id]);
  };

  const deleteBlog = async (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      await deleteBlogMutation.mutate(blogToDelete.id);
    }
  };

  return { createBlog, updateLikes, addComment, deleteBlog };
};

export default useBlogFunctions;
