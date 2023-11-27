const Comments = ({ blog, addComment }) => {
  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    e.target.comment.value = "";

    if (comment !== "") {
      addComment(comment, blog.id);
    }
  };

  return (
    <div>
      <h2>comments</h2>
      <form onSubmit={handleComment}>
        <input placeholder="Enter your comment here" name="comment" />
        <button type="submit">add comment</button>
      </form>

      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
