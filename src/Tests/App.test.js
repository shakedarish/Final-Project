import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import "@testing-library/jest-dom";

jest.mock("../components/Navbar", () => () => <div>Navbar Placeholder</div>);
jest.mock("../components/pages/Home", () => () => <div>Home Page</div>);
jest.mock("../components/pages/AboutUs", () => () => <div>About Us Page</div>);
jest.mock("../components/pages/Login", () => () => <div>Login Page</div>);
jest.mock("../components/pages/CreatePage", () => () => <div>Create Page</div>);
jest.mock("../components/pages/Contact", () => () => <div>Contact Page</div>);
jest.mock("../components/pages/Terms", () => () => <div>Terms Page</div>);
jest.mock("../components/pages/Policy", () => () => <div>Policy Page</div>);

window.scrollTo = jest.fn();

describe("App Routing", () => {
  it("renders the home page without crashing", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("renders the about us page without crashing", () => {
    render(
      <MemoryRouter initialEntries={["/about-us"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("About Us Page")).toBeInTheDocument();
  });

  it("renders the login page without crashing", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("renders the create page without crashing", () => {
    render(
      <MemoryRouter initialEntries={["/createPage"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Create Page")).toBeInTheDocument();
  });
  it("renders the contact page without crashing", () => {
    render(
      <MemoryRouter initialEntries={["/contact"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Contact Page")).toBeInTheDocument();
  });
  it("renders the terms page without crashing", () => {
    render(
      <MemoryRouter initialEntries={["/terms"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Terms Page")).toBeInTheDocument();
  });
  it("renders the policy page without crashing", () => {
    render(
      <MemoryRouter initialEntries={["/policy"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Policy Page")).toBeInTheDocument();
  });
  it("404 page not found for undefined routes", () => {
    render(
      <MemoryRouter initialEntries={["/some/undefined/route"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("404 Page Not Found")).toBeInTheDocument();
  });
});
