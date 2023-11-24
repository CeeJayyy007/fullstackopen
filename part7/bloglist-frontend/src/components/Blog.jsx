import { useState } from "react";
import PropType from "prop-types";

const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [view, setView] = useState(false);

  const blogStyle = {
    padding: "10px 0px 10px 5px",
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 4,
  };

  const handleView = () => {
    setView(!view);
  };

  Blog.proptypes = {
    blog: PropType.object.isRequired,
    updateLikes: PropType.func.isRequired,
    deleteBlog: PropType.func.isRequired,
    user: PropType.object.isRequired,
  };

  return (
    <div style={blogStyle} className="blogDiv">
      <div className="titleDiv">
        {blog.title} | {blog.author}{" "}
        <button onClick={handleView}>{view ? "hide" : "view"}</button>
      </div>

      <div style={{ display: view ? " " : "none" }} className="blogDetailsDiv">
        <div className="urlDiv">{blog.url}</div>
        <div>
          {blog.likes}
          {"   "}
          <button onClick={() => updateLikes(blog.id)}>like</button>
        </div>
        {blog.user.name}
      </div>

      {user && user.name === blog.user.name && (
        <button onClick={() => deleteBlog(blog.id)}>remove</button>
      )}
    </div>
  );
};

export default Blog;
