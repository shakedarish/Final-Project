import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Terms from "../components/pages/Terms";
import "@testing-library/jest-dom";

jest.mock("../components/Footer.jsx", () => () => <div>Footer component</div>);
jest.mock(
  "../components/EditButton",
  () =>
    ({ text, onClick, additionalClass }) =>
      (
        <button onClick={onClick} className={additionalClass}>
          {text}
        </button>
      )
);
beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe("Terms Component", () => {
  const renderWithRouter = (ui, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);
    return render(ui, { wrapper: BrowserRouter });
  };

  it("renders the terms page without crashing", () => {
    renderWithRouter(<Terms />);
    expect(screen.getByText(/Generate Video with Ease/i)).toBeInTheDocument();
  });

  it("displays the terms of service correctly", () => {
    renderWithRouter(<Terms />);
    const termsOfServiceHeaders = screen.getAllByText(/Terms of Service/i);
    expect(termsOfServiceHeaders.length).toBeGreaterThan(0); // Check that at least one element exists
  });

  it("checks for the presence of the footer", () => {
    renderWithRouter(<Terms />);
    expect(screen.getByText("Footer component")).toBeInTheDocument();
  });
});
