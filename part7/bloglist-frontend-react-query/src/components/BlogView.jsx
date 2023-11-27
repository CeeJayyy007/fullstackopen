import { useParams } from "react-router-dom";
import Comments from "./Comments";

const BlogView = ({ blogs, updateLikes, addComment, deleteBlog, user }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === id);

  if (!blogs || !blog) {
    return null;
  }

  return (
    <div>
      <h1>
        {blog.title} | {blog.author}
      </h1>
      <div className="urlDiv">
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes}
        {"   "} likes {"   "}
        <button onClick={() => updateLikes(blog)}>like</button>
      </div>
      added by {blog.user.name}
      {user && user.name === blog.user.name && (
        <button onClick={() => deleteBlog(blog)}>remove</button>
      )}
      <Comments blog={blog} addComment={addComment} />
    </div>
  );
};

export default BlogView;
