import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VideoSection from "../components/pages/VideoPage";
import "@testing-library/jest-dom";
jest.mock("../../res/icons/downloading.png");
import Swal from "sweetalert2";

// Mock hooks and modules
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: () => mockedNavigate,
}));
jest.mock("sweetalert2", () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: false })),
}));

jest.mock("react-share", () => ({
  ...jest.requireActual("react-share"),
  FacebookShareButton: jest.fn(),
  WhatsappShareButton: jest.fn(),
  TelegramShareButton: jest.fn(),
  EmailShareButton: jest.fn(),
  TwitterShareButton: jest.fn(),
}));

describe("VideoSection", () => {
  it("renders the demo video correctly", () => {
    require("react-router-dom").useParams.mockReturnValue({
      urlSuffix: "example",
      isDemo: "true",
    });
    render(
      <MemoryRouter>
        <VideoSection />
      </MemoryRouter>
    );

    expect(screen.getByText("Demo Video")).toBeInTheDocument();
  });

  it("renders the real video correctly", () => {
    require("react-router-dom").useParams.mockReturnValue({
      urlSuffix: "example",
      isDemo: "false",
    });
    render(
      <MemoryRouter>
        <VideoSection />
      </MemoryRouter>
    );

    expect(screen.getByText("Your generated video")).toBeInTheDocument();
  });

  it("navigates to home page when 'Done' button is clicked", async () => {
    const mockedNavigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => mockedNavigate);

    render(
      <MemoryRouter>
        <VideoSection />
      </MemoryRouter>
    );

    // Find and click the Done button
    const doneButton = screen.getByText("Done");
    fireEvent.click(doneButton);

    // Wait for the Swal confirmation popup and navigation
    await Swal.fire;

    // Check if the correct navigation occurred
    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });
});
