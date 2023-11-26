import { Link } from "react-router-dom";

const Users = ({ blogs }) => {
  const blogCounts = Object.values(
    blogs.reduce((acc, blog) => {
      const { name, id } = blog.user;
      acc[name] = acc[name] || { name, id, count: 0 };
      acc[name].count++;
      return acc;
    }, {})
  );

  return (
    <div>
      <h1>Users</h1>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
          {blogCounts.map((count) => {
            return (
              <tr key={count.name}>
                <td>
                  <Link to={`/users/${count.id}`}>{count.name}</Link>
                </td>
                <td>{count.count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
