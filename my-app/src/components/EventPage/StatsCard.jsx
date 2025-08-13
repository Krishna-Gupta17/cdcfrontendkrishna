import React from "react";
import flag from "../../assets/events/icon_2.png";
import man from "../../assets/events/icon_1.png";

const StatsCard = ({ stats }) => {
  return (
    <div className="bg-gradient-to-br from-[#2A174E] to-[#311B63] rounded-2xl border border-violet-500 text-white px-6 py-10 w-full ">
      {/* Changes the layout from a row on small screens and up to a column on mobile */}
      <div className="flex flex-col sm:flex-row justify-around items-center gap-y-6 gap-x-10">
        {/* Students Attended Workshops */}
        <div className="flex items-center gap-4">
          <img src={man} alt="icon" className="w-10 h-10" />
          <div>
            <div className="text-2xl font-bold">{stats.workshops}+</div>
            <div className="text-sm text-purple-200 leading-tight">
              Students Attended <br /> Workshops
            </div>
          </div>
        </div>

        {/* Participated in Competition */}
        <div className="flex items-center gap-4">
          <img src={flag} alt="icon" className="w-10 h-10" />
          <div>
            <div className="text-2xl font-bold">{stats.participants}+</div>
            <div className="text-sm text-purple-200 leading-tight">
              Participated in <br /> Competition
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
