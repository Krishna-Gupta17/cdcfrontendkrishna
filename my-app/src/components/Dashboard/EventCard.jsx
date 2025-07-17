import React from "react";
import { IoMdContact } from "react-icons/io";

const EventCard = ({ events = [] }) => {
    return (
        <>
            <p className="text-white text-[clamp(1.5vw,3.4vw,5vw)] font-medium text-center">
                EVENTS
            </p>

            {/* EVENT CARD */}
            <div className="mx-[3vw] mb-[4vw] mt-[1vw] relative bg-[#1F1B5C] h-auto text-white rounded-[5vw] flex flex-col border border-[#6568FF] p-[2vw]">
                
                {/* GRID */}
                <div className="grid sm:grid-cols-[1fr_2fr_1fr] grid-cols-[1fr_1fr_1fr] gap-y-[1vw] text-center text-[clamp(0.5vw,1.9vw,1.9vw)]">
                    {events.map((event, index) => (
                        <React.Fragment key={index}>
                            <div className="font-semibold">{event.name}</div>
                            <div className="font-extralight">{event.date}</div>
                            <div className="font-extralight">{event.status}</div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

export default EventCard;
