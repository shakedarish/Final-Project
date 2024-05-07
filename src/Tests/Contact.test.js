import React from "react";
import { render, act, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Swal from "sweetalert2";
import Contact from "../components/pages/Contact";
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true, isDenied: false })),
}));

describe("Contact Form", () => {
  const setup = () =>
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

  beforeEach(() => {
    Swal.fire.mockClear();
  });

  it("renders the contact form", () => {
    setup();
    expect(screen.getByLabelText(/First name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
  });

  it("updates state correctly when input changes", async () => {
    setup(); // Function that mounts the component
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Email:/i), {
        target: { value: "new.email@example.com" },
      });
    });
    expect(screen.getByLabelText(/Email:/i).value).toBe(
      "new.email@example.com"
    );
  });
});
