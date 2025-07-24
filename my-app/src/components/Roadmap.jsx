import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCode, FaRocket, FaLightbulb, FaCogs, FaCheckCircle } from "react-icons/fa";

const icons = [<FaCode />, <FaRocket />, <FaLightbulb />, <FaCogs />, <FaCheckCircle />];

const Roadmap = ({ mainHeading, subHeading, steps }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    /*Animation and Styling*/
    < motion.div
      className="bg-transparent text-white min-h-screen py-12 px-4 md:px-12"

      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Heading */}
      <motion.h1
        className="text-2xl md:text-4xl font-extrabold text-center mb-3 uppercase tracking-wide"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {mainHeading}
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="text-center text-white/80 text-base md:text-lg max-w-3xl mx-auto mb-10 px-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {subHeading}
      </motion.p>

      {/* Steps */}
      <div className="relative flex flex-col gap-16 max-w-5xl mx-auto">
  {steps.map((step, index) => (
    <motion.div
      key={index}
      className="relative flex flex-col md:flex-row items-start gap-6"
      initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Step Circle & Connector */}
      <div className="flex flex-col items-center relative z-20">
        <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-purple-700 border-4 border-blue-300 rounded-full flex items-center justify-center text-white text-sm md:text-lg font-extrabold shadow-[0_0_10px_rgba(59,130,246,0.4)] hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition">
        {String(index + 1).padStart(2, "0")}
         </div>
          {index !== steps.length - 1 && (
          <div
           className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-28 md:h-40 bg-white z-10"
           ></div>
)}

      </div>

      {/* Step Block */}
      <div className="flex-1 bg-white/10 border border-[#3B3B5B] rounded-xl px-6 py-4 shadow-m hover:shadow-blue-500/30 hover:scale-105 hover:bg-[#0F0F2A] opacity-90 transform transition duration-500 z-30">
        <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-2">{step.title}</h2>
        <ul className="list-disc pl-5 space-y-1 text-white/80 text-xs md:text-sm leading-snug">
          {step.points.map((point, i) => (
            <li key={i}>
              <a
                href={point.link}
                className="hover:text-blue-300 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                {point.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  ))}
</div>

    </motion.div>
  );
};

export default Roadmap;



