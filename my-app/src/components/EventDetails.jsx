import React from "react";
import { Link } from "react-router-dom";
import flag from "../assets/events/icon_2.png";
import man from "../assets/events/icon_1.png";
import axios from "axios";
import {auth} from '../firebase';

import { useNavigate } from "react-router-dom";
const EventDetails = ({ event }) => {
  if (!event) return null;
   const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const user = auth.currentUser;
      if(!user) navigate("/login")
      const token = await user.getIdToken();

      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/team-status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.hasTeam) {
        navigate("/dashboard");
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div>
      <div className=" text-white px-6 py-11 w-[100%] mt-12 hidden custom-lg3:block">
        <h2 className="text-3xl sm:text-4xl custom-md2:text-5xl custom-md3:text-6xl text-center font-bold mb-14">Our Events</h2>

        <div className="flex w-full pl-4 mr-4">
          <div className="flex gap-5 mr-6">
            <div className="flex-1 w-[160px] custom-md2:w-[176px] custom-lg1:w-[192px]">
              <img
                src={event.image}
                alt="Syntax Siege"
                className=" rounded-lg shadow-lg mb-2"
              />
              <div className="flex flex-col gap-3.5 mt-[8%] custom-lg2:mt-[5%] w-[192px]">
                <div>
                  <Link to={`/eventpage/${event.id}`}>
                    <button className="bg-[#6568ff]/50 hover:bg-[#4944d8] text-white text-xl font-inter font-bold px-4 py-2  w-[176px] custom-lg1:w-[192px] h-10 rounded-xl transition">
                      Event Details
                    </button>
                  </Link>
                </div>
                <div>
                    <button 
                    onClick={handleClick}
                    className="bg-[#6568ff]/50 hover:bg-[#4944d8] text-white text-xl font-inter font-bold px-4 py-2 w-[176px] custom-lg1:w-[192px] h-10 rounded-xl transition">
                      Register Now
                    </button>
                </div>
              </div>

            </div>
            <div>
              <div className="ml-4">
                <h3 className="text-white bg-white/20 pt-1 pb-1 font-inter text-xl font-bold w-44 h-10 text-center pl-4 pr-4 rounded-xl flex justify-center items-center">
                  Description
                </h3>
                <p className="mt-[2%] text-[22px] custom-lg1:text-[24px] text-justify" style={{ fontFamily: 'Coolvetica' }}>{event.description}</p>
              </div>
              <div className="rounded-2xl border-2 border-[#6568ff]/30 bg-[#6568ff]/20 text-white ml-4 mt-[2%] w-[97.8%] h-32 custom-lg2:h-40" style={{ fontFamily: 'Coolvetica' }}>
                <div className="flex flex-col md:flex-row justify-around mt-4 custom-lg2:mt-7">

                  <div className="flex items-center gap-4">
                    <img src={man} className="w-10 custom-lg2:w-14" />
                    <div>
                      <div className="text-2xl custom-lg2:text-3xl font-bold">{event.stats?.workshops ?? event.card?.stats?.workshops ?? 0}+</div>
                      <div className="text-xl custom-lg2:text-2xl font-medium text-purple-200">
                        Students Attended <br /> Workshops
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <img src={flag} className="w-10 custom-lg2:w-14" />
                    <div>
                      <div className="text-2xl custom-lg2:text-3xl font-bold">{event.stats?.participants ?? event.card?.stats?.participants ?? 0}+</div>
                      <div className="text-xl custom-lg2:text-2xl font-medium text-purple-200">
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
      {/*mobile view event details */}
      <div className="custom-lg3:hidden w-[100%]">
        <div className="flex flex-row gap-0 sm:gap-6 md:gap-8 custom-md2:gap-10 justify-center w-full">
          <div className="text-white w-[226px] flex flex-col justify-center items-center mr-6w">
            <div className="flex gap-4 items-center jsutify-center">
              <img src={man} className="w-8 custom-md2:w-10" />
              <div className="text-lg sm:text-xl custom-md2:text-2xl font-bold">{event.stats?.workshops ?? event.card?.stats?.workshops ?? 0}+</div>
              </div>
              <div className=" text-base sm:text-lg custom-md2:text-xl font-medium text-purple-200">
                Students Attended <br /> Workshops
              </div>
          </div>
          <div className="w-[160px] md:w-[176px] custom-md2:w-[192px]">
            <img
              src={event.image}
              alt="Syntax Siege"
              className=" rounded-lg shadow-lg mb-2"
            />
          </div>
          <div className="text-white w-[226px] flex flex-col justify-center items-center">
            <div className="flex gap-4 items-center justify-center">
               <img src={flag} className="w-8 custom-md2:w-10" />
              <div className="text-lg sm:text-xl custom-md2:text-2xl font-bold">{event.stats?.participants ?? event.card?.stats?.participants ?? 0}+</div>
              </div>
              <div className="text-base sm:text-lg custom-md2:text-xl font-medium text-purple-200">
                Participated in the <br /> Competition
              </div>
          </div>
        </div>
        <div>
          <p className="mt-[2%] text-white text-[18px] md:text-[20px] custom-md2:text-[22px] text-justify mx-8 md:mx-12 custom-md2:mx-16" style={{ fontFamily: 'Coolvetica' }}>{event.description}</p>
        </div>
      <div className="flex flex-col justify-center gap-4 mt-4">
        <div className="flex justify-center">
                  <Link to={`/eventpage/${event.id}`}>
                    <button className="bg-[#6568ff]/50 hover:bg-[#4944d8] text-white text-sm am:text-lg md:text-xl font-inter font-bold px-4 py-2 w-[124px] sm:w-[160px] md:w-[176px] h-8 md:h-10 rounded-xl transition">
                      Event Details
                    </button>
                  </Link>
                </div>
                <div 
                onc
                className="flex justify-center">
                    <button
                                        onClick={handleClick}

                    className="bg-[#6568ff]/50 hover:bg-[#4944d8] text-white text-sm am:text-lg md:text-xl font-inter font-bold px-4 py-2 w-[124px] sm:w-[160px] md:w-[176px] h-8 md:h-10 rounded-xl transition">
                      Register Now
                    </button>
                  
                </div>
                </div>
      </div>
    </div>
  );
};

export default EventDetails;

