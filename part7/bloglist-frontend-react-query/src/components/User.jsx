import { useParams } from "react-router-dom";

const User = ({ blogs }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.user.id === id);

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h1>{blog.user.name}</h1>

      <h2>added blogs</h2>
      <ul>
        {blogs.map(
          (blog) => blog.user.id === id && <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  );
};

export default User;
