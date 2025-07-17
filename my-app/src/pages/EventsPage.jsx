import React, { useState, useEffect } from "react";
import eventDes from "../data/eventDes";
import timelineData from "../data/timelineData";
import EventCard from "../components/EventPage/EventCard";
import StatsCard from "../components/EventPage/StatsCard";
import WinnerCard from "../components/EventPage/WinnerCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";


const EventPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentEvent = eventDes[currentIndex];
  const eventId = currentEvent.id;

  // Filter timeline for only this event
  const filteredTimeline = timelineData.filter((item) => item.id === eventId);

  // Group ranks by year
  const timelineByYear = {};
  filteredTimeline.forEach((item) => {
    if (!timelineByYear[item.year]) {
      timelineByYear[item.year] = {
        stats: item.stats,
        ranks: [],
      };
    }
    timelineByYear[item.year].ranks.push(item);
  });

  const sortedYears = Object.keys(timelineByYear).sort((a, b) => b - a);

   const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + eventDes.length) % eventDes.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % eventDes.length);
  };

  return (
    <div className="bg-transparent text-white font-inter min-h-screen pb-20 relative overflow-x-hidden">
      <div className="flex items-center justify-center gap-6 mt-10 px-4">
        {/* Left Arrow */}
        <button onClick={handlePrev} >
          <ChevronLeft className="w-10 h-10 text-white bg-white/10 rounded-full p-2 hover:bg-white/30" />
        </button>

        {/* Event Description */}
        <div className="z-10 relative">
        <EventCard event={currentEvent} />
        </div>

        {/* Right Arrow */}
        <button onClick={handleNext}>
          <ChevronRight className="w-10 h-10 text-white bg-white/10 rounded-full p-2 hover:bg-white/30" />
        </button>
      </div>

      {/* Title */}
      <h2 className="text-4xl font-bold text-center mt-20 mb-16">
        Winners Through the Years
      </h2>

      {/* Timeline Section */}
        
      <div className="relative w-full max-w-7xl mx-auto px-4 pb-32">
        {/* Vertical Timeline Line */}
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-white/40 z-0" />

        {sortedYears.map((year) => (
          <motion.div
            key={year}
            className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-x-20 mb-32"
             initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
          >
            {/* Stats Card */}
            <div className="md:w-1/2 md:pr-10 flex justify-end md:pr-0 mb-6 md:mb-0">
              <StatsCard stats={timelineByYear[year].stats} />
            </div>

            {/* year */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-white text-black text-xl font-bold rounded-full w-14 h-14 flex items-center justify-center border-4 border-black z-20">
              {year}
            </div>

            {/* Winner Card */}
            <div className="md:w-1/2 flex justify-start pl-8">
              <WinnerCard eventId={eventId} year={year} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
   
  );
};

export default EventPage;
