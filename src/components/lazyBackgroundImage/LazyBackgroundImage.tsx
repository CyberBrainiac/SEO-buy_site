import React, { useEffect, useRef } from 'react';

interface LazyBackgroundImageProps {
  imgStyle: object;
  imgUrl: string;
}

const LazyBackgroundImage: React.FC<LazyBackgroundImageProps> = ({ imgStyle, imgUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust this threshold based on your needs
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!containerRef.current) return;

          // Load or apply background image when the element is in the viewport
          containerRef.current.style.backgroundImage = `url(${imgUrl})`;
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Start observing the container
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Clean up the observer on component unmount
    return () => observer.disconnect();
  }, [imgUrl]);

  return <div ref={containerRef} style={imgStyle}></div>;
};

export default LazyBackgroundImage;
