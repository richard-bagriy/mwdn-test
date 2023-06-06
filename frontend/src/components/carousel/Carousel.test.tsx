import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

const images = [
  { id: 1, title: "Image 1", url: "https://example.com/image1.jpg" },
  { id: 2, title: "Image 2", url: "https://example.com/image2.jpg" },
];

describe("Carousel", () => {
  it("should render the first image by default", () => {
    const { getByAltText } = render(<Carousel images={images} />);
    const imageElement = getByAltText(images[0].title) as HTMLImageElement;
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(images[0].url);
  });

  it("should go to the previous image when the previous button is clicked", () => {
    const { getByTestId, getByAltText } = render(<Carousel images={images} />);
    const prevButton = getByTestId("prev");
    fireEvent.click(prevButton);
    const image = images[0];
    const imageElement = getByAltText(image.title) as HTMLImageElement;
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(image.url);
  });

  it("should go to the next image when the next button is clicked", () => {
    const { getByTestId, getByAltText } = render(<Carousel images={images} />);
    const nextButton = getByTestId("next");
    fireEvent.click(nextButton);
    const image = images[1];
    const imageElement = getByAltText(image.title) as HTMLImageElement;
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(image.url);
  });

  it("should go to the clicked image when an indicator is clicked", () => {
    const { getByTestId, getByAltText } = render(<Carousel images={images} />);
    const secondIndicator = getByTestId("indicator-1");
    fireEvent.click(secondIndicator);
    const imageElement = getByAltText(images[1].title) as HTMLImageElement;
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(images[1].url);
  });
});
