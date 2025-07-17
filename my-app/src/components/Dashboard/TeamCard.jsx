import React from "react";
import { IoMdContact } from "react-icons/io";

const TeamMember = ({ member }) => (
  <div className="flex flex-col items-center justify-center">
    {/* CIRCLE */}
    <div className="h-[6vw] w-[6vw] mb-[1.3vw] rounded-full bg-white">
      <IoMdContact className="w-full h-full text-gray-100" />
    </div>
    <div className="inline-block px-3 py-1 rounded text-[clamp(0.6rem,1.7vw,1.7rem)] sm:px-[2vw]">
      {member}
    </div>
  </div>
);

const TeamCard = ({ members }) => {
  return (
    <>
      <p className="text-white text-[clamp(1.5vw,3.4vw,5vw)] font-medium text-center">
        TEAMS
      </p>

      <div className="mx-[3vw] mb-[4vw] mt-[1vw] px-[4vw] py-[1.2vw] relative bg-[#1F1B5C] h-[26vw] sm:h-[19vw] text-white rounded-[5vw] flex flex-col border border-[#6568FF]">
        <div className="text-[clamp(0.9vw,2.5vw,2.5vw)] px-[2vw] mb-[3vw] sm:mb-[1vw]">Team 1: Dev Titans</div>

        {/* Members in a row */}
        <div className="flex flex-wrap ">
          {members.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TeamCard;
