import React from "react";
import { motion } from "framer-motion";
import leftbracket from "../assets/herosection/leftbracket.png";
import rightbracket from "../assets/herosection/rightbracket.png";
import heroarrow from "../assets/herosection/heroarrow.png";
import roundarrow from "../assets/herosection/roundarrow.png";

const Herosection = () => {
  return (
    <div className="relative overflow-visible">
      {/* Floating arrows */}
      <motion.img
        src={heroarrow}
        alt="arrow"
        className="hidden sm:block absolute top-[2%] left-[4%] w-[11vw]"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={roundarrow}
        alt="arrow"
        className="hidden sm:block absolute top-[80%] right-[12%] w-[8vw]"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="flex flex-col items-center mt-[3%]">
        {/* Title Section */}
        <div className="flex items-center w-full justify-center">
          <motion.img
            src={leftbracket}
            alt="squarebracket"
            className="hidden sm:block sm:w-[2vw]"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <p className="flex justify-center text-[#6568ff] text-[22px] sm:text-[3.83vw] w-[100vw] sm:w-[67.5%] font-extrabold font-inter">
            CODERS & DEVELOPERS CLUB
          </p>
          <motion.img
            src={rightbracket}
            alt="squarebracket"
            className="hidden sm:block w-[4vw] sm:w-[2vw]"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </div>

        {/* Tagline */}
        <div className="mb-[2%] w-full flex items-center justify-center">
          <p className="w-[80vw] sm:w-[38.4%] text-[18px] sm:text-[2.6vw] flex justify-center font-inter text-white">
            &lt;Bytes of Brilliance, Compiled/&gt;
          </p>
        </div>

        {/* Description box */}
        <div className="w-[83vw] sm:w-[59.1%] bg-white bg-opacity-[0.002] shadow-[0_18px_40px_7px_rgba(66,11,160,0.34)] p-[2vh] flex items-center">
          <p
            className="text-white opacity-[0.53] text-base md:text-[1.8vw] w-full text-center leading-tight"
            style={{ fontFamily: "Coolvetica" }}
          >
            Welcome to CDC, a community of passionate developers and coders.
            <br />
            Step into a space where your curiosity drives exploration and your
            code shapes the future
          </p>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
