import React from "react";
import { ImageI } from "../../interfaces/image.interface";
import "./Gallery.css";

interface Props {
  images: ImageI[];
}

const Gallery: React.FC<Props> = ({ images }) => {
  return (
    <div className="gallery">
      {images.map(({ url, id, title }) => (
        <div key={id} className="gallery-item">
          <div className="gallery-img-wrapper">
            <img src={url} alt={title} className="gallery-img" />
          </div>
          <div className="gallery-description">{title}</div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
