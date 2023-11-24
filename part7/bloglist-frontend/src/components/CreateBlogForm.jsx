import Title from "./Title";
import { useState } from "react";
import PropType from "prop-types";

// add new blog
const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  CreateBlogForm.propTypes = {
    createBlog: PropType.func.isRequired,
  };

  return (
    <div>
      <Title title="Create new blog" />
      <form onSubmit={handleCreateBlog}>
        <div>
          Title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title-input"
          />
        </div>

        <div>
          Author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author-input"
          />
        </div>

        <div>
          URL:
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url-input"
          />
        </div>

        <button id="create-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
