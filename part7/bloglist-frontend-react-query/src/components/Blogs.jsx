import Blog from "./Blog";
import Togglable from "./Togglable";
import CreateBlogForm from "./CreateBlogForm";
import { useRef } from "react";

const Blogs = ({
  blogs,
  updateLikes,
  deleteBlog,
  user,

  createBlog,
}) => {
  // create blog ref for togglable
  const blogFormRef = useRef();

  return (
    <div>
      <Togglable buttonLabel="Create new list" ref={blogFormRef}>
        <CreateBlogForm createBlog={createBlog} blogFormRef={blogFormRef} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          deleteBlog={deleteBlog}
          user={user}
          blogFormRef={blogFormRef}
          createBlog={createBlog}
        />
      ))}
    </div>
  );
};

export default Blogs;
