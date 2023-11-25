describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "James Bond",
      username: "James",
      password: "000000",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("http://localhost:5173");
  });

  it("login form is shown", function () {
    cy.contains("Blogs");
    cy.contains("Login").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("James");
      cy.get("#password").type("000000");
      cy.get("#login-button").click();
      cy.contains("James Bond logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("James");
      cy.get("#password").type("123456");
      cy.get("#login-button").click();
      cy.contains("Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "James", password: "000000" });
    });

    it("A blog can be created", function () {
      cy.contains("Create new list").click();
      cy.get("#title-input").type("all about harry potter");
      cy.get("#author-input").type("J. K. Rowling");
      cy.get("#url-input").type("https://www.google.com/");
      cy.get("#create-button").click();

      cy.contains("all about harry potter");
    });

    it("A user can like  blog", function () {
      cy.contains("Create new list").click();
      cy.createBlog({
        title: "new blog",
        author: "new author",
        url: "www.newurl.com",
      });

      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("1");
    });

    it("only user who created a blog can see the delete button and delete it", function () {
      cy.contains("Create new list").click();
      cy.createBlog({
        title: "Testing delete",
        author: "new author",
        url: "www.newurl.com",
      });

      cy.contains("Logout").click();
      cy.contains("view").click();
      cy.should("not.contain", "remove");

      cy.login({ username: "James", password: "000000" });
      cy.contains("view").click();
      cy.contains("remove")
        .click()
        .then(() => {
          cy.contains("Testing delete").should("not.exist");
        });
    });

    describe("and several blogs", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "This is the first blog",
          author: "new author 1",
          url: "www.newurl.com",
        });
        cy.createBlog({
          title: "This is the second blog",
          author: "new author 2",
          url: "www.newurl.com",
        });
        cy.createBlog({
          title: "This is the third blog",
          author: "new author 3",
          url: "www.newurl.com",
        });
      });

      it("like last note and see if it is moved to top", function () {
        cy.get(".blogDiv").eq(0).should("contain", "This is the first blog");
        cy.get(".blogDiv").eq(1).should("contain", "This is the second blog");
        cy.get(".blogDiv")
          .eq(2)
          .should("contain", "This is the third blog")
          .as("theBlog");

        cy.get("@theBlog").contains("view").click();
        cy.get("@theBlog").contains("like").click();

        cy.get(".blogDiv").eq(0).should("contain", "This is the third blog");
        cy.get(".blogDiv").eq(1).should("contain", "This is the first blog");
        cy.get(".blogDiv").eq(2).should("contain", "This is the second blog");
      });
    });
  });
});
