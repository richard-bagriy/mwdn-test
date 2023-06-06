import React, { useCallback, useState } from "react";
import { ImageI } from "../../interfaces/image.interface";
import "./Carousel.css";

interface Props {
  images: ImageI[];
}
const Carousel: React.FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images]);

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const currentImage = images[currentIndex];

  return (
    <div className="carousel">
      <button
        className="arrow-button prev-button"
        onClick={goToPrevious}
        disabled={currentIndex === 0}>
        &lt;
      </button>
      <button
        className="arrow-button next-button"
        onClick={goToNext}
        disabled={currentIndex === images.length - 1}>
        &gt;
      </button>
      <div className="image-container">
        <img src={currentImage.url} alt={currentImage.title} />
      </div>
      <div className="indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToImage(index)}></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
