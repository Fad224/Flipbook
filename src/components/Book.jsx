import React, { useRef, useEffect, useState } from 'react'
import HTMLFlipBook from "react-pageflip";
import frontCover from '../../assets/FrontCover.png';
import page2 from '../../assets/Fadi Azzam Portfolio - 2.png';
import page3 from '../../assets/Fadi Azzam Portfolio - 3.png';
import page4 from '../../assets/Fadi Azzam Portfolio - 4.png';
import page5 from '../../assets/Fadi Azzam Portfolio - 5.png';
import page6 from '../../assets/Fadi Azzam Portfolio - 6.png';
import page7 from '../../assets/Fadi Azzam Portfolio - 7.png';
import page8 from '../../assets/Fadi Azzam Portfolio - 8.png';
import page9 from '../../assets/Fadi Azzam Portfolio - 9.png';
import page10 from '../../assets/Fadi Azzam Portfolio - 10.png';
import page11 from '../../assets/Fadi Azzam Portfolio - 11.png';
import page12 from '../../assets/Fadi Azzam Portfolio - 12.png';
import page13 from '../../assets/Fadi Azzam Portfolio - 13.png';
import backCover from '../../assets/BackCover.png';

function Book() {

  const bookRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);
  const [bookDimensions, setBookDimensions] = useState({ width: 707, height: 500 });

  useEffect(() => {
    const calculateDimensions = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const aspectRatio = 707 / 500; // Original aspect ratio
      
      // Add padding/margin
      const padding = screenWidth < 768 ? 20 : 40;
      const maxWidth = screenWidth - padding;
      const maxHeight = screenHeight - padding;
      
      let width, height;
      
      // Calculate dimensions while maintaining aspect ratio
      if (maxWidth / aspectRatio <= maxHeight) {
        width = maxWidth;
        height = maxWidth / aspectRatio;
      } else {
        height = maxHeight;
        width = maxHeight * aspectRatio;
      }
      
      setBookDimensions({ width, height });
    };
    
    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    
    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isAnimating) return;
      if (event.key === 'ArrowLeft') {
        setIsAnimating(true);
        bookRef.current.pageFlip().flipPrev();
      } else if (event.key === 'ArrowRight') {
        setIsAnimating(true);
        bookRef.current.pageFlip().flipNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnimating]);

  const pages = [
    frontCover,
    page2,
    page3,
    page4,
    page5,
    page6,
    page7,
    page8,
    page9,
    page10,
    page11,
    page12,
    page13,
    backCover
  ];

  return (
    <HTMLFlipBook 
      ref={bookRef}
      width={bookDimensions.width} 
      height={bookDimensions.height}
      maxShadowOpacity={0.5}
      drawShadow={true}
      showCover={true}
      size='fixed'
      onChangeState={(e) => {
        if (e.data !== 'flipping') {
          setIsAnimating(false);
        }
      }}
    >
      {pages.map((src, index) => (
        <div className="page" key={index}>
          <div className="page-content">
            <img 
              src={src} 
              alt={`Page ${index + 1}`} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      ))}
    </HTMLFlipBook>
  );
}

export default Book