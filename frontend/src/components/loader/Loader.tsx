import React from "react";
import "./Loader.css";

const Loader: React.FC = () => (
  <div className="loader-container" data-testid="loader">
    <div className="loader"></div>
  </div>
);

export default Loader;
