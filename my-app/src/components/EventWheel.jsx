// EventWheel.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import eventDes from "../data/eventDes"; // ✅ Import your existing data
import EventDetails from "./EventDetails";

const EventWheel = () => {
  const carouselRef = useRef(null);
  const itemRefs = useRef([]);
  const labelRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(-90);
  const [isDragging, setIsDragging] = useState(false);
  const [lastY, setLastY] = useState(0);

  const radius = 100;
  const centerX = 200;
  const centerY = 200;

  const updateCarouselPositions = useCallback(
    (rotationAngle) => {
      const totalItems = eventDes.length;
      const angleStep = 360 / totalItems;

      eventDes.forEach((_, index) => {
        const item = itemRefs.current[index];
        const label = labelRefs.current[index];
        if (!item || !label) return;

        const angle = index * angleStep + rotationAngle;
        const radian = (angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(radian);
        const y = centerY + radius * Math.sin(radian);

        const labelRadius = radius + 40;
        const labelX = centerX + labelRadius * Math.cos(radian);
        const labelY = centerY + labelRadius * Math.sin(radian);

        const normalizedAngle = (angle + 360) % 360;
        const distanceFromTop = Math.min(
          Math.abs(normalizedAngle - 270),
          Math.abs(normalizedAngle - 270 + 360),
          Math.abs(normalizedAngle - 270 - 360)
        );
        const isActive = distanceFromTop < angleStep / 2;

        gsap.set(item, {
          x: x - 10,
          y: y - 10,
          scale: isActive ? 1.2 : 0.8,
          zIndex: isActive ? 10 : 1,
          opacity: isActive ? 1 : 0.6,
        });

        gsap.set(label, {
          x: labelX - 50,
          y: labelY - 12,
          opacity: isActive ? 1 : 0.7,
          scale: isActive ? 1.1 : 0.9,
          fontWeight: isActive ? "bold" : "normal",
        });

        if (isActive && currentIndex !== index) {
          setCurrentIndex(index);
        }
      });
    },
    [currentIndex]
  );

  const handleStart = useCallback((clientY) => {
    setIsDragging(true);
    setLastY(clientY);
  }, []);

  const handleMove = useCallback(
    (clientY) => {
      if (!isDragging) return;
      const deltaY = clientY - lastY;
      const rotationSpeed = 0.5;
      const newRotation = rotation + deltaY * rotationSpeed;
      setRotation(newRotation);
      setLastY(clientY);
      updateCarouselPositions(newRotation);
    },
    [isDragging, lastY, rotation, updateCarouselPositions]
  );

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const totalItems = eventDes.length;
    const angleStep = 360 / totalItems;
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const targetAngle = 270;

    let closestIndex = 0;
    let minDistance = Infinity;
    for (let i = 0; i < totalItems; i++) {
      const eventAngle = (i * angleStep + normalizedRotation) % 360;
      const distance = Math.min(
        Math.abs(eventAngle - targetAngle),
        Math.abs(eventAngle - targetAngle + 360),
        Math.abs(eventAngle - targetAngle - 360)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    const targetRotation = 270 - closestIndex * angleStep;
    setRotation(targetRotation);

    gsap.to({}, {
      duration: 0.5,
      ease: "power2.out",
      onUpdate: function () {
        const progress = this.progress();
        const currentRot =
          rotation + (targetRotation - rotation) * progress;
        updateCarouselPositions(currentRot);
      },
      onComplete: () => {
        setCurrentIndex(closestIndex);
      },
    });
  }, [isDragging, rotation, updateCarouselPositions]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientY);
  };
  const handleTouchStart = (e) => {
    e.preventDefault();
    handleStart(e.touches[0].clientY);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging) handleMove(e.clientY);
    };
    const handleGlobalMouseUp = () => {
      if (isDragging) handleEnd();
    };
    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, handleMove, handleEnd]);

  useEffect(() => {
    updateCarouselPositions(rotation);
  }, [updateCarouselPositions, rotation]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 px-6 text-white">
      {/* Wheel */}
      <div className="relative w-[80vw] max-w-[400px] aspect-square flex-shrink-0">
        <div
          ref={carouselRef}
          className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={(e) => {
            e.preventDefault();
            handleMove(e.touches[0].clientY);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleEnd();
          }}
          style={{ touchAction: "pan-y" }}
        >
          {/* Outer rings */}
          <div className="absolute inset-8 border border-gray-600/20 rounded-full"></div>
          <div className="absolute inset-12 border border-gray-700/10 rounded-full"></div>

          {/* Center display */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              {/* <div className="text-2xl font-bold uppercase tracking-wider mb-2">
                {eventDes[currentIndex].name}
              </div> */}
              <img
                src={eventDes[currentIndex].image}
                alt={eventDes[currentIndex].name}
                className="w-16 h-16 mx-auto"
              />
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-2"></div>
            </div>
          </div>

          {/* Dots */}
          {eventDes.map((_, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`absolute w-5 h-5 rounded-full pointer-events-none ${
                index === currentIndex ? "bg-white shadow-lg" : "bg-gray-400"
              }`}
            />
          ))}

          {/* Labels */}
          {eventDes.map((event, index) => (
            <div
              key={`label-${event.id}`}
              ref={(el) => (labelRefs.current[index] = el)}
              className="absolute text-sm pointer-events-none whitespace-nowrap"
              style={{
                color: index === currentIndex ? "#ffffff" : "#9ca3af",
              }}
            >
              {event.name}
            </div>
          ))}
        </div>
      </div>

      {/* Event Details */}
      <EventDetails event={eventDes[currentIndex]} />
    </div>
  );
};

export default EventWheel;
