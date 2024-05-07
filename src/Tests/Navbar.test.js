import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar"; // Ensure the path to your Navbar component is correct
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

// Mock FontAwesomeIcon to prevent rendering issues in tests
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon }) => (
    <span data-testid={`icon-${icon.iconName}`}>Icon</span>
  ),
}));

describe("Navbar", () => {
  const setup = () =>
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

  it("renders without crashing", () => {
    setup();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("displays the login modal when not logged in and login is clicked", () => {
    setup();
    const loginLink = screen.getByText("Login");
    fireEvent.click(loginLink);
    const welcomeText = screen.getByText(/Welcome VidWizard/i);
    expect(welcomeText).toBeInTheDocument();
  });

  it("toggles the navigation when menu icon is clicked", async () => {
    setup();
    const menuIcon = screen.getByTestId("icon-bars");
    await act(async () => {
      fireEvent.click(menuIcon);
    });
    expect(screen.getByText("Home")).toBeVisible();
  });
  it("navigates correctly when links are clicked", () => {
    setup();
    const homeLink = screen.getByText("Home");
    fireEvent.click(homeLink);
    expect(global.window.location.pathname).toEqual("/");

    const aboutUsLink = screen.getByText("About Us");
    fireEvent.click(aboutUsLink);
    expect(global.window.location.pathname).toEqual("/about-us");
  });
  it("hides other navigation links and displays the menu icon on small screens", async () => {
    // Simulate a small screen
    global.innerWidth = 500;
    await act(async () => {
      global.dispatchEvent(new Event("resize"));
    });
    expect(screen.queryByText("Create")).toBeNull();
    expect(screen.queryByText("About Us")).toBeNull();
    expect(screen.queryByText("Login")).toBeNull();
    expect(screen.queryByText("Home")).toBeNull();
  });
});
