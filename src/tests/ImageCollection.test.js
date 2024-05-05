import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import PreviewImage from "../PreviewImage";

jest.mock("axios");

describe("PreviewImage component", () => {
  it("renders image when data is fetched successfully", async () => {
    const imageUrl = "https://example.com/image.jpg";
    const imageName = "PIA18033";
    const responseData = {
      data: {
        collection: {
          items: [
            {
              href: `${imageUrl}~orig`,
            },
          ],
        },
      },
    };
    axios.get.mockResolvedValue(responseData);

    const { getByAltText } = render(<PreviewImage imageName={imageName} />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `https://images-api.nasa.gov/asset/${imageName}`
      );
    });

    const imageElement = getByAltText("");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(imageUrl);
  });

  it('renders "No image found" when data fetching fails', async () => {
    const imageName = "PIA18033";
    axios.get.mockRejectedValue(new Error("Failed to fetch data"));

    const { getByText } = render(<PreviewImage imageName={imageName} />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `https://images-api.nasa.gov/asset/${imageName}`
      );
    });

    const noImageFoundElement = getByText("No image found");
    expect(noImageFoundElement).toBeInTheDocument();
  });
});
