import React from "react";
import flag from "../../assets/events/icon_2.png";
import man from "../../assets/events/icon_1.png";

const StatsCard = ({ stats }) => {
  return (
    <div className="bg-gradient-to-br from-[#2A174E] to-[#311B63] rounded-2xl border border-violet-500 text-white px-6 py-10 w-[300px] h-[200px] shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_30px_#7760CB] ">
      {/* Changes the layout from a row on small screens and up to a column on mobile */}
      <div className="flex flex-col sm:flex-row justify-around items-center gap-y-6 gap-x-10">
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
