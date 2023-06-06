import React from "react";
import { render } from "@testing-library/react";
import Gallery from "./Gallery";

const images = [
  { id: 1, title: "Image 1", url: "https://example.com/image1.jpg" },
  { id: 2, title: "Image 2", url: "https://example.com/image2.jpg" },
  { id: 3, title: "Image 2", url: "https://example.com/image2.jpg" },
  { id: 4, title: "Image 2", url: "https://example.com/image2.jpg" },
  { id: 5, title: "Image 2", url: "https://example.com/image2.jpg" },
];

describe("Gallery", () => {
  it("should render all images in the gallery", () => {
    const { getAllByAltText } = render(<Gallery images={images} />);
    const imageElements = getAllByAltText(/Image \d/);
    expect(imageElements.length).toBe(5);
  });
});
