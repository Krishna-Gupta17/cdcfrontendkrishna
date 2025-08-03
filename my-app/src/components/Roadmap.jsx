import React, { useEffect } from "react";
import { motion } from "framer-motion";

const Roadmap = ({ mainHeading, subHeading, steps }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="bg-transparent text-white min-h-screen py-6 px-3 sm:px-6 md:px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Heading */}
      <motion.h1
        className="text-lg sm:text-2xl md:text-4xl font-extrabold text-center mb-3 uppercase tracking-wide"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {mainHeading}
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="text-center text-white/80 text-xs sm:text-base md:text-lg max-w-2xl mx-auto mb-8 px-2"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {subHeading}
      </motion.p>

      {/* Steps */}
      <div className="relative flex flex-col gap-10 sm:gap-12 md:gap-14 max-w-5xl mx-auto">
        {/* Continuous vertical line */}
        <div className="absolute top-[1.25rem] bottom-[1.25rem] left-[1.2rem] sm:left-[1.5rem] md:left-[2rem] w-0.5 bg-white/70 z-0 "></div>

        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="relative flex flex-row items-start gap-4"
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
          >
            {/* Step Circle - stays on top of the line */}
            <div className="flex flex-col items-center relative z-20 w-10 sm:w-12 md:w-16">
              <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-purple-700 border-2 sm:border-2 md:border-4 border-blue-300 rounded-full flex items-center justify-center text-white text-[10px] sm:text-sm md:text-base font-extrabold shadow-[0_0_6px_rgba(59,130,246,0.4)] hover:shadow-[0_0_12px_rgba(99,102,241,0.6)] transition">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>

            {/* Step Block - shifted right */}
            <div className="flex-1 bg-white/10 border border-[#3B3B5B] rounded-lg px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 shadow-m hover:shadow-blue-500/30 hover:scale-105 hover:bg-[#0F0F2A] opacity-90 transform transition duration-500 z-30 ml-4 sm:ml-6 md:ml-10">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-blue-400 mb-1">
                {step.title}
              </h2>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-white/80 text-[11px] sm:text-xs md:text-sm leading-snug">
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
