import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios"; // Mock axios for API request
import Apod from "../components/APOD";

jest.mock("axios");

describe("Apod Component", () => {
  test("renders without crashing", async () => {
    // Mock API response
    const mockResponse = {
      data: {
        title: "Mock Title",
        date: "2024-05-03",
        explanation: "Mock explanation...",
        hdurl: "mock-url.jpg",
      },
    };
    axios.get.mockResolvedValue(mockResponse);

    // Render the component
    render(<Apod />);

    // Wait for API request to complete
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Check if component renders the title
    expect(
      screen.getByText("Astronomy Picture Of The Day")
    ).toBeInTheDocument();

    // Check if component renders the mock title
    expect(screen.getByText("Mock Title")).toBeInTheDocument();

    // Check if component renders the mock date
    expect(screen.getByText("-2024-05-03-")).toBeInTheDocument();

    // Check if component renders the mock explanation (shortened version)
    expect(screen.getByText("Mock explanation...")).toBeInTheDocument();

    // Check if component renders the "Click here to see more" text
    expect(screen.getByText("Click here to see more")).toBeInTheDocument();
  });
});
