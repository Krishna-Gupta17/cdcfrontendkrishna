import React, { useEffect, useState, useRef } from 'react';
import '../styles/Carousel3D.css';

import Glimpse1 from "../assets/glimpses/Glimpse1.png";
import Glimpse2 from "../assets/glimpses/Glimpse2.png";
import Glimpse3 from "../assets/glimpses/Glimpse3.png";
import Glimpse4 from "../assets/glimpses/Glimpse4.png";
import Glimpse5 from "../assets/glimpses/Glimpse5.png";
import Glimpse6 from "../assets/glimpses/Glimpse6.png";
import Glimpse7 from "../assets/glimpses/Glimpse7.png";
import Glimpse8 from "../assets/glimpses/Glimpses8.png";
import Glimpse9 from "../assets/glimpses/Glimpse9.png";
import Glimpse10 from "../assets/glimpses/Glimpse10.png";
import Glimpse11 from "../assets/glimpses/Glimpse11.png";
import Glimpse12 from "../assets/glimpses/Glimpse12.png";

const images = [
  Glimpse1,
  Glimpse2,
  Glimpse3,
  Glimpse4,
  Glimpse10,
  Glimpse6,
  Glimpse7,
  Glimpse8,
  Glimpse9,
  Glimpse5,
  Glimpse11,
  Glimpse12,
];

const Carousel3D = () => {
  const sceneRef = useRef(null);
  const lastScrollTime = useRef(0);
  const scrollCooldown = 500;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [zDepth, setZDepth] = useState(500);

  const total = images.length;
  const angleStep = 360 / total;

  const rotate = (direction) => {
    setCurrentIndex((prevIndex) => (prevIndex + direction + total) % total);
  };


  // Hijack scroll to rotate carousel
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime.current < scrollCooldown) return;
      lastScrollTime.current = now;

      if (e.deltaY > 0) rotate(1);
      else rotate(-1);
    };

    const scrollZone = document.querySelector('.carousel-scroll-zone');
    if (scrollZone) {
      scrollZone.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (scrollZone) {
        scrollZone.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Responsive Z-depth
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200) setZDepth(500);
      else if (width >= 700) setZDepth(400);
      else setZDepth(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Rotation transform
  useEffect(() => {
    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach((item, i) => {
      const offset = ((i - currentIndex + total) % total);
      const rotation = offset * angleStep;

      item.classList.remove('center');
      item.style.zIndex = `${10 - Math.abs(offset)}`;
      item.style.transform = `
        translateX(-50%)
        rotateY(${rotation}deg)
        translateZ(${zDepth}px)
      `;

      if (offset === 0) {
        item.classList.add('center');
        item.style.opacity = '1';
        item.style.zIndex = '20';
      }
    });
  }, [currentIndex, zDepth]);

  return (
    <div className="scene mb-[8vw]" ref={sceneRef} >
      <div className="relative bg-transparent w-full h-auto mb-[4vw] custom-md2:mb-[5vw] custom-md3:mb-[7vw]">
            <h2 className="text-white text-center font-inter font-bold text-3xl sm:text-4xl custom-md2:text-5xl custom-md3:text-6xl">Glimpses of CDC </h2>
      </div>
      <div className="carousel carousel-scroll-zone">
        {images.map((src, index) => (
          <div key={index} className="carousel-item">
            <img src={src} alt={`Glimpse ${index + 1}`} />
            <div className="carousel-text">
              <button>VIEW CASE</button>
            </div>
          </div>
        ))}
      </div>

      <div className="controls">
        <button onClick={() => rotate(-1)}>←</button>
        <button onClick={() => rotate(1)}>→</button>
      </div>
    </div>
  );
};

export default Carousel3D;
