import { useParams } from "react-router-dom";

const BlogView = ({ blogs, updateLikes, deleteBlog }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === id);

  if (!blogs) {
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
      <button onClick={() => deleteBlog(blog)}>remove</button>
    </div>
  );
};

export default BlogView;
