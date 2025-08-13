import React from "react";
import { useParams } from "react-router-dom";
import eventDes from "../data/eventDes";
import eventdata from "../data/event";
import timelineData from "../data/timelineData";
import EventCard from "../components/EventPage/EventCard";
import StatsCard from "../components/EventPage/StatsCard";
import WinnerCard from "../components/EventPage/WinnerCard";
import EventDetails from "../components/EventDetails";
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

  return (
    <div className="bg-transparent text-white font-inter min-h-screen pb-20 relative overflow-x-hidden">
      {/* Event Description */}
      <div className="flex items-center justify-center mt-10 px-4">
        <EventCard event={currentEvent} />
      </div>
       
        <div className="relative cursor-pointer w-fit mx-auto mt-1 mb-16">
        {/* 'REGISTER */}
        <a
          href="/register"
          
          className="
            relative z-10
            bg-red-500 text-white font-bold text-2xl
            py-4 px-12 inline-block
            rounded-lg
          "
        >
          REGISTER
        </a>

        {/* 'NOW' */}
      <a
          href="/register"
          className="
            absolute top-full left-1/2 -translate-x-1/2 -mt-2
            w-auto
            bg-gray-400 text-black font-bold text-2xl
            py-2 px-8
            flex items-center justify-center
            rounded-lg
            z-20
            hover:bg-gray-500 transition-colors duration-300
          "
        >
          NOW
        </a>
      </div>
      
      
       {/* Render timeline only if data exists */}
      {filteredTimeline.length > 0 && (
        <>
          {/* Title */}
          <h2 className="text-4xl font-bold text-center mt-20 mb-16">
            Winners Through the Years
          </h2>
      {/* Timeline Section */}
      <div className="relative w-full max-w-7xl mx-auto px-4 pb-10">
        {/* Vertical Line */}
      <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-white/40 z-0" />

  {sortedYears.map((year, index) => (
    <React.Fragment key={year}>
      {/* Year Point */}
      <div className="relative flex justify-center mb-1">
        <div className="bg-white text-black text-xl font-bold rounded-full w-14 h-14 flex items-center justify-center border-4 border-black z-20">
          {year}
        </div>
      </div>

      {/* Cards between this year and the next */}
      <motion.div
  className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-x-20 mb-8"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.6 }}
>
  <div className="md:w-1/2 md:pr-10 flex justify-end mb-6 md:mb-0">
    <StatsCard stats={timelineByYear[year].stats} />
  </div>

  <div className="md:w-1/2 flex justify-start pl-8">
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
