import React from "react";
import { Link } from "react-router-dom";
import flag from "../assets/events/icon_2.png";
import man from "../assets/events/icon_1.png";

const EventDetails = ({ event }) => {
  if (!event) return null;

  return (
    
    <div className=" text-white px-6 py-11 w-[100%] mt-12">
      <h2 className="text-[4.05vw] text-center font-bold mb-10">Our Events</h2>

      <div className="flex w-11/12 pl-4 pr-4">
        <div className="flex gap-5">
          <div className="flex-1 w-[192px]">
            <img
              src={event.image}
              alt="Syntax Siege"
              className=" rounded-lg shadow-lg mb-2"
            />
            <div className="flex flex-col gap-3.5 mt-5 w-[192px]">
              <div>
                <Link to="/eventpage">
                <button className="bg-[#6568ff]/50 hover:bg-[#4944d8] text-white text-xl font-inter font-bold px-4 py-2 w-[192px] h-10 rounded-xl transition">
                  Event Details
                </button>
                </Link>
              </div>
              <div>
                <Link to="/register">
                <button className="bg-[#6568ff]/50 hover:bg-[#4944d8] text-white text-xl font-inter font-bold px-4 py-2 w-[192px] h-10 rounded-xl transition">
                  Register Now
                </button>
                </Link>
              </div>
            </div>

          </div>
          <div>
            <div className="ml-4">
              <h3 className="text-white bg-white/20 pt-1 pb-1 font-inter text-xl font-bold w-44 h-10 text-center pl-4 pr-4 rounded-xl flex justify-center items-center">
                Description
              </h3>
              <p className="mt-4 text-[24px] text-justify" style={{ fontFamily: 'Coolvetica' }}>{event.description}</p>
            </div>
            <div className="rounded-2xl border-2 border-[#6568ff]/30 bg-[#6568ff]/20 text-white m-5 w-5/6 h-40" style={{fontFamily:'Coolvetica'}}>
              <div className="flex flex-col md:flex-row justify-around mt-4 gap-5">

                <div className="flex items-center gap-2">
                  <img src={man} className="w-10"/>
                  <div>
                    <div className="text-2xl font-bold">{event.stats?.workshops ?? event.card?.stats?.workshops ?? 0}+</div>
                    <div className="text-lg font-medium text-purple-200">
                      Students Attended <br /> Workshops
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <img src={flag} className="w-10" />
                  <div>
                    <div className="text-2xl font-extrabold">{event.stats?.participants ?? event.card?.stats?.participants?? 0}+</div>
                    <div className="text-lg font-medium text-purple-200">
                      Participated in <br /> Competition
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
