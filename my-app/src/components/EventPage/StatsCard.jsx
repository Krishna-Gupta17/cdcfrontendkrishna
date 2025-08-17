import React from "react";
import flag from "../../assets/events/icon_2.png";
import man from "../../assets/events/icon_1.png";

const StatsCard = ({ stats }) => {
  return (
    <div className="bg-gradient-to-br from-[#2A174E] to-[#311B63] 
        rounded-2xl border border-violet-500 text-white 
        px-8 py-10 w-full max-w-md md:max-w-lg 
        shadow-lg transition-all duration-300 
        hover:scale-105 hover:shadow-[0_0_25px_#7760CB]">
      
      <div className="flex flex-col sm:flex-row justify-around items-center gap-y-8 gap-x-12">
        
        {/* Students Attended Workshops */}
        <div className="flex flex-col items-center text-center">
          <img src={man} alt="icon" className="w-12 h-12 mb-3" />
          <div className="text-3xl font-extrabold">{stats.workshops}+</div>
          <div className="text-sm text-purple-200 mt-1">
            Students Attended <br /> Workshops
          </div>
        </div>

        {/* Participated in Competition */}
        <div className="flex flex-col items-center text-center">
          <img src={flag} alt="icon" className="w-12 h-12 mb-3" />
          <div className="text-3xl font-extrabold">{stats.participants}+</div>
          <div className="text-sm text-purple-200 mt-1">
            Participated in <br /> Competition
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
