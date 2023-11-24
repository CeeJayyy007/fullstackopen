import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "./CreateBlogForm";

describe("<Blog />", () => {
  let container;
  let createBlog;
  let user;

  beforeEach(() => {
    createBlog = jest.fn();
    user = userEvent.setup();

    container = render(<CreateBlogForm createBlog={createBlog} />).container;
  });

  test("updates parent state and calls onSubmit", async () => {
    const title = container.querySelector("#title-input");
    const author = container.querySelector("#author-input");
    const url = container.querySelector("#url-input");

    const sendButton = screen.getByText("Create");

    await user.type(title, "testing a blog form...");
    await user.type(author, "Test author");
    await user.type(url, "test url");

    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("testing a blog form...");
    expect(createBlog.mock.calls[0][0].author).toBe("Test author");
    expect(createBlog.mock.calls[0][0].url).toBe("test url");
  });
});
