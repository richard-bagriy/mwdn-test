import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import fetchMock from "jest-fetch-mock";

const mockImages = [
  { id: 1, title: "Image 1", url: "https://example.com/image1.jpg" },
  { id: 2, title: "Image 2", url: "https://example.com/image2.jpg" },
];

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce(JSON.stringify(mockImages));
});

describe("App", () => {
  it("should fetch images and render the gallery by default", async () => {
    const { getByText, getAllByAltText, queryByTestId } = render(<App />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect(queryByTestId("loader")).not.toBeInTheDocument();
    });

    const galleryHeading = getByText(/Images app: \(View is Gallery\)/i);
    expect(galleryHeading).toBeInTheDocument();

    const imageElements = getAllByAltText(/Image \d/);
    expect(imageElements.length).toBe(mockImages.length);
  });

  it("should toggle between gallery and carousel views", async () => {
    const { getByText, getByTestId, getAllByAltText, queryByTestId } = render(
      <App />
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect(queryByTestId("loader")).not.toBeInTheDocument();
    });

    const carouselButton = getByText("Change View");
    fireEvent.click(carouselButton);

    const carouselHeading = getByText(/Images app: \(View is Carousel\)/i);
    expect(carouselHeading).toBeInTheDocument();

    const indicatorElement = getByTestId("indicator-1");
    fireEvent.click(indicatorElement);

    const carouselImage = getAllByAltText("Image 2")[0];
    expect(carouselImage).toBeInTheDocument();
  });
});
