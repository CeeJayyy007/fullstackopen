const Users = ({ blogs }) => {
  const blogCountsArray = Object.entries(
    blogs.reduce((acc, blog) => {
      acc[blog.user.name] = (acc[blog.user.name] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  return (
    <div>
      <h1>Users</h1>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
          {blogCountsArray.map((count) => {
            return (
              <tr key={count.name}>
                <td>{count.name}</td>
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
