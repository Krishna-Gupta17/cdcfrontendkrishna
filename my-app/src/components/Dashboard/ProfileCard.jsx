import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";

const ProfileCard = ({user}) => {
    return (
        <div>
            <h1 className="text-center font-bold text-[clamp(1.5rem,5vw,4rem)] mt-[4vw] text-white">
                DASHBOARD
            </h1>

            <div className='relative mt-[4vw]'>
                {/* CIRCLE */}
                <div className="absolute top-3 sm:top-4 md:top-4 lg:top-2 xl:top-0 mx-[6vw] w-[19vw] h-[19vw] bg-white rounded-full z-10 flex items-center justify-center">
                    <IoMdContact className="w-full h-full text-gray-100" />
                </div>

                <div className="w-3/4 mx-[28vw] absolute -top-[1vh] sm:static  text-[clamp(1.2rem,3.2vw,3.2rem)] font-bold my-4 text-white z-50 text-left">
                    {user.username}
                </div>

                {/* INFO PALLETE */}
                <div className="mx-[3vw] mb-[4vw] relative bg-[#1F1B5C] h-[26vw] sm:h-[19vw] text-white rounded-[5vw] flex flex-col border border-[#6568FF]">
                    
                    {/* GRID*/}
                    <div className="w-3/4 h-full pt-[10%] pb-[4%] sm:pb-[8%] sm:pt-[3%] rounded-[5vw] self-end grid [grid-template-columns:1.3fr_1fr] sm:[grid-template-columns:1.1fr_1fr] grid-cols-2 grid-rows-2 text-[clamp(2.1vw,1.3vw,1.3vw)]">

                        <div className="p-[0.5vw] text-white flex flex-row gap-[0.5vw] items-center ">
                            <div className="bg-black text-white p-[1vw] rounded-full flex items-center justify-center">
                                <FaPhoneAlt className="w-[2vw] h-[2vw] lg:w-[1.5vw] lg:h-[1.5vw] xl:w-[1.2vw] xl:h-[1.2vw]" />
                            </div>
                            <span>Contact:</span>
                            <div>{user.phone}</div>
                        </div>

                        <div className="p-[0.5vw] text-white flex flex-row gap-[0.5vw] items-center ">
                            <div className="bg-black text-white p-[1vw] rounded-full flex items-center justify-center">
                                <FaGraduationCap className="w-[2vw] h-[2vw] lg:w-[1.5vw] lg:h-[1.5vw] xl:w-[1.2vw] xl:h-[1.2vw]" />
                            </div>
                            <span>College:</span>
                            <div>{user.college}</div>
                        </div>

                        <div className="p-[0.5vw] text-white flex flex-row gap-[0.5vw] items-center ">
                            <div className="bg-black text-white p-[1vw] rounded-full flex items-center justify-center">
                                <MdEmail className="w-[2vw] h-[2vw] lg:w-[1.5vw] lg:h-[1.5vw] xl:w-[1.2vw] xl:h-[1.2vw]" />
                            </div>
                            <span>Email:</span>
                            <div>{user.email}</div>
                        </div>

                        <div className="p-[0.5vw] text-white flex flex-row gap-[0.5vw] items-center ">
                            <div className="bg-black text-white p-[1vw] rounded-full flex items-center justify-center">
                                <FaGraduationCap className="w-[2vw] h-[2vw] lg:w-[1.5vw] lg:h-[1.5vw] xl:w-[1.2vw] xl:h-[1.2vw]" />
                            </div>
                            <span>Graduation Year:</span>
                            <div>{user.gradYear}</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
