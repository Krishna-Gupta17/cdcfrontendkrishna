import React from "react";
import eventDes from "../../data/eventDes";

const EventCard = ({event}) => {

  return (
    // Responsive container with padding and flex direction
    <div className="flex flex-col md:flex-row font-inter font-medium text-white mt-6 mx-4 md:ml-14 md:mr-14 rounded-2xl h-auto">
      {/* Event Image */}
      <div className="flex-shrink-0 md:w-auto w-full flex justify-center items-center md:h-80 h-auto">
        <img src={event.image} alt="event" className="md:w-auto h-80 w-auto object-contain" />
      </div>

      {/* Content Section */}
      <div className="flex-1 ml-0 md:ml-6 mt-6 md:mt-0">
        {/* Description Section */}
        <div>
          <h3 className="text-white bg-white/15 pt-1 pb-1 font-inter text-2xl font-bold w-full md:w-48 text-center rounded-md">
            Description
          </h3>
          <p className="mt-5 font-inter font-medium text-xl content-evenly leading-relaxed">{event.description}</p>
        </div>

        {/* Schedule, Venue, and Registration Section */}
        {/* Changed to flex-wrap for responsiveness */}
        <div className="flex flex-wrap justify-between mt-11">
          {/* Schedule */}
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <h4 className="text-white bg-white/15 pt-1 pb-1 font-inter text-xl font-bold w-full md:w-3/5 text-center rounded-full">Schedule</h4>
            <p className="mt-4 text-center md:text-left">{event.schedule.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}</p>
          </div>
          <div className="w-px h-28 bg-gray-500 hidden md:block" />
          
          {/* Venue */}
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <h4 className="text-white bg-white/15 pt-1 pb-1 font-inter text-xl font-bold w-full md:w-5/6 text-center rounded-full">Venue</h4>
            <p className="mt-4 text-center md:text-left">{event.venue.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}</p>
          </div>
          <div className="w-px h-28 bg-gray-500 hidden md:block" />
          
          {/* Registration */}
          <div className="w-full md:w-auto">
            <h4 className="text-white bg-white/15 pt-1 pb-1 font-inter text-xl font-bold w-full md:w-40 text-center rounded-full">Registeration</h4>
            <p className="mt-4 text-center md:text-left">{event.registeration.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
