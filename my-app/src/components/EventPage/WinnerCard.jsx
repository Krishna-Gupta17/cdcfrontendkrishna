import React, { useState, useEffect } from "react";
import timelineData from "../../data/timelineData.js";
import vector from "../../assets/events/vector.png";

const WinnerCard = ({ eventId, year }) => {
  const winners = timelineData.filter(
    (item) => item.id === eventId && item.year === parseInt(year)
  );

  const topThree = winners
    .sort((a, b) => parseInt(a.rank) - parseInt(b.rank))
    .slice(0, 3); // Only ranks 1, 2, 3

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topThree.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [topThree]);

  const item = topThree[currentIndex];

  if (!item) return null;

  return (
    <div className="bg-gradient-to-br from-[#4356B980] to-[#7760CB] rounded-2xl text-white px-6 py-10 w-full max-w-sm md:w-[450px] mx-auto shadow-lg transition-all m-5 duration-500  flex flex-col items-center``">
      <h3 className="text-center text-xl font-semibold mb-2">{item.title}</h3>
      <img
        src={item.image}
        alt="winner-photo"
        className="w-auto h-32 sm:h-40 object-cover rounded-xl mb-2"
      />
      <div className="text-center text-yellow-400 text-lg font-bold mb-2">
        🥉 Rank {item.rank}
      </div>
      <ul className="space-y-2 text-left">
        {item.team.map((member, idx) => (
          <li key={idx} className="flex items-center gap-1">
            <span><img src={vector} className="w-4/5" /></span> {member}
          </li>
        ))}
      </ul>

      {/* Dots for top three only */}
      <div className="flex justify-center gap-2 mt-4">
        {topThree.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default WinnerCard;
