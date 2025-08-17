// EventWheel.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import eventDes from "../data/eventDes";
import EventDetails from "./EventDetails";
import wheelcenter from "../assets/eventsection/wheelcenter.png";

const EventWheel = () => {
  const carouselRef = useRef(null);
  const itemRefs = useRef([]);
  const labelRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(-90);
  const [isAnimating, setIsAnimating] = useState(false);

  const radius = 150;
  const centerX = 200;
  const centerY = 200;

  // ✅ update wheel based on ANY rotation (infinite, no modulo)
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

        // Determine active item by closest to "top" (270°)
        const normalizedAngle = ((angle % 360) + 360) % 360;
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

  // ✅ move continuously to a new index (no modulo clamp)
  const moveToIndex = useCallback(
    (index) => {
      const totalItems = eventDes.length;
      const angleStep = 360 / totalItems;

      // compute absolute target rotation (not wrapped)
      const targetRotation = rotation - (index - currentIndex) * angleStep;

      setIsAnimating(true);
      gsap.to({}, {
        duration: 0.6,
        ease: "power2.out",
        onUpdate: function () {
          const progress = this.progress();
          const currentRot =
            rotation + (targetRotation - rotation) * progress;
          updateCarouselPositions(currentRot);
        },
        onComplete: () => {
          setRotation(targetRotation);
          setCurrentIndex(((index % totalItems) + totalItems) % totalItems);
          setIsAnimating(false);
        },
      });
    },
    [rotation, currentIndex, updateCarouselPositions]
  );

  // ✅ scroll handler (always infinite)
  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      if (isAnimating) return;

      const totalItems = eventDes.length;
      let newIndex = currentIndex;

      if (e.deltaY > 0) {
        newIndex = currentIndex + 1; // move forward
      } else if (e.deltaY < 0) {
        newIndex = currentIndex - 1; // move backward
      }

      moveToIndex(newIndex);
    },
    [currentIndex, moveToIndex, isAnimating]
  );

  // ✅ Attach scroll
  useEffect(() => {
    const wheelContainer = carouselRef.current;
    if (!wheelContainer) return;

    wheelContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      wheelContainer.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  // ✅ Initial render
  useEffect(() => {
    updateCarouselPositions(rotation);
  }, [updateCarouselPositions, rotation]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 px-6 text-white">
      {/* Wheel */}
      <div className="relative w-[80vw] max-w-[400px] aspect-square flex-shrink-0 mt-28">
        <div
          ref={carouselRef}
          className="relative w-full h-full cursor-grab select-none"
          style={{ touchAction: "none" }}
        >
          {/* Outer rings */}
          <div className="absolute inset-12 border border-blue-800 rounded-full shadow-[0_0_40px_20px_rgba(101,104,255,0.53)]"></div>

          {/* Center display */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <img
                src={wheelcenter}
                alt={eventDes[currentIndex].name}
                className="w-16 h-16 mx-auto"
              />
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
