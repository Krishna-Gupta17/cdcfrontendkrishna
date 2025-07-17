import React, { useEffect, useRef, useState } from "react";
import ellipse12 from "../assets/eventsection/Ellipse 12.png";

const EventWheel = ({ events, currentIndex, setCurrentIndex }) => {
  const radius = 200;
  const centerX = 200;
  const centerY = 200; // Moved center down slightly
  const angleStep = 90;

  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const timeoutRef = useRef(null);
  const wheelRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();

      const scrollSpeed = 1.0;
      const maxDelta = angleStep * 0.5;

      let delta =
        -Math.sign(e.deltaY) * Math.log(Math.abs(e.deltaY) + 1) * scrollSpeed;
      delta = Math.max(-maxDelta, Math.min(maxDelta, delta));

      let nextAngle = rotationRef.current + delta;
      const maxAngle = (events.length - 1) * angleStep;
      nextAngle = Math.max(-maxAngle, Math.min(0, nextAngle));

      rotationRef.current = nextAngle;
      setRotation(nextAngle);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const estimatedIndex = Math.round(-rotationRef.current / angleStep);
        const clampedIndex = Math.max(0, Math.min(events.length - 1, estimatedIndex));
        const targetRotation = -clampedIndex * angleStep;

        rotationRef.current = targetRotation;
        setRotation(targetRotation);
        setCurrentIndex(clampedIndex);
      }, 300);
    };

    const wheelDiv = wheelRef.current;
    if (wheelDiv) {
      wheelDiv.addEventListener("wheel", handleScroll, { passive: false });
    }

    return () => {
      if (wheelDiv) {
        wheelDiv.removeEventListener("wheel", handleScroll);
      }
    };
  }, [angleStep, events.length, setCurrentIndex]);

  return (
    <div
      ref={wheelRef}
      className="relative w-[400px] h-[520px] ml-0 mt-28"
    >
      {/* Static Orbit Image */}
      <img
        src={ellipse12}
        alt="orbit"
        className="absolute -left-40 top-16 w-[400px] h-[500px] pointer-events-none"
      />

      {/* Rotating Wheel Items */}
      <div
        className="absolute -left-36 top-16 w-[400px] h-[520px] z-10"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 0.35s ease-out"
        }}
      >
        {events.map((event, index) => {
          const angle = index * angleStep;
          const rad = (angle * Math.PI) / 180;
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);

          return (
            <div
              key={index}
              className={`absolute text-center px-2 py-1 rounded-md 
                ${index === currentIndex ? "text-white font-semibold shadow-md" : "text-white"}`}
              style={{
                left: `${centerX + x}px`,
                top: `${centerY + y}px`,
                transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
              }}
            >
              <span>{event.short}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventWheel;
