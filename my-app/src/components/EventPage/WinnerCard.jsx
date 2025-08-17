import React, { useState, useEffect } from "react";
import timelineData from "../../data/timelineData.js";
import vector from "../../assets/events/vector.png";

const WinnerCard = ({ eventId, year }) => {
  const winners = timelineData.filter(
    (item) => item.id === eventId && item.year === parseInt(year)
  );

  const topThree = winners
    .sort((a, b) => parseInt(a.rank) - parseInt(b.rank))
    .slice(0, 3);

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
    <div className="bg-gradient-to-br from-[#4356B980] to-[#7760CB] 
        rounded-2xl border border-violet-500 text-white 
        px-6 py-10 w-full max-w-md md:max-w-lg 
        mx-auto shadow-lg transition-all duration-300 
        hover:scale-105 hover:shadow-[0_0_25px_#7760CB]
        flex flex-col items-center">
      
      <h3 className="text-center text-2xl md:text-3xl font-semibold mb-4">
        {item.title}
      </h3>

      <img
        src={item.image}
        alt="winner"
        className="w-full max-w-[250px] h-40 md:h-56 object-cover rounded-xl mb-4"
      />

      <div className="text-center text-yellow-400 text-xl font-bold mb-3">
        🏆 Rank {item.rank}
      </div>

      <ul className="space-y-2 text-left w-full px-4">
        {item.team.map((member, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <img src={vector} className="w-4 h-4" alt="bullet" />
            <span>{member}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-center gap-2 mt-6">
        {topThree.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === currentIndex ? "bg-white" : "bg-white/40"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default WinnerCard;


