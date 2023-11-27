import { useState } from "react";
import PropType from "prop-types";
import { Link } from "react-router-dom";

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
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} | {blog.author}
      </Link>
    </div>
  );
};

export default Blog;
