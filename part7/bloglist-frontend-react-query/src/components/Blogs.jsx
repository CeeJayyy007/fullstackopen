import Blog from "./Blog";
import Togglable from "./Togglable";
import CreateBlogForm from "./CreateBlogForm";

const Blogs = ({
  blogs,
  updateLikes,
  deleteBlog,
  user,
  blogFormRef,
  createBlog,
}) => {
  return (
    <div>
      <Togglable buttonLabel="Create new list" ref={blogFormRef}>
        <CreateBlogForm createBlog={createBlog} />
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
