import React, { useState, useEffect } from "react";

/**
 * Composant d'image optimisé avec lazy loading et srcset responsive
 * Usage: <LazyImage src="product.webp" alt="Café" />
 */
const LazyImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  // Générer les chemins pour srcset
  const baseName = src.replace(/\.[^/.]+$/, ""); // Retirer l'extension
  const mobileSrc = `${baseName}-mobile.webp`;
  const tabletSrc = `${baseName}-tablet.webp`;
  const desktopSrc = src.endsWith(".webp") ? src : `${baseName}.webp`;

  useEffect(() => {
    // Précharger si prioritaire
    if (priority) {
      const img = new Image();
      img.src = desktopSrc;
      img.onload = () => {
        setImageSrc(desktopSrc);
        setIsLoaded(true);
      };
    } else {
      setImageSrc(desktopSrc);
    }
  }, [desktopSrc, priority]);

  return (
    <img
      src={imageSrc || desktopSrc}
      srcSet={`
                ${mobileSrc} 480w,
                ${tabletSrc} 768w,
                ${desktopSrc} 1920w
            `}
      sizes="(max-width: 768px) 480px, (max-width: 1200px) 768px, 1920px"
      alt={alt}
      className={`${className} ${isLoaded ? "loaded" : "loading"}`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      width={width}
      height={height}
      onLoad={() => setIsLoaded(true)}
      style={{
        opacity: isLoaded ? 1 : 0.5,
        transition: "opacity 0.3s ease-in-out",
      }}
    />
  );
};

export default LazyImage;
