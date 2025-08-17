import React from "react";
import { useParams } from "react-router-dom";
import eventDes from "../data/eventDes";
import timelineData from "../data/timelineData";
import EventCard from "../components/EventPage/EventCard";
import StatsCard from "../components/EventPage/StatsCard";
import WinnerCard from "../components/EventPage/WinnerCard";
import { motion } from "framer-motion";

const EventsPage = () => {
  const { eventId } = useParams();
  const currentEvent = eventDes.find((event) => event.id === eventId);

  if (!currentEvent) {
    return (
      <div className="text-white text-center mt-20 text-2xl">
        Event not found.
      </div>
    );
  }

  const filteredTimeline = timelineData.filter((item) => item.id === eventId);

  const timelineByYear = {};
  filteredTimeline.forEach((item) => {
    if (!timelineByYear[item.year]) {
      timelineByYear[item.year] = { stats: item.stats, ranks: [] };
    }
    timelineByYear[item.year].ranks.push(item);
  });

  const sortedYears = Object.keys(timelineByYear).sort((a, b) => b - a);

  return (
    <div className="bg-transparent text-white font-inter min-h-screen pb-20 relative overflow-x-hidden">
      
      {/* Event Description */}
      <div className="flex items-center justify-center mt-10 px-4">
        <EventCard event={currentEvent} />
      </div>

      {/* Register Button */}
      <div className="relative w-fit mx-auto mt-8 mb-20">
        <a
          href="/register"
          className="relative z-10 bg-red-500 text-white font-bold text-2xl py-4 px-12 inline-block rounded-lg"
        >
          REGISTER
        </a>
        <a
          href="/register"
          className="absolute top-full left-1/2 -translate-x-1/2 -mt-2
            bg-gray-400 text-black font-bold text-2xl py-2 px-8 rounded-lg
            hover:bg-gray-500 transition-colors duration-300 z-20"
        >
          NOW
        </a>
      </div>

      {/* Timeline */}
      {filteredTimeline.length > 0 && (
        <>
          <h2 className="text-4xl font-bold text-center mt-12 mb-16">
            Winners Through the Years
          </h2>

          <div className="relative w-full max-w-7xl mx-auto px-4 pb-10">
            
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-white/30 z-0" />

            {sortedYears.map((year, index) => (
              <React.Fragment key={year}>
                
                {/* Year Bubble */}
                <div className="relative flex justify-center mb-6">
                  <div className="bg-white text-black text-xl font-bold rounded-full w-14 h-14 flex items-center justify-center border-4 border-black z-20">
                    {year}
                  </div>
                </div>

                {/* Cards */}
                <motion.div
                  className={`relative z-10 flex flex-col md:flex-row items-center gap-y-10 gap-x-12 mb-16 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="md:w-1/2 flex justify-center">
                    <StatsCard stats={timelineByYear[year].stats} />
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <WinnerCard eventId={eventId} year={year} />
                  </div>
                </motion.div>
              </React.Fragment>
            ))}

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full z-20"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default EventsPage;
