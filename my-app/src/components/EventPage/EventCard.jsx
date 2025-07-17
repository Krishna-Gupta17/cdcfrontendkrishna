import React from "react";
import eventDes from "../../data/eventDes";

const EventCard = () => {
  const event = eventDes[0]; // just grab the first one

  return (
    <div className="flex font-inter font-medium text-white mt-6 ml-14 mr-14 rounded-2xl h-96">
      <img src={event.image} alt="event" className="w-auto h-80" />
      <div className="flex-1 ml-6">
        <div>
          <h3 className="text-white bg-white/15 pt-1 pb-1 font-inter text-2xl font-bold w-48 text-center rounded-md">
            Description
          </h3>
          <p className="mt-5 font-inter font-medium text-xl content-evenly leading-relaxed">{event.description}</p>
        </div>
        <div className="flex justify-between mt-11">
          <div>
            <h4 className="text-white bg-white/15 pt-1 pb-1 font-inter text-xl font-bold w-3/5 text-center rounded-full">Schedule</h4>

            <p className="mt-4">{event.schedule.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}</p>
          </div>
          <div className="w-px h-28 bg-gray-500" />
          <div>
            <h4 className="text-white bg-white/15 pt-1 pb-1 font-inter text-xl font-bold w-5/6 text-center rounded-full">Venue</h4>
            <p className="mt-4">{event.venue.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}</p>
          </div>
          <div className="w-px h-28 bg-gray-500" />
          <div>
            <h4 className="text-white bg-white/15 pt-1 pb-1 font-inter text-xl font-bold w-40 text-center rounded-full">Registeration</h4>
            <p className="mt-4">{event.registeration.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
