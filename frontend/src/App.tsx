import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Gallery from "./components/gallery/Gallery";
import Carousel from "./components/carousel/Carousel";
import { ImageI } from "./interfaces/image.interface";
import Loader from "./components/loader/Loader";

const App: React.FC = () => {
  const [showGallery, setShowGallery] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [images, setImages] = useState<ImageI[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/images")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const handleOnChangeView = useCallback(() => {
    setShowGallery((prevState) => !prevState);
  }, []);

  return (
    <div className="container pb-2">
      <h1 className="text-center">
        Images app: (View is {showGallery ? "Gallery" : "Carousel"})
      </h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-end mb-2">
            <button className="blue-button" onClick={handleOnChangeView}>
              Change View
            </button>
          </div>
          {showGallery ? (
            <Gallery images={images} />
          ) : (
            <Carousel images={images} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
