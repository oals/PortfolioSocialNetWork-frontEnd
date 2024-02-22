import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";

const ResizedImage = ({ file }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (file) {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          setImageSrc(uri);
        },
        "base64",
      );
    }
  }, [file]);

  return imageSrc ? <img src={imageSrc} alt="Resized" /> : null;
};

export default ResizedImage;
