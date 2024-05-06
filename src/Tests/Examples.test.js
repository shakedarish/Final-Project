import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Examples from "../components/pages/Examples"; // Ensure the path to your Examples component is correct
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Examples", () => {
  const setup = () =>
    render(
      <BrowserRouter>
        <Examples />
      </BrowserRouter>
    );

  it("renders without crashing", () => {
    setup();
    expect(screen.getByText(/How It Works/i)).toBeInTheDocument();
    expect(screen.getByText(/Video Examples/i)).toBeInTheDocument();
  });

  it("updates subject state correctly when a new subject is selected from the dropdown", async () => {
    setup();
    const subjectDropdown = screen.getByRole("combobox", {
      name: /Select Video Subject/i,
    });
    await act(async () => {
      fireEvent.change(subjectDropdown, { target: { value: "sports" } });
    });
    expect(subjectDropdown.value).toBe("sports");
  });

  it("navigates to the correct video page when both subject and voice are selected and button is clicked", async () => {
    setup();
    const subjectDropdown = screen.getByRole("combobox", {
      name: /Select Video Subject/i,
    });
    const voiceDropdown = screen.getByRole("combobox", {
      name: /Select Voice/i,
    });
    const showVideoButton = screen.getByRole("button", { name: /Show Video/i });

    await act(async () => {
      fireEvent.change(subjectDropdown, { target: { value: "sports" } });
      fireEvent.change(voiceDropdown, { target: { value: "Female" } });
      fireEvent.click(showVideoButton);
    });
    expect(mockedNavigate).toHaveBeenCalledWith("/video/tempVideo.mp4/true");
  });

  it("does not navigate when either subject or voice is not selected", async () => {
    // Mock the alert function
    jest.spyOn(window, "alert").mockImplementation(() => {});
    setup();
    const showVideoButton = screen.getByRole("button", { name: /Show Video/i });
    fireEvent.click(showVideoButton);
    expect(window.alert).toHaveBeenCalledWith(
      "Please select both a subject and a voice before showing the video."
    );
    window.alert.mockRestore();
  });
});
